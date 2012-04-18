(function(nzila){
    
    var RouteType = nzila.RouteType = { Action: 1, Controller: 2 },
        RouteMatch = nzila.RouteMatch;

    var Route = nzila.Route = function(path, handler, type) {
        this.path = path;
        this.handler = handler;
        this.type = type;
    };
    
    var ControllerRoute = nzila.ControllerRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Controller]);
    };

    ControllerRoute.prototype.exec = function(context) {
        context.action(context.args, context.params, context.query);
    };

    ControllerRoute.prototype.match = function(hash) {
        var rgx = new RegExp('^[\\/]?'+this.path+'[\\/]?(.+)$');
    };

})(window.nzila);

