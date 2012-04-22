nzila.js
========

A lightweight and very simple (but powerful) client side javascript MVC framework.

##Examples

Consider the html:

```html
<a href="#!/hello/world">Hello world!</a> |
<a href="#!/hello/me/MyName">Hello me (put your name on the url)</a>
```

1. With simple actions:

```javascript
var app = new nzila.App();

app.route("hello/world/", function() {
    alert("Hello world!");
});
app.route("hello/me/:name", function(name) {
    alert("Hello " + name + "!");
});

app.start();
```

2. With controller:

```javascript
function Hello() {
}
Hello.prototype = {
    world: function() {
        alert("Hello world!");
    },
    me: function(name) {
        alert("Hello " + name + "!");
    }
};

var app = new nzila.App();
app.route("hello", nzila.Controller(Hello));
app.start();
```

by **[Leza Morais Lutonda](http://github.com/lemol)** (*[Lemol-C Software](http://lemolsoft.webs.com)*)