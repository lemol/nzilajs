(function(nzila){
    
    var RouteType = nzila.RouteType = { Action: 1, Controller: 2 };

    var Route = function(path, handler, type) {
        this.path = path;
        this.handler = handler;
        this.type = type;
    };
    
    var ActionRoute = nzila.ActionRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Action]);
    };

    ActionRoute.prototype.exec = function(args) {
        this.handler(args);
    };

    var ControllerRoute = nzila.ControllerRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Controller]);
    };

    var RouteFactory = nzila.RouteFactory = function() {
    };
    RouteFactory.prototype.createRoute = function(path, handler) {
        if(typeof(handler) === 'function') {
            return new ActionRoute(path, handler);
        }
    };

})(window.nzila);

