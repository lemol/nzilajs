(function(window){

    if(!window.HashChangeEvent) {
        var HashChangedEvent = function(oldUrl, newUrl) {
            this.oldUrl = oldUrl;
            this.newUrl = newUrl;
        };
        window.HashChangeEvent = HashChangedEvent;
    }

})(window);