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

    router.unregister("foo");
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
    },
    route4 = {
        path: "foo4",
        handler: function(){}
    };

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

test("getMatch() return undefined if dont match to any route.", function(){
    expect(2);

    var router = new nzila.Router();
    var route1 = {
        path: "foo1",
        match: function() { return false; }
    },
    route2 = {
        path: "foo2",
        match: function() { return false; }
    },
    route3 = {
        path: "foo3",
        match: function() { return false; }
    },
    route4 = {
        path: "foo4",
        match: function() { return false; }
    };

    router.register(route1);
    router.register(route2);
    router.register(route3);
    router.register(route4);

    equals(router.routes.length, 4);

    var match = router.getMatch("/foota");

    ok(!match);
});

test("router.getMatch() with simple routes", function() {
    expect(2);

    var router = new nzila.Router();
    var route1 = {
        path: "foo1",
        match: function() { return false; }
    },
    route2 = {
        path: "foo2",
        match: function() { return false; }
    },
    route3 = {
        path: "foo3",
        match: function() { return {route: route3}; }
    },
    route4 = {
        path: "foo4",
        match: function() { return false; }
    };

    router.register(route1);
    router.register(route2);
    router.register(route3);
    router.register(route4);

    equals(router.routes.length, 4);

    var match = router.getMatch("/foo3");

    equals(match.route, route3);
});

test("router.getMatch() with more comprlex routes", function() {
    expect(2);

    var router = new nzila.Router();
    var route1 = {
        path: "lemol/soft/foo1",
        match: function() { return false; }
    },
    route2 = {
        path: "merveille/foo2/stino/eli",
        match: function() { return {route: route2}; }
    },
    route3 = {
        path: "foo3/nada/nao/mesmo",
        match: function() { return false; }
    },
    route4 = {
        path: "semans/foo4/atraz",
        match: function() { return false; }
    };

    router.register(route1);
    router.register(route2);
    router.register(route3);
    router.register(route4);

    equals(router.routes.length, 4);

    var match = router.getMatch("/merveille/foo2/stino/eli/");

    equals(match.route, route2);
});

test("router.getMatch() with routes with querystring", function() {
    expect(2);

    var router = new nzila.Router();
    var route1 = {
        path: "lemol/soft/foo1",
        match: function() { return false; }
    },
    route2 = {
        path: "merveille/foo2/stino/eli",
        match: function() { return {route: route2}; }
    },
    route3 = {
        path: "foo3/nada/nao/mesmo",
        match: function() { return false; }
    },
    route4 = {
        path: "semans/foo4/atraz",
        match: function() { return false; }
    };

    router.register(route1);
    router.register(route2);
    router.register(route3);
    router.register(route4);

    equals(router.routes.length, 4);

    var match = router.getMatch("/merveille/foo2/stino/eli/?id=1&name=leza");

    equals(match.route, route2);
});