(function(nzila){

    var Controller = nzila.Controller = function(type, path, defaults) {
        if(!(this instanceof Controller)) {
            return new Controller(type, path, defaults);
        }

        this.type = type;
        this.path = path || ":<action>/:id";
        this.defaults = defaults || "index/";
    };

    Controller.prototype.match = function(hash) {
        for(var action in this.type.prototype) {
            if(action[0]!=='_') {
                var path = this.path.replace(":<action>", action);

                var rgx = new RegExp('^[\\/]?'+path+'[\\/]?(\\?(.+)?|)$');
                var res = hash.match(rgx);

            }
        }
    };

    Controller.prototype.createInstance = function() {
        return new this.type(arguments)
    };

})(window.nzila);
