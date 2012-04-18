(function(nzila, helpers){

    var Controller = nzila.Controller = function(type, path, defaults) {
        if(!(this instanceof Controller)) {
            return new Controller(type, path, defaults);
        }

        this.type = type;
        this.path = path || "<action>/:id";
        this.defaults = defaults || "index/";

        this.pathRgx = helpers.prepareRgx(this.path);
        this.paramsOrded = helpers.getParamsOrded(this.path);
    };

    Controller.prototype.match = function(hash) {
        var result = {};

        for(var action in this.type.prototype) {
            if(action[0]!=='_') {
                var path = this.path.replace("<action>", action);
                var rgx = helpers.prepareRgx(path); //new RegExp('^[\\/]?'+path+'[\\/]?(\\?(.+)?|)$');
                var res = hash.match(rgx);

                if(!res) continue;

                result.action = action;
                result.params = {};

                for(var i=0; i<this.paramsOrded.length; i++) {
                    result.params[this.paramsOrded[i]] = res[i+1];
                }

                return result;
            }
        }

        return result;
    };

    Controller.prototype.createInstance = function() {
        return new this.type(arguments)
    };

})(window.nzila, window.nzila.helpers);
