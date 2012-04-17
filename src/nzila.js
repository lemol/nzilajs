(function(window){
    window.nzila = function() {
    };
})(window);

/*
(function(window){

    function ControllerHandler(){
        this.ctrs = [];
        return this;
    }

    ControllerHandler.prototype = {

        addController: function(cls, nome){
            this.ctrs.push({cls:cls, nome:nome});
        },

        getController: function(nome){
            return new (this.getControllerClass())();
        },

        getControllerClass: function(name) {
            return this.ctrs.filter(function(x){ return x.nome === nome; })[0].cls);
        }

    };

    var ch = null;
    var getControllerHandler = function() {
        if( ch === null )
            ch = new ControllerHandler();

        if(arguments.length == 2)
            ControllerHandler.prototype.addController.apply(ch, arguments);
        else if(arguments.length == 1)
            return ControllerHandler.prototype.getController.apply(ch, arguments);
        else
            return ch;
    }

    window.ControllerHandler = getControllerHandler;

})(window);

(function(window){


    window.onhashchange = function(e){
        
        if(true || e.returnValue == true){
            
            if( window.location.hash.indexOf('#') === -1 ) {
                var cntroller = ControllerHandler().getController(ControllerHandler.defaults.split('/')[0]);
                var ation = cntroller[ControllerHandler.defaults.split('/')[1]];
                ation();
                return;
            }

            var fullPath = window.location.hash.substring(2); //"leza/morais/lutonda/lemol?tag=lemol&id=1234&nome=leiza";
            var pathAndQueryRe = /(^\/?[\w\/]+\/?)\??(.+$)?/;
            var pathRe = /\/?(\w+)\/?/g;
            var queryRe = /&?(\w+=[\w-]+)&?/g;

            var pq = pathAndQueryRe.exec(fullPath);

            var path = pq[1];
            var query = pq[2];

            var rotas = [];
            var c = null;

            while( (c = pathRe.exec(path)) )
                rotas.push(c[1]);

            var req = {};
            while( (c = queryRe.exec(query)) ){
                var sl = c[1].split('=');

                req[sl[0]] = sl[1];
            }


            var controller;
            var action;
            
            var _routes = [];

            while( (c = pathRe.exec(ControllerHandler.router)) ){
                _routes.push( c[1] );
            }

            var indexOfController = _routes.indexOf("controller");

            if( !rotas[indexOfController] ) {
                controller = ControllerHandler().getController(ControllerHandler.defaults.split('/')[0]);
            }
            else {
                controller = ControllerHandler().getController(rotas[indexOfController]);
            }

            var cc = ControllerHandler().getControllerClass();

            if( cc.routes ) {

                for( var i=0; i<cc.routes; i++ ) {

                    var route = cc.routes[0];



                }

            }

            var indexOfAction = _routes.indexOf("action");

            if( !rotas[indexOfAction] ){
                action = controller[ControllerHandler.defaults.split('/')[1]];
            }
            else {
                action = controller[rotas[indexOfAction]];
            }

            action(req);

        }

    };

    

})(window);


function nadanao() {
    return 1;
}
*/