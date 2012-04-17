module("RequestHandler");
var RequestHandler = nzila.RequestHandler,
    Router = nzila.Router,
    ActionRoute = nzila.ActionRoute;

test("constructor ok.", function() {
    expect(2);

    var req = { a: 1 };
    var router = { b: 2 };

    var handler = new RequestHandler(req, router);

    equals(handler.req, req);
    equals(handler.router, router);
});

test("getRoute for simple/action route returns correctly.", function(){
    var req = { newUrl: "http://lemolsoft.webs.com/#!foo" };

    var handler = new RequestHandler(req, router);
    var route = handler.getRoute();

    equals(route, router.getRoute("foo"));
});

var router;
(function() {
    router = new Router();
    router.register(new ActionRoute("boo", function(){}));
    router.register(new ActionRoute("foo", function(){}));
    router.register(new ActionRoute("burro", function(){}))
})();