---
layout: post
title:  "Object literals and event listeners"
date:   2013-12-05
---

{% highlight js %}
 var testObj = {
    handlers: {
        '#form submit': 'onSubmit'
    },
    registerHandlers: function() {
        var that = this;
        $.each(this.handlers, function(k, v) {
            var split = k.split(" "),
                el = split[0],
                trigger = split[1];
            $(document).delegate(el, trigger, that[v]);
        });
    },
    onSubmit: function(evt) {
        evt.preventDefault();
        alert("submit");
    }
};
{% endhighlight %}

* [참고](http://stackoverflow.com/questions/10312427/object-literals-and-event-listeners-best-practice)

