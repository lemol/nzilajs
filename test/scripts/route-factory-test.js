var RouteType = nzila.RouteType,
    Controller = nzila.Controller;

module("RouteFactory");
var RouteFactory = nzila.RouteFactory;

test("create ActionRoute when the handler is simple function.", function() {
    expect(3);

    var foo = function(){};
    var factory = new RouteFactory();
    var route = factory.createRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Action);
});

test("create ControllerRoute when the handler is instanceof Controller.", function() {
    expect(3);

    var foo = Controller(new function(){});

    var factory = new RouteFactory();
    var route = factory.createRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Controller);
});