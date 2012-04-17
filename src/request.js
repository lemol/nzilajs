(function(nzila){

    var Request = nzila.Request = function(oldURL, newURL) {
        this.oldURL = oldURL;
        this.newURL = newURL;
    };

    Request.prototype = {
        getHash: function() {
            return (this.newURL.match(/#!(.*)$/)||[])[1] || "";
        }
    };

})(window.nzila);