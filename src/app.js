(function(nzila){

    var App = nzila.App = function(router) {
        this.router = router || new nzila.Router();
    };

    App.prototype.route = function(path, handler) {
        var route = (new nzila.RouteFactory()).createRoute(path, handler);
        this.router.register(route);
    };

    App.prototype.exec = function(req) {
        var handler = new nzila.RequestHandler(req, this.router);
        var match = handler.getRouteMatch();
        match.route.exec(match.args, match.params, match.query);
    };

    App.prototype.start = function(worker) {

        (worker||nzila.worker).registerApp(this);

    };

})(window.nzila);