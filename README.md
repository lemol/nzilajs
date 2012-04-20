nzila.js
========

A lightweight and very simple (but powerful) client side javascript MVC framework.

Examples
--------

Consider the html:

```html
<a href="#!/alert">Alert</a> |
<a href="#!/say/hi/lemol">Hi Lemol!</a> |
<a href="#!/hi/me/YourName">Hi me (put your name on the url)</a>
```

1. With simple actions:

```javascript
var app = new nzila.App();

app.route("alert", function() {
    alert("Hello world!");
});
app.route("say/hi/lemol", function() {
    alert("Hi Lemol!");
});
app.route("hi/me/:name", function(name) {
    alert("Hi " + name + "!");
});

app.start();
```

2. With controller:

```javascript
var app = new nzila.App();

function Hello() {
}
Hello.prototype = {
    world: function() {
        alert("Hello world!");
    },
    lemol: function() {
        alert("Hi lemol!");
    },
    me: function(name) {
        alert("Hi " + name + "!");
    }
};

app.route("hello", nzila.Controller(Hello))
app.start();
```

Developed by Leza Morais Lutonda (Lemol-C Software)