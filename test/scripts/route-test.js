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