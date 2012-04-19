(function(nzila, helpers){
    var Route = nzila.Route,
        RouteType = nzila.RouteType;


    var ControllerRoute = nzila.ControllerRoute = function(path, handler) {
        Route.apply(this, [path, handler, RouteType.Controller]);
        
        this.pathRgx = prepareControllerRgx(this.path);
        this.paramsOrded = helpers.getParamsOrded(this.path);
    };

    ControllerRoute.prototype.exec = function(context) {
        var controller = this.handler.createInstance();

        var args = [];

        for(var i=0; i<context.paramsOrded.length; i++)
            args.push(context.params[context.paramsOrded[i]]);

        controller[context.action].apply(controller, args);
    };

    ControllerRoute.prototype.match = function(hash) {
        var res = hash.match(this.pathRgx);

        if(!res)
            return false;

        var match = new ControllerRouteMatch(this, res);
        return match;
    };

    var ControllerRouteMatch = nzila.ControllerRouteMatch = function(route, res) {
        this.route = route;
        
        var path = res[1];

        var context = route.handler.match(path);
        this.paramsOrded = context.paramsOrded || [];
        this.action = context.action || "";
        this.params = context.params || {};

        this.args = {};
        var qs = (res[res.length-1] && res[res.length-1].substring(res[res.length-1].indexOf('?')==-1?0:(res[res.length-1].indexOf('?')+1)))||"";
        this.query = helpers.getQueryStringParams(qs);

        for(var q in this.query)
            this.args[q] = this.query[q];

    };

    function prepareControllerRgx(path) {
        path = path.trimChar('/')
                   .replace(escapeRegExp, "\\$&")
                   .replace(namedParam, "([^\/?]*)")
                   .replace(splatParam, "([^\?]*)");
        path += '([\/]?|\/(.+))';
        return new RegExp('^[\/]?' + path + '$');
    }

var queryStringParam = /^\?(.*)/;
var namedParam    = /:([\w\d]+)/g;
var splatParam    = /\*([\w\d]+)/g;
var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

})(window.nzila, window.nzila.helpers);