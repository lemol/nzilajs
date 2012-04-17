module("Worker");

test("Worker instance is defined.", function() {
    expect(1);

    ok(nzila.worker);
});

asyncTest("window.onhashchage notify to nzila.worker.", function() {
    expect(1);

    var bkup = nzila.worker.notify;
    nzila.worker.notify = function() {
        ok(true);
        start();
        nzila.worker.notify = bkup;
    };

    window.location.assign("#!/newurl/");
});
