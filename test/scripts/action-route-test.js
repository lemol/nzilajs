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

test("exec should pass all parameters in the correct order to the handler call.", function(){
    expect(1);

    var context = { args: {a:1,b:2,c:3}, params: {a:1,b:2,c:3}, query: {}, paramsOrded: ["b","c","a"] };
    var handler = sinon.spy();

    var route = new ActionRoute("foo/boo/burro", handler);
    route.exec(context);

    ok(handler.calledWith(context.params.b, context.params.c, context.params.a));
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

    var route = { path: "/foo/boo/burro", paramsOrded: [] };
    var res = ["/foo/boo/burro"];

    var match = new ActionRouteMatch(route, res);

    equals(match.route, route);
});

test("match with no querystring should return with empty match.query.", function() {
    expect(0);

    var route = { path: "/foo/boo/burro", paramsOrded: [] };
    var res = ["/foo/boo/burro"];

    var match = new ActionRouteMatch(route, res);

    for(var v in match.args)
        equals(v, undefined);
    
    for(var v in match.query)
        equals(v, undefined);
});

test("match with querystring defines match.args and match.query, and match.paramsOrded too.", function() {
    expect(5);

    var route = { path: "/foo/boo/burro", paramsOrded: [] };
    var res = ["/foo/boo/burro", "?id=10&name=Lemol", "id=10&name=Lemol"];

    var match = new ActionRouteMatch(route, res);

    equals(match.paramsOrded, route.paramsOrded);
    equals(match.args.id, "10");
    equals(match.args.name, "Lemol");
    equals(match.query.id, "10");
    equals(match.query.name, "Lemol");
});

test("match with one parameters should define match.params and match.args, and match.paramsOrded too.", function() {
    expect(3);

    var route = { path: "/foo/:id/burro", paramsOrded: ["id"] };
    var res = ["/foo/boo/burro", "10"];

    var match = new ActionRouteMatch(route, res);

    equals(match.paramsOrded, route.paramsOrded);
    equals(match.args.id, "10");
    equals(match.params.id, "10");
});

test("match with many parameters should define match.params and match.args, and match.paramsOrded too.", function() {
    expect(7);

    var route = { path: "/foo/:id/burro/:name/:country", paramsOrded: ["id", "name", "country"] };
    var res = ["/foo/10/burro/Lemol/Angola", "10", "Lemol", "Angola"];

    var match = new ActionRouteMatch(route, res);

    equals(match.paramsOrded, route.paramsOrded);
    equals(match.args.id, "10");
    equals(match.params.id, "10");
    equals(match.args.name, "Lemol");
    equals(match.params.name, "Lemol");
    equals(match.args.country, "Angola");
    equals(match.params.country, "Angola");
});
