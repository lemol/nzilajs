(function(nzila, helpers){
    var Route = nzila.Route,
        RouteType = nzila.RouteType;

    var ActionRoute = nzila.ActionRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Action]);
    };

    ActionRoute.prototype.exec = function(context) {
        this.handler(context.args, context.params, context.query);
    };

    ActionRoute.prototype.match = function(hash) {
        var rgx = new RegExp('^[\\/]?'+this.path+'[\\/]?(\\?(.+)?|)$');
        var res = hash.match(rgx);

        if(!res)
            return false;

        var match = new ActionRouteMatch(this, res);
        return match;
    };

    var ActionRouteMatch = nzila.ActionRouteMatch = function(route, res) {
        this.route = route;
        this.args = {};
        this.query = helpers.getQueryStringParams(res[res.length-1]);

        for(var q in this.query)
            this.args[q] = this.query[q];

    };

})(window.nzila, window.nzila.helpers);