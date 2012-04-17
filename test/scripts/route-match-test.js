module("RouteMatch");
var RouteMatch = nzila.RouteMatch;

test("constructor", function() {
    expect(1);

    var route = { path: "/foo/boo/burro" };
    var res = ["/foo/boo/burro"];

    var match = new RouteMatch(route, res);

    equals(match.route, route);
});