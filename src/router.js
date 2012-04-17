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

    Router.prototype.match = function(hash) {
        for(var i=0; i<this.routes; i++) {
            if(this.routes[i].match)
                return this.routes[i];
        }
    };

})(window.nzila);