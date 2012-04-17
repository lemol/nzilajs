module("controller");

test("Initializing constructor with simple class.", function() {

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    nzila.Controller("foo", Foo);

    equals(nzila.controller("foo").Class, Foo);

});