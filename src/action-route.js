(function(nzila, helpers){
    var Route = nzila.Route,
        RouteType = nzila.RouteType;

    var ActionRoute = nzila.ActionRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Action]);

        this.pathRgx = helpers.prepareRgx(this.path);
        this.paramsOrded = helpers.getParamsOrded(this.path);
    };

    ActionRoute.prototype.exec = function(context) {
        var args = [];

        for(var i=0; i<context.paramsOrded.length; i++)
            args.push(context.params[context.paramsOrded[i]]);

        this.handler.apply(this, args);
    };

    ActionRoute.prototype.match = function(hash, ctx) {
        var res = hash.match(this.pathRgx);

        if(!res)
            return false;

        var match = new ActionRouteMatch(this, res, ctx);
        return match;
    };

    var ActionRouteMatch = nzila.ActionRouteMatch = function(route, res, ctx) {
        this.route = route;
        this.paramsOrded = route.paramsOrded;
        this.args = {};
        this.query = helpers.getQueryStringParams(res[res.length-1]);
        this.params = {};

        for(var i=0; i<route.paramsOrded.length; i++) {
            this.params[route.paramsOrded[i]] = res[i+1] || ctx.form[route.paramsOrded[i]];
        }

        for(var p in this.params)
            this.args[p] = this.params[p];

        for(var q in this.query)
            this.args[q] = this.query[q];

        for(var c in ctx.form)
            if(!this.args[c])
                this.args[c] = ctx.form[c]

    };

})(window.nzila, window.nzila.helpers);