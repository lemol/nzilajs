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

    var controller = Controller(Foo, undefined, {});

    equals(controller.type, Foo);
    equals(controller.path, "<action>/:id");
    ok(controller.defaults);
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

    var controller = new Controller(Foo, undefined, {});

    equals(controller.type, Foo);
    equals(controller.path, "<action>/:id");
    ok(controller.defaults);
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

test("math to /action/:id/", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:id", "index/");
    var context = controller.match("index/10");

    equals(context.action, "index");
    equals(context.paramsOrded[0], "id");
    equals(context.params.id, "10");
});

test("match to :id/&lt;action&gt/:name.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, ":id/<action>/:name", {});
    var context = controller.match("20/list/Lemol");

    equals(context.action, "list");
    equals(context.params.id, "20");
    equals(context.params.name, "Lemol");
});

test("match to default id.", function() {
    expect(2);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:id", { action: "index", id: "10" });
    var context = controller.match("index");

    equals(context.action, "index");
    equals(context.params.id, "10");
});

test("match to defaults params.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:id/:name/", { action: "index", id: "10", name: "Lemol" });
    var context = controller.match("index");

    equals(context.action, "index");
    equals(context.params.id, "10");
    equals(context.params.name, "Lemol");
});

test("match to some defaults params.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:id/:name/", { action: "index", name: "Lemol" });
    var context = controller.match("index/20");

    equals(context.action, "index");
    equals(context.params.id, "20");
    equals(context.params.name, "Lemol");
});

test("match to defaults params for :id/&lt;action&gt/:name.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, ":id/<action>/:name", { action: "index", id: "20", name: "Lemol" });
    var context = controller.match("index");

    equals(context.action, "index");
    equals(context.params.id, "20");
    equals(context.params.name, "Lemol");
});

test("match to default action.", function() {
    expect(3);

    var Foo = function() {
    };

    Foo.prototype = {
        index: function() {
        },
        list: function() {
        }
    };

    var controller = new Controller(Foo, "<action>/:id", { action: "index", id: "10" });
    var context = controller.match("");

    equals(context.action, "index");
    equals(context.params.id, "10");
});
