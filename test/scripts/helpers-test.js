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

module("string.trimChar");

test("one char at the begin.", function() {
    expect(1);

    var result = helpers.trimChar("/muchas/cositas/le/eche", "/");

    equals(result, "muchas/cositas/le/eche");
});

test("one char at the end.", function() {
    expect(1);

    var result = helpers.trimChar("muchas/cositas/le/eche/", "/");

    equals(result, "muchas/cositas/le/eche");
});

test("one char at the extremes.", function() {
    expect(1);

    var result = helpers.trimChar("/muchas/cositas/le/eche/", "/");

    equals(result, "muchas/cositas/le/eche");
});

test("many chars at the extremes.", function() {
    expect(1);

    var result = helpers.trimChar("///////////////muchas/cositas/le/eche//////", "/");

    equals(result, "muchas/cositas/le/eche");
});
module("prepareRgx");

test("test1", function() {
    expect(1);

    var result = helpers.prepareRgx("foo/:id/nome");

    equals(result.source, "^[\/]?foo/([^/?]*)/nome[\/]?([\?]{1}.*)?$");
});

test("test2", function() {
    expect(1);

    var result = helpers.prepareRgx("foo/:id/:date/:name");

    equals(result.source, "^[\/]?foo/([^/?]*)/([^/?]*)/([^/?]*)[\/]?([\?]{1}.*)?$");
});

test("should trim '/' at the begin of the path.", function () {
    expect(1);

    var result = helpers.prepareRgx("/foo/:id/:date/:name");

    equals(result.source, "^[\/]?foo/([^/?]*)/([^/?]*)/([^/?]*)[\/]?([\?]{1}.*)?$");
});

test("should trim '/' at the end of the path.", function () {
    expect(1);

    var result = helpers.prepareRgx("/foo/:id/:date/:name/");

    equals(result.source, "^[\/]?foo/([^/?]*)/([^/?]*)/([^/?]*)[\/]?([\?]{1}.*)?$");
});

test("should trim '/' at the extrems of the path.", function () {
    expect(1);

    var result = helpers.prepareRgx("/foo/:id/:date/:name/");

    equals(result.source, "^[\/]?foo/([^/?]*)/([^/?]*)/([^/?]*)[\/]?([\?]{1}.*)?$");
});

module("getParamsOrded");

test("test1", function() {
    expect(4);

    var result = helpers.getParamsOrded("foo/:id/:date/:name");

    equals(result.length, 3);
    equals(result[0], "id");
    equals(result[1], "date");
    equals(result[2], "name");
});