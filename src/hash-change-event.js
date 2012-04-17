/// <reference file="nzila.js" />
/// <reference path="nzila.js" />

(function(window){

    if(!window.HashChangeEvent) {
        var HashChangedEvent = function(oldUrl, newUrl) {
            this.oldUrl = oldUrl;
            this.newUrl = newUrl;
        };
        window.HashChangeEvent = HashChangedEvent;
    }

})(window);
