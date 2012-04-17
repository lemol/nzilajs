var RouteType = nzila.RouteType;

module("ActionRoute");
var ActionRoute = nzila.ActionRoute;

test("Constructor OK.", function(){
    var foo = function(){};
    var route = new ActionRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Action);
});

test("exec calls this.handler with correct arguments.", function(){
    expect(1);

    var _args = { porra: "cono" };
    var foo = function(args){
        equals(_args, args);
    };
    var route = new ActionRoute("foo", foo);

    route.exec(_args);
});

module("ControllerRoute");
var ControllerRoute = nzila.ControllerRoute;

test("Constructor OK.", function(){
    var foo = function(){};
    var route = new ControllerRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Controller);
});

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