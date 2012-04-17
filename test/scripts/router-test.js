module("router");

test("Constructor", function () {
    expect(2);
    
    var router = new nzila.Router();

    ok(router);
    ok(router.routes);
});

test("Register route.", function(){
    expect(2);

    var router = new nzila.Router();
    var route = {
        path: "foo",
        handler: function(){}
    };

    router.register(route);

    equals(router.routes.length, 1);
    equals(router.getRoute("foo"), route);
});

test("Unregister route by path.", function(){
    expect(2);

    var router = new nzila.Router();
    var route = {
        path: "foo",
        handler: function(){}
    };

    router.register(route);
    equals(router.getRoute("foo"), route);

    route.unregister("foo");
    ok(!router.getRoute("foo"));
});

test("router.getRoute()", function() {
    expect(5);

    var router = new nzila.Router();
    var route1 = {
        path: "foo1",
        handler: function(){}
    },
    route2 = {
        path: "foo2",
        handler: function(){}
    },
    route3 = {
        path: "foo3",
        handler: function(){}
    };
    route4 = {
        path: "foo4",
        handler: function(){}
    },

    router.register(route1);
    router.register(route2);
    router.register(route3);
    router.register(route4);

    equals(router.routes.length, 4);
    equals(router.getRoute("foo1"), route1);
    equals(router.getRoute("foo2"), route2);
    equals(router.getRoute("foo3"), route3);
    equals(router.getRoute("foo4"), route4);
});
