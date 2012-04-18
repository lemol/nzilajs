(function(nzila){

    var App = nzila.App = function(router, requestHandler) {
        this.router = router || new nzila.Router();
        this.requestHandler = requestHandler || new nzila.RequestHandler();
    };

    App.prototype.route = function(path, handler) {
        var route = (new nzila.RouteFactory()).createRoute(path, handler);
        this.router.register(route);
    };

    App.prototype.exec = function(req) {
        var context = this.requestHandler.getRouteMatch(req, this.router);
        context.route.exec(context);
    };

    App.prototype.start = function(worker) {

        (worker||nzila.worker).registerApp(this);

    };

})(window.nzila);