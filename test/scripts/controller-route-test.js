var RouteType = nzila.RouteType;

module("ControllerRoute");
var ControllerRoute = nzila.ControllerRoute;

test("Constructor OK.", function(){
    expect(3);

    var route = new ControllerRoute("foo", foo);

    equals(route.path, "foo");
    equals(route.handler, foo);
    equals(route.type, RouteType.Controller);
});

test("exec should call the correct action.", function() {
    expect(1);

    var context = { action: "lemol", paramsOrded: [] };
    var handler = Hello.prototype.lemol = sinon.spy();

    var route = new ControllerRoute("foo", foo);
    route.exec(context);

    ok(handler.calledOnce);
});

test("exec should pass all parameters in the correct order to the handler call.", function(){
    expect(1);

    var context = { action: "lemol", args: {a:1,b:2,c:3}, params: {a:1,b:2,c:3}, query: {}, paramsOrded: ["b","c","a"] };
    var handler = Hello.prototype.lemol = sinon.spy();

    var route = new ControllerRoute("foo", foo);
    route.exec(context);

    ok(handler.calledWith(context.params.b, context.params.c, context.params.a));
});

test("match with simple path.", function() {
    expect(4);

    var route = new ControllerRoute("foo", foo);
    foo.match = function() { return "index"; };

    ok(route.match("foo"));
    ok(route.match("/foo"));
    ok(route.match("foo/"));
    ok(route.match("/foo/"));
});

test("match with path with more actions.", function() {
    expect(4);

    var route = new ControllerRoute("foo", foo);
    foo.match = function(path) { return path; };
    
    ok(route.match("foo/lemol/"));
    ok(route.match("/foo/leza/morais"));
    ok(route.match("foo/lutonda/lemol/aqui/12/este"));
    ok(route.match("/foo/aUHSUahusA/HUSA/"));
});

test("match with path with querystring.", function() {
    expect(4);

    var route = new ControllerRoute("foo", foo);
    foo.match = function(path) { return path; };

    ok(route.match("foo/ja/ta?id=10&name=lemol"));
    ok(route.match("/foo/buj/kdf?id=10&name=lemol"));
    ok(route.match("foo/stino/eli/?id=10&name=lemol"));
    ok(route.match("/foo/welece/?id=10&name=lemol"));
});

test("dont match to wrong hash.", function() {
    expect(5);

    var route = new ControllerRoute("foo", foo);
    foo.match = function(path) { return false; };

    ok(!route.match("foos"));
    ok(!route.match("wfoo"));
    ok(!route.match("lemol/foo"));
    ok(!route.match("/tampoco/foo/lemol"));
    ok(!route.match("morais/foo/leza"));
});

module("ControllerRouteMatch");
var ControllerRouteMatch = nzila.ControllerRouteMatch;

test("constructor", function() {
    expect(1);

    var route = { path: "/foo/boo/burro", handler: { match: function() { return {action:1, params: 2}; } } };
    var res = ["/foo/boo/burro"];

    var match = new ControllerRouteMatch(route, res);

    equals(match.route, route);
});

test("match with no querystring should return with empty match.query.", function() {
    expect(0);

    var route = { path: "/foo/boo/burro", handler: { match: function() { return {action:1, params: 2}; } } };
    var res = ["/foo/boo/burro"];

    var match = new ControllerRouteMatch(route, res);

    for(var v in match.args)
        equals(v, undefined);
    
    for(var v in match.query)
        equals(v, undefined);
});

test("match with querystring defines match.args and match.query.", function() {
    expect(4);

    var route = { path: "/foo/boo/burro", handler: { match: function() { return {action:1, params: 2}; } } };
    var res = ["/foo/boo/burro", "?id=10&name=Lemol", "id=10&name=Lemol"];

    var match = new ControllerRouteMatch(route, res);

    equals(match.args.id, "10");
    equals(match.args.name, "Lemol");
    equals(match.query.id, "10");
    equals(match.query.name, "Lemol");
});

var foo;
var Hello;
(function(){
    
    Hello = function() {
    }

    Hello.prototype = {
        world: sinon.spy(),
        lemol: sinon.spy(),
        me: sinon.spy()
    };

    foo = {
        type: Hello,
        path: ":<action>/:id",
        defaults: "index/",
        createInstance: function() {
            return new Hello();
        }
    };

})();