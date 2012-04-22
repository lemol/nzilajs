(function(nzila){

    var App = nzila.App = function(router, requestHandler, worker) {
        this.router = router || new nzila.Router();
        this.requestHandler = requestHandler || new nzila.RequestHandler();
        this.worker = worker || nzila.worker;
        this.worker.registerApp(this);
    };

    App.prototype.route = function(path, handler) {
        var route = (new nzila.RouteFactory()).createRoute(path, handler);
        this.router.register(route);
    };

    App.prototype.exec = function(req) {
        var context = this.requestHandler.getRouteMatch(req, this.router);
        context.route.exec(context);
    };

    App.prototype.start = function() {
        this.running = true;
    };

    App.prototype.stop = function() {
        this.running = false;
    };

    App.prototype.waitFor = function(fn, args) {
        this.stop();
        fn.call(args);
        this.start();
    };

})(window.nzila);