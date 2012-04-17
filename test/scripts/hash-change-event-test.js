/// <reference file="../libs/qunit-git.js" />

module("HashChangedEvent");

test("Ensure that window.HashChangeEvent is defined. (cross-browser test)", function() {
    expect(1);

    ok(window.HashChangeEvent);
});

test("Ensure that window.location.assign is defined. (cross-browser test)", function() {
    expect(1);

    ok(window.location.assign);
});

asyncTest("window.onhashchange is trigged when changed the hash.", function() {

    var onhashchange = function() {
        ok(true);
        start();
        window.onhashchange = undefined;
        window.location.assign("#");
    };
    window.onhashchange = onhashchange;
    
    expect(1);
    window.location.assign("#!/newhash");
});

asyncTest("window.onhashchange is trigged and e.newURL and e.oldURL are right. (why?)", function() {
    
    var oldURL = window.location.href;
    var newHash = '#!/newhash'
    var newURL = window.location.href.substring(0, window.location.href.indexOf('#')) + newHash;

    var onhashchange = function(e) {
        equals(e.oldURL, oldURL);
        equals(e.newURL, newURL);
        start();
        window.onhashchange = undefined;
        window.location.assign("#");
    };
    window.onhashchange = onhashchange;
    
    expect(2);
    window.location.assign(newHash);
});

test("", function() {
});
