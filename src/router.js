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

    Router.prototype.getMatch = function(hash) {
        for(var i=0; i<this.routes.length; i++) {
            var match = this.routes[i].match(hash);
            if(match)
                return match;
        }
    };

})(window.nzila);