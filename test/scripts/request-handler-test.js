module("RequestHandler");
var RequestHandler = nzila.RequestHandler,
    Router = nzila.Router,
    ActionRoute = nzila.ActionRoute;

test("constructor ok.", function() {
    expect(1);

    var handler = new RequestHandler();

    ok(handler);
});

test("getRoute for simple/action route returns correctly.", function(){
    var req = { getHash: function() {return "foo"} };

    var handler = new RequestHandler();
    var match = handler.getRouteMatch(req, router);

    equals(match.route, router.getRoute("foo"));
});

var router;
(function() {
    router = new Router();
    router.register(new ActionRoute("boo", function(){}));
    router.register(new ActionRoute("foo", function(){}));
    router.register(new ActionRoute("burro", function(){}))

    router.getMatch = function(path) {
        return { route: router.getRoute(path) };
    };

})();