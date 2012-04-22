module("Worker");
var Worker = nzila.Worker;

test("Worker instance is defined.", function() {
    expect(1);

    ok(nzila.worker);
});

asyncTest("window.onhashchage notify to nzila.worker.", function() {
    expect(1);

    var worker = new Worker();
    
    worker.notify = function() {
        ok(true);
        start();
    };
    start();
    //window.location.assign("#!/newurl/");
});

test("registerApp OK.", function() {
    expect(2);

    var app = {};
    var worker = new Worker();
    var pushToApps = sinon.spy(worker.apps, 'push');

    worker.registerApp(app);

    ok(pushToApps.calledOnce);
    ok(pushToApps.calledWith(app));
});

test("registerApp should not register just registed app.", function() {
    expect(1);

    var app = {};
    var worker = new Worker();
    worker.registerApp(app);

    var pushToApps = sinon.spy(worker.apps, 'push');
    worker.registerApp(app);

    ok(!pushToApps.called);
});

test("notify should not notify apps that are not running.", function() {
    expect(1);

    var app = {running: false, exec: sinon.spy()};
    var worker = new Worker();
    worker.registerApp(app);

    worker.notify({});

    ok(!app.exec.called);
});

test("notify should notify apps that are running.", function() {
    expect(1);

    var app = {running: true, exec: sinon.spy()};
    var worker = new Worker();
    worker.registerApp(app);

    worker.notify({});

    ok(app.exec.calledOnce);
});

test("notify should notify with the correct request argument.", function() {
    expect(2);

    var app = {running: true, exec: sinon.spy()};
    var worker = new Worker();
    worker.registerApp(app);
    var request = {};

    worker.notify(request);

    ok(app.exec.calledOnce);
    ok(app.exec.calledWith(request));
});
