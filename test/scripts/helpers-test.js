module("getQueryStringParams");
var helpers = nzila.helpers;

test("with empty string should return an empty object.", function() {
    expect(0);

    var result = helpers.getQueryStringParams("");

    for(var i in result)
        ok(false);
});

test("with no valid querystring should return an empty object.", function() {
    expect(0);

    var result = helpers.getQueryStringParams("/lemol/soft");

    for(var i in result)
        ok(false);
});

test("with one param.", function() {
    expect(1);

    var result = helpers.getQueryStringParams("id=lemol");

    equals(result.id, "lemol");
});

test("with many params.", function() {
    expect(5);

    var result = helpers.getQueryStringParams("id=lemol&name=Leza&mais=nada&e=12&de=dezembro");

    equals(result.id, "lemol");
    equals(result.name, "Leza");
    equals(result.mais, "nada");
    equals(result.e, "12");
    equals(result.de, "dezembro");
});

test("with empty-value param.", function() {
    expect(3);

    var result = helpers.getQueryStringParams("id=lemol&name=&mais=nada");

    equals(result.id, "lemol");
    equals(result.name, "");
    equals(result.mais, "nada");
});