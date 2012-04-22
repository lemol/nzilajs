(function(nzila){

    var Request = nzila.Request = function(oldURL, newURL) {
        this.oldURL = oldURL;
        this.newURL = newURL;
    };

    Request.prototype = {
        getHash: function() {
            return this.newURL.trimLeft('#','!');
        }
    };

})(window.nzila);