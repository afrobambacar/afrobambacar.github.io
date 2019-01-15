---
title: 람다 엣지로 이미지 리사이징 (2) - 람다 엣지 작성과 연결
date: 2018-12-23
description: 이제 여러가지 난관에 봉착하게 되는데 ...
tags: aws,lambda,cloudFront
crosspost_to_medium: true
---

이 포스팅은 람다 엣지를 사용하여 운영중인 상태로 이미지를 리사이징 하는 방법을 설명합니다. 글이 길어져 두개로 나누어 포스팅 합니다.

* [람다 엣지로 이미지 리사이징 (1) - s3와 클라우드 프론트 설정](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge.html)
* [람다 엣지로 이미지 리사이징 (2) - 람다 엣지 작성과 연결](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge-2.html)

### 도커 이미지를 통한 Sharp 모듈 빌드

Dockerfile이 하나 필요합니다. 아래 도커 파일은 아마존 리눅스를 가져와 nvm을 설치하고 NodeJS 8.10을 설치합니다. 이 파일을 통해서 도커 이미지를 만들어 두면 Sharp 빌드에 사용할 수 있겠죠.

```
FROM amazonlinux:1

WORKDIR /tmp
#install the dependencies
RUN yum -y install gcc-c++ && yum -y install findutils

RUN touch ~/.bashrc && chmod +x ~/.bashrc

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

RUN source ~/.bashrc && nvm install 8.10

WORKDIR /build
```

Dockerfile이 있는 곳에서 아래 명령어를 통해 빌드를 하여 이미지를 만듭니다. 

```
$ docker build --tag amazonlinux:nodejs .
```

자 다음은 Shape 모듈을 빌드할 차례 입니다. 아래 명령어는 sharp 모듈을 도커 인스턴스에서 빌드한 결과물을 볼륨 마운트를 통해 도커 밖에 결과물을 만들어 냅니다. 그러니까 명령어를 실행하는 위치에 _node_modules_ 를 만듭니다.
```
$ docker run --rm --volume ${PWD}:/build amazonlinux:nodejs /bin/bash -c "source ~/.bashrc; npm init -f -y; npm install sharp --save; npm install querystring --save; npm install --only=prod"
```

node_modules에는 아마존 리눅스 환경에서 빌드된 `sharp` 모듈과 `querystring` 모듈이 들어 있습니다. 

### 이미지 리사이징 람다 엣지 함수 

람다 함수를 작성하기 전에 맥락을 살펴보겠습니다. 

* 브라우저 주소창에 다음과 같이 입력합니다. _https://images.example.com/image.jpeg?d=100x100_
* 클라우드 프론트에 이미지를 요청을 했으나 캐싱이 되어 있지 않습니다.
* 클라우드 프론트가 연결된 S3 버킷에 요청을 합니다.
* S3 버킷에 이미지가 있는 것을 확하고 S3는 응답을 합니다.
* 이때 람다 함수를 통해 원본 이미지를 리사이징 합니다. 
* 리사이징한 이미지를 클라우드 프론트에 캐싱요청을 합니다. 
* 클라우드 프론트는 캐싱을 하고 브라우저에 리사이징 된 이미지를 표시합니다.

클라우드 프론트는 4가지 이벤트 사이에 람다를 적용할 수 있게 되어 있습니다. 

![CloudFront events](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2018/02/01/1.png)

* Viewer request
* Origin request
* Origin response
* Viewer response

이 중 위 시나리에오 람다 함수가 위치하는 곳은 Origin response 입니다. 이 맥락을 염두에 두고 람다 함수를 작성하면 됩니다. 아래 소스는 `handler.js`입니다. 

```
const querystring = require('querystring')
const Sharp = require('sharp')
const AWS = require('aws-sdk')
const S3 = new AWS.S3({ region: 'ap-northeast-2' })
const BUCKET = 'BUCKET_NAME'

exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response

  console.log('Response status code :%s', response.status)

  const request = event.Records[0].cf.request
  const params = querystring.parse(request.querystring)
  
  // https://images.example.com?d=100x100 의 형태가 아닐경우에는 원본 이미지를 반환합니다.
  if (!params.d) { 
    console.log(`Querystring d doesn't exsist.`)
    callback(null, response)
    return
  }

  const uri = request.uri
  const imageSize = params.d.split('x')
  const width = parseInt(imageSize[0])
  const height = parseInt(imageSize[1])
  const [, imageName, extension] = uri.match(/\/(.*)\.(.*)/)
  const requiredFormat = extension == 'jpg' ? 'jpeg' : extension
  const originalKey = imageName + '.' + extension

  try {
    const s3Object = await S3.getObject({ 
      Bucket: BUCKET,
      Key: originalKey
    }).promise()

    const resizedImage = await Sharp(s3Object.Body)
      .resize(width, height)  
      .toFormat(requiredFormat)
      .toBuffer()

    response.status = 200
    response.body = resizedImage.toString('base64')
    response.bodyEncoding = 'base64'
    response.headers['content-type'] = [
      { key: 'Content-Type', value: 'image/' + requiredFormat }
    ]
    
    return callback(null, response)
  } catch (error) {
    console.error(error)
    return callback(error)
  }
}
```

### 람다 엣지 함수의 배포

여기서는 람다 함수의 등록을 위해 편의상 [serverless 프레임워크](https://serverless.com/)를 사용하려고 합니다. serverless 프레임워크는 `yml` 파일을 통해 aws에 람다 함수 업로드를 도와주는 프레임워크로 cli를 사용해 업로드를 할 수 있습니다. 

#### serverless 설치 및 설정

설치는 npm을 이용합니다.

```
$ npm install -g serverless
```

계정을 설정하는 부분은 [링크](https://serverless.com/framework/docs/providers/aws/guide/credentials)로 대체하겠습니다. 

#### serverless.yml

다음은 `serverless.yml` 파일 입니다. `BUCKET_NAME`과 `EdgeLambdaRole_ARN`은 위에서 생성한 이름으로 변경해주세요.

```
service: image-resize

custom:
  bucketName: BUCKET_NAME

# 람다엣지는 us-east-1에 배포해야 합니다.
provider:
  name: aws
  runtime: nodejs8.10
  region: us-east-1
  endpointType: Edge
  timeout: 30

functions:
  imageResize:
    role: EdgeLambdaRole_ARN
    handler: handler.handler
    name: ${self:service}
    package:
      include: 
        - node_modules/**
        - handler.js
```

람다에 업로드 하기 위해서는 다음의 명령어를 사용하면 됩니다.

```
$ serverless deploy -v
```

## 클라우드 프론트에 람다 엣지 함수 연결

일반적으로 serverless.yml은 이벤트 수신도 정의할 수 있습니다. 하지만 클라우드 프론트 이벤트의 경우에는 특정 목적에 해당하는 이벤트여서 지원 계획이 없다고 serverless에서 밝히고 있습니다. 따라서 이 부분은 콘솔에서 수동으로 해주거나, 클라우드 포메이션을 이용할 수 있습니다. 여기서는 콘솔을 이용하여 하도록 하겠습니다. 

### 클라우드 프론트 람다 함수 등록

앞서 언급했던 클라우드 프론트의 behaviors 탭에 보면 default pattern이 있습니다. 그 패턴을 선택후 편집버튼을 눌러주세요. 

* 맨 하단에 Lambda Function Associations 항목이 있습니다. 
* 역시 앞서 언급한 대로 CloudFront Event는 Origin response를 선택해주세요.
* Lambda Function ARN은 업로드 한 람다의 버전이 포함된 ARN을 적어주셔야 합니다. 

람다 함수는 배포할 때마다 버전이 1씩 올라갑니다. 이 버전 값을 확인하려면 업로드한 람다 함수 페이지에서 Qualifiers를 클릭하면 Version을 확인할 수 있습니다. 버전을 클릭하면 특정 버전의 람다 함수 페이지가 나오고 이 페이지에는 해당 버전의 ARN이 표시됩니다. 이 값을 사용하면 됩니다. 

Qualifiers를 보면 `$LATEST` 값이 보이는데 이 값은 클라우드 프론트에 등록하는 람다 함수 ARN으로 사용할 수 없습니다. 이것이 의미하는 것은 람다 엣지 함수가 갱신될 경우 새로운 함수를 적용하기 위해서 클라우드 프론트에 수동으로 다시 연결 함수를 편집해 주어야 한다는 것입니다. 

### 람다 엣지 함수에 클라우드 프론트 이벤트 등록

이번에는 반대로 람다 엣지 함수 페이지에 보면 람다 함수의 동작을 도식화한 화면에 `Add triggers from the list on the left` 라는 것이 보이실 겁니다. 클라우드 프론트에 이벤트를 연결했어도 아직 자동으로 람다 함수가 갱신되지는 않는 것 같습니다. 그러면 수동으로 해주는 수 밖에요. 왼쪽 메뉴에서 클라우드 프론트를 클릭하면 추가 설정할 수 있는 섹션이 나타납니다. 여기서 클라우드 프론트의 ID, 이벤트 (Origin response) 등을 선택하여 등록을 해주시면 됩니다. 

## 마치며 

여기까지가 클라우드 프론트 - 람다 엣지 - S3를 연결하는 길고 긴 과정이었습니다. 많은 튜토리얼들이 있지만 대부분 이정도는 알겠거니 하고 넘어가는 부분들이 사실 굉장히 높은 장벽처럼 느껴졌습니다. 이 문서도 보는 사람에게 안내하기 위한 안내서라기 보다는 까먹지 않으려고 기록하는 면이 더 크게 작용했다고 볼 수 있습니다. 그래도 처음에 이 작업을 할 때는 왜 이렇게 동작하는지 이해가 되지 않는 부분들이 많았는데 다시 작성하고 보니 윤곽이 보이네요.

## ref

* [Resizing Images with Amazon CloudFront & Lambda@Edge - AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)
* [Lambda 한개로 만드는 On-demand Image Resizing](https://engineering.huiseoul.com/lambda-%ED%95%9C%EA%B0%9C%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-on-demand-image-resizing-d48167cc1c31)

