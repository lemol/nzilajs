/// <reference file="nzila.js" />

(function(window, nzila){

    if(!window.HashChangeEvent) {
        var HashChangedEvent = function(oldUrl, newUrl) {
            this.oldUrl = oldUrl;
            this.newUrl = newUrl;
        };
        window.HashChangeEvent = HashChangedEvent;
    }

    window.onhashchange = function(e) {
        var req = new nzila.Request(e.oldURL, e.newURL||window.location.href);
        nzila.worker.notify(req);
    };

})(window,window.nzila);
