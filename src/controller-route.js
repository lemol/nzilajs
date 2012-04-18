(function(nzila, helpers){
    var Route = nzila.Route,
        RouteType = nzila.RouteType;


    var ControllerRoute = nzila.ControllerRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Controller]);
    };

    ControllerRoute.prototype.exec = function(context) {
        var controller = this.handler.createInstance();
        controller[context.action](context.args, context.params, context.query);
    };

    ControllerRoute.prototype.match = function(hash) {
        var rgx = new RegExp('^[\\/]?'+this.path+'([\\/]?|\\/(.+))$');
        var res = hash.match(rgx);

        if(!res)
            return false;

        var match = new ControllerRouteMatch(this, res);
        return match;
    };

    var ControllerRouteMatch = nzila.ControllerRouteMatch = function(route, res) {
        this.route = route;
        
        var path = res[1];

        var context = route.handler.match(path);

        this.action = context.action;
        this.params = context.params;

        this.args = {};
        this.query = helpers.getQueryStringParams(res[res.length-1]);

        for(var q in this.query)
            this.args[q] = this.query[q];

    };

})(window.nzila, window.nzila.helpers);