module("request");
var Request = nzila.Request;

test("Constructor OK.", function() {
    expect(2);

    var req = new Request("http://roubatudoquepodes.com/index/", "http://roubatudoquepodes.com/index/#!/esta/fudido/mesmo?porra=sim");

    equals(req.oldURL, "http://roubatudoquepodes.com/index/");
    equals(req.newURL, "http://roubatudoquepodes.com/index/#!/esta/fudido/mesmo?porra=sim");
});

test("getHash ok.", function() {
    expect(1);

    var req = new Request("http://roubatudoquepodes.com/index/", "http://roubatudoquepodes.com/index/#!/esta/fudido/mesmo?porra=sim");

    equals(req.getHash(), "/esta/fudido/mesmo?porra=sim");
});

test("getHash returns empty string if there are no a hash.", function() {
    expect(1);

    var req = new Request("http://roubatudoquepodes.com/index/", "http://roubatudoquepodes.com/?nada=nao");

    equals(req.getHash(), "");
});