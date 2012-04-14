module('nzila');

function FooController() {
}

test("Register controller with class OK.", function() {
    expect(1);

    nzila.registerController({
        "foo": FooController
    });

    equals( nzila.getController("foo"), FooController );
});

test("Register controller with script OK.", function() {
    expect(1);

    nzila.registerController({
        "foo": "foo.js"
    });

    equals( nzila.getController("foo")scriptName, "foo.js" );
});