(function(nzila){

    var RequestHandler = nzila.RequestHandler = function() {
    };

    RequestHandler.prototype.getRouteMatch = function(req, router) {
        var hash = req.getHash();
        var match = router.getMatch(hash, req);

        return match;
    };

})(window.nzila);