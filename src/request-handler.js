(function(nzila){

    var RequestHandler = nzila.RequestHandler = function(req, router) {
        this.req = req;
        this.router = router;
    };

    RequestHandler.prototype.getRoute = function() {

        for (var i=0; i<this.router.length; i++) {
            var route = this.router[i];
            var hash = this.req.getHash();

            route.match(hash);
        }

    };

})(window.nzila);