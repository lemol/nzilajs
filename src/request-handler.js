(function(nzila){

    var RequestHandler = nzila.RequestHandler = function(req, router) {
        this.req = req;
        this.router = router;
    };

    RequestHandler.prototype.getRouteMatch = function() {
        var hash = this.req.getHash();
        var match = this.router.getMatch(hash);

        return match;
    };

})(window.nzila);