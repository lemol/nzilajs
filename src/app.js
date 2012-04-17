(function(nzila){
    
    var App = nzila.App = function(router) {
        this.router = router || new nzila.Router();
    };

    App.prototype.route = function(path, handler) {
        var route = (new nzila.RouteFactory()).createRoute(path, handler);
        this.router.register(route);
    };

    App.prototype.getRoute = function(path) {
        return this._routes.filter(function(r){ return r.path === path; })[0];
    };

})(window.nzila);