(function(nzila){
    
    var App = nzila.App = function(router) {
        this.router = router || new nzila.Router();
    };

    App.prototype.route = function(path, handler) {
        var route = (new nzila.RouteFactory()).createRoute(path, handler);
        this.router.register(route);
    };

    App.prototype.exec = function(req) {
        var handler = new RequestHandler(req, this.router);
        var route = handler.getRoute();
        route.exec();
    };

})(window.nzila);