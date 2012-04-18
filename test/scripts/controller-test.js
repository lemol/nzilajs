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
    equals(controller.path, "<action>/:id");
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
    equals(controller.path, "<action>/:id");
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
    expect(2);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo);
    var context = controller.match("list/all");

    equals(context.action, "list");
    equals(context.params.id, "all");
});

test("match to /action/id.", function() {
    expect(2);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:type");
    var context = controller.match("list/all");

    equals(context.action, "list");
    equals(context.params.type, "all");
});

test("match to /id/name/action.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, ":id/:name/<action>");
    var context = controller.match("10/Lemol/index");

    equals(context.action, "index");
    equals(context.params.id, "10");
    equals(context.params.name, "Lemol");
});

test("match to /action/. (with no id)", function(){
    expect(1);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>", "index/");
    var context = controller.match("index");

    equals(context.action, "index");

});