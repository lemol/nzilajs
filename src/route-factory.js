(function(nzila){
    var ActionRoute = nzila.ActionRoute,
        RouteType = nzila.RouteType,
        ControllerRoute = nzila.ControllerRoute;

    var RouteFactory = nzila.RouteFactory = function() {
    };

    RouteFactory.prototype.createRoute = function(path, handler) {
        if(typeof(handler) === 'function') {
            return new ActionRoute(path, handler);
        }
        else if(typeof(handler) === 'object') {

            if(handler instanceof nzila.Controller)
                return new ControllerRoute(path, handler);

            /*switch(handler.type) {
                case RouteType.Action: return new ActionRoute(path, handler);
                case RouteType.Controller: return new ControllerRoute(path, handler);
            }*/
        }
    };

})(window.nzila);