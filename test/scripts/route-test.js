var RouteType = nzila.RouteType;

module("ControllerRoute");
var ControllerRoute = nzila.ControllerRoute;

test("Constructor OK.", function(){
    var foo = function(){};
    var route = new ControllerRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Controller);
});
