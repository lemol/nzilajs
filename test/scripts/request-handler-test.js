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
    router = {routes:[]};

    router.register = function(route) { this.routes.push(route); }
    router.register({path:"boo", handler: function(){}});
    router.register({path:"burro", handler: function(){}});
    router.register({path:"foo", handler: function(){}});

    router.getRoute = function(path) { return this.routes.filter(function(r){return r.path===path;})[0] };

    router.getMatch = function(path) {
        return { route: router.getRoute(path) };
    };

})();