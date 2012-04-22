module("App");
var App = nzila.App;

test("Constructor with no router argument sets default this.router.", function() {
    expect(1);

    var app = new nzila.App(undefined, {requestHandler: "merdas"}, fakeWorker);
    ok(app.router);
});

test("Constructor with no requestHandler argument sets default this.requestHandler.", function() {
    expect(1);

    var app = new nzila.App({router: "but not requestHandler"}, undefined, fakeWorker);
    ok(app.requestHandler);
});

test("Constructor with no worker argument sets default this.worker.", function() {
    expect(1);

    var app = new nzila.App({router: "but not requestHandler"}, {requestHandler: "merdas"}, undefined);
    ok(app.worker);
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

test("Constructor with requestHandler argument OK.", function() {
    expect(1);

    var app = new nzila.App(undefined, undefined, fakeWorker);

    equals(app.worker, fakeWorker);
});

test("Constructor should register the app to the worker.", function() {
    expect(2);

    var worker = {registerApp: sinon.spy()};
    var app = new App(fakeRouter, fakeRequestHandler, worker);

    ok(worker.registerApp.calledOnce);
    ok(worker.registerApp.calledWith(app));
});

test("Register simple route calls router.register. (nodejs style)", function () {
    expect(1);
    
    var fakeRouter = {
        register: sinon.spy()
    };
    var foo = function(){};
    var app = new nzila.App(fakeRouter, fakeRequestHandler, fakeWorker);
    app.route("foo", foo);

    ok(fakeRouter.register.calledOnce);
});

test("Register with simple function implies ActionRoute.", function() {
    expect(2);
    
    var fakeRouter = {
        register: sinon.spy()
    };
    var foo = function(){};
    var app = new nzila.App(fakeRouter, fakeRequestHandler, fakeWorker);
    var route = new nzila.ActionRoute("foo", foo);

    app.route("foo", foo);

    ok(fakeRouter.register.calledOnce);
    ok(fakeRouter.register.calledWith(route));
});

test("exec calls machedRoute.exec with corrects arguments.", function(){
    var app = new nzila.App(fakeRouter, requestHandler, fakeWorker);
    context.route.exec = sinon.spy();
    app.exec("");

    ok(context.route.exec.calledWith(context));
});

test("start should set this.running=true.", function() {
    expect(1);

    var app = new App(fakeRouter, fakeRequestHandler, fakeWorker);
    app.start();

    ok(app.running==true);
});

test("stop should set this.running=false.", function() {
    expect(1);

    var app = new App(fakeRouter, fakeRequestHandler, fakeWorker);
    app.start();
    app.stop();

    ok(app.running==false);
});

test("waitFor should: set running=false >> call fn >> set running=true.", function() {
    expect(2);

    var app = new App(fakeRouter, fakeRequestHandler, fakeWorker);
    app.start();

    app.waitFor(function(){
        ok(app.running===false);
    });

    ok(app.running===true);
});

var fakeWorker = {registerApp: new Function()};
var fakeRouter = {};
var fakeRequestHandler = {};
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