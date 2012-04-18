module("App");

test("Constructor with no router argument sets default this.router.", function() {
    expect(1);

    var app = new nzila.App(undefined, {requestHandler: "merdas"});
    ok(app.router);
});

test("Constructor with no requestHandler argument sets default this.requestHandler.", function() {
    expect(1);

    var app = new nzila.App({router: "but not requestHandler"});
    ok(app.requestHandler);
});

test("Constructor with router argument OK.", function(){
    expect(1);

    var fakeRouter = { merda: 0 };
    var app = new nzila.App(fakeRouter);

    equals(app.router, fakeRouter);
});

test("Constructor with requestHandler argument OK.", function() {
    expect(1);

    var fakeRequestHandler = { merda: 0 };
    var app = new nzila.App(undefined, fakeRequestHandler);

    equals(app.requestHandler, fakeRequestHandler);
});

test("Register simple route calls router.register. (nodejs style)", function () {
    expect(1);
    
    var fakeRouter = {
        register: sinon.spy()
    };
    var foo = function(){};
    var app = new nzila.App(fakeRouter);
    app.route("foo", foo);

    ok(fakeRouter.register.calledOnce);
});

test("Register with simple function implies ActionRoute.", function() {
    expect(2);
    
    var fakeRouter = {
        register: sinon.spy()
    };
    var foo = function(){};
    var app = new nzila.App(fakeRouter);
    var route = new nzila.ActionRoute("foo", foo);

    app.route("foo", foo);

    ok(fakeRouter.register.calledOnce);
    ok(fakeRouter.register.calledWith(route));
});

test("exec calls machedRoute.exec with corrects arguments.", function(){
    var app = new nzila.App({}, requestHandler);
    context.route.exec = sinon.spy();
    app.exec("");

    ok(context.route.exec.calledWith(context));
});

var requestHandler;
var context;
(function(){
    context = {
        route: {}
    };
    requestHandler = {
        getRouteMatch: function() {
            return context;
        }
    };
})();

//test("start() will make