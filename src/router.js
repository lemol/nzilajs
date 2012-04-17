(function(nzila){

    var Router = nzila.Router = function(routes) {
        this.routes = routes || [];
    };

    Router.prototype.register = function(route) {
        this.routes.push(route);
    };

    Router.prototype.unregister = function(path) {
        return;
    };

    Router.prototype.getRoute = function(path) {
        return this.routes.filter(function(r){
            return r.path === path;
        })[0];
    };

    var Route = nzila.Route = function() {
    };

    nzila.RouteType = { Action: 1, Controller: 2 };

})(window.nzila);