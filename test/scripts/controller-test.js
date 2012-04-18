module("Controller");
var Controller = nzila.Controller;

test("Constructor with simple class (without using new operator).", function() {

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = Controller(Foo);

    equals(controller.type, Foo);
    equals(controller.path, ":<action>/:id");
    equals(controller.defaults, "index/");
});

test("Constructor with simple class (using new operator).", function() {

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo);

    equals(controller.type, Foo);
    equals(controller.path, ":<action>/:id");
    equals(controller.defaults, "index/");
});

test("createInstance OK.", function(){
    expect(1);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo);
    var foo = controller.createInstance();

    ok(foo instanceof Foo);
});

test("match to /action/id (with default path).", function() {
    expect(1);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo);
    var action = controller.match("list/all");

    equals(action, "list");
});

test("match to /action/id.", function() {
    expect(1);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, ":<action>/:id");
    var action = controller.match("list/all");

    equals(action, "list");
});
