nzilajs
=======

A lightweight and very simple (but powerful) client side javascript MVC framework.

Example
~~~~~~~

<script src="nzila.js"></script>

// Set the controller

function FooController() {
}

FooController.prototype.list = function() {
   alert('Hello nzila!');
}

// And register it

nzila.register("foo", nzila.Controller(FooController));

then you can access http://your.site/the/page#!/foo/list


Developed by Leza Morais Lutonda (Lemol-C Software)