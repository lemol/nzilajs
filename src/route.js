(function(nzila){
    
    var RouteType = nzila.RouteType = { Action: 1, Controller: 2 },
        RouteMatch = nzila.RouteMatch;

    var Route = nzila.Route = function(path, handler, type) {
        this.path = path;
        this.handler = handler;
        this.type = type;
    };
    
})(window.nzila);

