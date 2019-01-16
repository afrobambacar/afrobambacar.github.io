---
title: 람다 엣지로 이미지 리사이징 (1) - s3와 클라우드 프론트 설정
date: 2018-12-23
description: 비교적 쉬운 파트지만 IAM은 골치아파
tags: aws,lambda,cloudFront
crosspost_to_medium: true
---

이 포스팅은 람다 엣지를 사용하여 운영중인 상태로 이미지를 리사이징 하는 방법을 설명합니다. 글이 길어져 두개로 나누어 포스팅 합니다. 

* [람다 엣지로 이미지 리사이징 (1) - s3와 클라우드 프론트 설정](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge.html)
* [람다 엣지로 이미지 리사이징 (2) - 람다 엣지 작성과 연결](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge-2.html)

## 이미지 리사이징 개요

이미지 리사이징은 거의 모든 서비스에서 기본적으로 필요로 하는 것이 아닌가 싶을 정도로 흔한 서비스 로직입니다. 그만큼 방법도 다양하고 예제도 많습니다. 미리 정해진 사이즈로 리사이징, 크롭하여 저장하고 그것을 호출하는 방법도 있고, 앞으로 설명할 예제 처럼 요청 받은 사이즈를 바로 리사이징 한 후 캐싱 서버에만 보관하는 방법도 있습니다. AWS에서 이를 구현하기 위해서는 다음과 같은 서비스를 이용해야 합니다.

* 이미지를 보관할 S3 버킷
* 이미지를 캐싱할 클라우드 프론트
* 골치아픈 IAM 정책들
* 클라우드 프론트와 연결할 lambda@Edge
* 여기에 람다 함수를 관리하기 위한 serverless 프레임워크

## 이미지를 보관할 S3 버킷

이미지를 보관할 S3 버킷은 기본 설정으로 생성을 하면 됩니다. 진짜 믿어도 됩니다. 프로퍼티 탭의 모든 것이 disabled 되어 있어도 되고, 퍼블릭 엑세스 셋팅에 모든 설정이 모두 `true` 상태여도 됩니다. 어차피 이미지에 대한 모든 요청은 클라우드 프론트에서 받을 것이고, 클라우드 프론트가 S3에 요청을 하는 것이기 때문에 그렇습니다. S3 버킷에서 고칠 것은 오직 하나뿐인데 그것은 Bucket Policy 입니다. 버킷 정책은 클라우드 프론트와 람다함수가 접속할 수 있도록 권한을 열어주기만 하면 됩니다. 이 부분은 클라우드 프론트에서 엣지 생성 후 편집을 하도록 하겠습니다. 일단 버킷을 만들고 난 후 테스트에 사용할 기본 이미지를 하나 업로드 해두시면 됩니다. 

## 클라우드 프론트 배포 만들기

S3와 연결할 클라우드 프론트에서는 다음과 같은 설정으로 배포를 만들면 됩니다.

* Web distribution을 선택합니다.
* Origin Domain Name은 조금전 생성한 S3 도메인을 선택하세요.
* Compress Objects Automatically에서 yes를 선택해주세요. 압축하는 옵션입니다.

이제 Create Distribution 버튼을 눌러서 마치면 됩니다. 뭔가 너무 쉽다 생각이 드신다면 그게 맞습니다. 사실 해야할 일이 더 남아 있습니다.

### Restrict Bucket Access

여기서 만든 S3 버킷은 공개된 버킷이 아닙니다. S3 url을 브라우저에 입력해도 이미지가 나오지 않습니다. 클라우드 프론트 URL만 허용하려고 했던 것이죠. 그렇다면 클라우드 프론트에서 이 설정을 해주어야 합니다.

조금 전 생성한 클라우드 프론트를 클릭해보면 여러가지 탭이 보이실 겁니다. 그 중에서 Origins and Origin Groups 탭을 보세요. 이 항목은 어디의 리소스를 캐싱할 지 정하는 항목입니다. 미리 등록된 S3 버킷을 편집할 수도 있습니다. 편집 화면에는 다음과 같은 항목이 보일 거에요.

* Restrict Bucket Access 항목을 yes로 선택하세요.
* Origin Access Identity 항목에서 Create a New Identity 을 선택하세요.
* Grant Read Permissions on Bucket 항목에서 Yes, Update Bucket Policy를 선택하세요.

이 설정은 연결 된 S3 버킷의 권한 부분 정책을 다음과 같이 업데이트 합니다.

```json
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "CLOUDFRONT_ARN"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    }
  ]
}
```

### Query String Forwarding and Caching

클라우드 프론트의 기본 옵션은 쿼리스트링을 허용하지 않음으로서 캐싱 능력을 향상시키는 것 입니다. 예를들어 _https://images.example.com/hello.jpeg?d=20181223_ 으로 요청을 해도 이미 캐싱된 _https://images.example.com/hello.jpeg_ 이미지를 보여줍니다. 쿼리스트링을 허용하지 않았기 때문에 _d=20181223_ 값이 무시되는 것이죠.

하지만 우리는 쿼리스트링을 통해 원하는 사이즈로 이미지를 리사이징하여 출력되기를 원합니다. 이렇게 하기 위해서는 쿼리스트링을 허용하도록 설정을 변경해 줘야 합니다. 이 설정은 behaviors 탭에서 할 수 있습니다. 이 탭에는 Path Pattern이 Default인 항목이 하나 등록되어 있는데 그것을 편집해주면 됩니다. 

* Query String Forwarding and Caching 옵션에서 _Forward all, cache base on whitelist_ 를 선택하세요. 허용된 쿼리 스트링만 전달하겠다는 옵션인데, 이 예제에서는 이미지 리사이징을 요청할 때 dimension을 뜻하는 _?d=100x100_ 형식의 쿼리 스트링을 사용할 예정입니다.
* Query String Whitelist에서는 _d_ 를 적어주시면 됩니다.

Forward all, cache base on all을 선택해도 됩니다. 다만 이것을 선택하면 이미지 리사이징에 영향을 주지 않는 쿼리스트링이 들어왔을 때에도 새로운 캐시를 만들어 저장하기 때문에 우리가 하려는 것에 비해 비효율적 입니다.

## IAM Role - EdgeLambdaRole

여기서 만들 IAM 롤은 람다 엣지 함수에서 이용하는 롤 입니다. 람다 엣지 함수는 S3에서 이미지를 가져올 수 있어야 하고, 이미지를 리사이징 하여 클라우드 프론트에 저장하는 역할을 하게 됩니다. 롤에는 두가지 권한을 추가할 건데 하나는 AWS에서 관리하는 권한이고 하나는 인라인으로 작성할 예정입니다. 롤의 이름은 EdgeLambdaRole로 하고 다음의 인라인 정책과 관리형 정책을 추가하면 됩니다. 리소스에는 람다 함수를 생성한 후 ARN을 복사하여 붙여주시면 됩니다.

인라인 정책 (Inline policy)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "lambda:GetFunction",
        "lambda:EnableReplication",
        "iam:CreateServiceLinkedRole",
        "cloudfront:UpdateDistribution",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "LAMBDA_FUCNTION_ARN",
      "Effect": "Allow"
    }
  ]
}
```

추가로 람다 함수가 클라우드 와치에 로그를 쌓을 수 있도록 허용하는 AWS 관리 정책(AWS managed policy)인 _AWSLambdaBasicExecutionRole_ 을 추가해주세요. 여기까지가 롤이 필요한 권한(Permissions) 입니다. 

이 롤을 완성하려면 한가지를 더 해줘야 합니다. Trust relationships를 편집해야 합니다. 생성한 EdgeLambdaRole을 보면 Trust relationships 탭이 있습니다. Trusted entities에는 _lambda.amazonaws.com_ 과 _edgelambda.amazonaws.com_ 이 들어 있어야 합니다. 이것을 하기 위해서는 Edit Trust Relationships 버튼을 눌러서 다음의 정책을 추가해야 합니다. 

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

EdgeLambdaRole IAM 롤은 준비가 되었습니다. 다만 S3에서 한가지를 더 설정해줘야 합니다. 람다가 S3에 접근할 권한을 가졌다고 하더라도 S3 버킷에 해당 정책이 들어있지 않으면 권한이 없다는 메시지를 출력합니다. EdgeLambdaRole이 S3 버킷에서 잘 동작할 수 있도록 S3 버킷의 정책에 다음 처럼 편집해줘야 합니다. 클라우드 프론트의 설정을 잘 하셨다면 Statement의 첫번째 정책은 이미 들어가 있을 것 입니다. 우리는 두 번째 Statement를 추가해주면 됩니다.

```
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": "CLOUDFRONT_ARN"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    },
    {
      "Sid": "2",
      "Effect": "Allow",
      "Principal": {
        "AWS": "EdgeLambdaRole_ARN"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    }
  ]
}
```

## 람다 엣지 함수 작성

드디어 람다 함수를 작성하여 배포할 순서가 왔습니다. 이쯤 하고 나면 이게 올바른 방향인가 한번쯤 의심을 하시겠죠. 하지만 아직 실망하긴 이릅니다. 난관은 아직 끝나지 않았으니까요. 여러분이 Sharp 모듈을 사용하기 위해서는 람다 실행 환경에서 빌드를 해야합니다. 다행이랄까 AWS에서는 람다 실행 환경을 도커로 만들어 놨습니다. 정확히는 아마존 리눅스 ami를 도커로 제공하는 것이죠. 도커와 친하지 않다면 아마존 리눅스 ec2를 띄워서 sharp 모듈을 빌드하고 다시 로컬로 모듈을 가져와 배포하는 방법이 있지만 아무도 그렇게 하고 싶진 않겠죠.

도커를 이용하여 sharp 모듈을 빌드하는 방법은 [람다 엣지로 이미지 리사이징 (2) - 람다 엣지 작성과 연결](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge-2.html)에서 설명하겠습니다.

## ref

* [Resizing Images with Amazon CloudFront & Lambda@Edge - AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)
* [Lambda 한개로 만드는 On-demand Image Resizing](https://engineering.huiseoul.com/lambda-%ED%95%9C%EA%B0%9C%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-on-demand-image-resizing-d48167cc1c31)

