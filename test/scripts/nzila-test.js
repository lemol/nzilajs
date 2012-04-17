module("nzila");

test("namespace is defined.", function() {
    ok(nzila);
});

test("has App defined.", function() {
    ok(nzila.App);
});

test("has Router defined.", function() {
    ok(nzila.Router);
});

test("has Controller defined.", function() {
    ok(nzila.Controller);
});

test("has Action defined.", function() {
    ok(nzila.Action);
});

test("has Model defined.", function() {
    ok(nzila.Model);
});