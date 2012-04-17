module("App");

/*test("Constructor with no router argument sets default this.router.", function() {
    expect(1);

    var app = new nzila.App();
    ok(app.router);
});*/

test("Constructor with router argument OK.", function(){
    expect(1);

    var fakeRouter = { merda: 0 };
    var app = new nzila.App(fakeRouter);

    equals(app.router, fakeRouter);
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

