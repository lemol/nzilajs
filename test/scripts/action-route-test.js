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

test("exec should pass the context.args,params,query to handler call.", function(){
    var context = { args: {a:1,b:2,c:3}, params: {a:1}, query: {b:2,c:3} };
    var handler = sinon.spy();
    var route = new ActionRoute("foo/boo/burro", handler);

    route.exec(context);

    ok(handler.calledWith(context.args, context.params, context.query));
});

test("match with simple path.", function() {
    expect(4);

    var route = new ActionRoute("foo", function(){});
    
    ok(route.match("foo"));
    ok(route.match("/foo"));
    ok(route.match("foo/"));
    ok(route.match("/foo/"));
});

test("match with simple path with querystring.", function() {
    expect(4);

    var route = new ActionRoute("foo", function(){});
    
    ok(route.match("foo?id=10&name=lemol"));
    ok(route.match("/foo?id=10&name=lemol"));
    ok(route.match("foo/?id=10&name=lemol"));
    ok(route.match("/foo/?id=10&name=lemol"));
});

test("dont match to wrong hash.", function() {
    expect(5);

    var route = new ActionRoute("foo", function(){});
    
    ok(!route.match("foos"));
    ok(!route.match("wfoo"));
    ok(!route.match("lemol/foo"));
    ok(!route.match("foo/lemol"));
    ok(!route.match("morais/foo/leza"));
});

test("match with triple path.", function() {
    expect(4);

    var route = new ActionRoute("foo/boo/burro", function(){});
    
    ok(route.match("foo/boo/burro"));
    ok(route.match("/foo/boo/burro"));
    ok(route.match("foo/boo/burro/"));
    ok(route.match("/foo/boo/burro/"));
});

test("dont match with wrong triple path.", function() {
    expect(4);

    var route = new ActionRoute("foo/boo/burro", function(){});
    
    ok(!route.match("foo/sboo/burro"));
    ok(!route.match("/afoo/boo/burro"));
    ok(!route.match("foo/boo/burro/mais"));
    ok(!route.match("menos/foo/boo/burro/"));
});

test("match triple path with querystring.", function() {
    expect(4);

    var route = new ActionRoute("foo/boo/burro", function(){});
    
    ok(route.match("foo/boo/burro?id=10&name=lemol"));
    ok(route.match("/foo/boo/burro?id=10&name=lemol"));
    ok(route.match("foo/boo/burro/?id=10&name=lemol"));
    ok(route.match("/foo/boo/burro/?id=10&name=lemol"));
});

module("ActionRouteMatch");
var ActionRouteMatch = nzila.ActionRouteMatch;

test("constructor", function() {
    expect(1);

    var route = { path: "/foo/boo/burro" };
    var res = ["/foo/boo/burro"];

    var match = new ActionRouteMatch(route, res);

    equals(match.route, route);
});

test("match with no querystring should return with empty match.query.", function() {
    expect(0);

    var route = { path: "/foo/boo/burro" };
    var res = ["/foo/boo/burro"];

    var match = new ActionRouteMatch(route, res);

    for(var v in match.args)
        equals(v, undefined);
    
    for(var v in match.query)
        equals(v, undefined);
});

test("match with querystring defines match.args and match.query.", function() {
    expect(4);

    var route = { path: "/foo/boo/burro" };
    var res = ["/foo/boo/burro", "?id=10&name=Lemol", "id=10&name=Lemol"];

    var match = new ActionRouteMatch(route, res);

    equals(match.args.id, "10");
    equals(match.args.name, "Lemol");
    equals(match.query.id, "10");
    equals(match.query.name, "Lemol");
});