(function(nzila){
    
    var RouteType = nzila.RouteType = { Action: 1, Controller: 2 },
        RouteMatch = nzila.RouteMatch;

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

    ActionRoute.prototype.match = function(hash) {
        var rgx = new RegExp('^[\\/]?'+this.path+'[\\/]?(\\?(.+)?|)$');
        var res = hash.match(rgx);

        if(!res)
            return false;

        var match = new RouteMatch(this, res);
        return match;
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

