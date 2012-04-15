module("HashChangedEvent");

test("Ensure that window.HashChangeEvent is defined. (cross-browser test)", function() {
    expect(1);

    ok(window.HashChangeEvent);
});

test("Ensure that window.location.assign is defined. (cross-browser test)", function() {
    expect(1);

    ok(window.location.assign);
});

test("window.onhashchanged is trigged when changed the hash.", function() {

    var a = 0;
    window.onhashchange = function() {
        a = 1;
    };
    window.location.assign("#!/newhash");

    setTimeout(function(){
        equals(a, 1);
    }, 2000);

});