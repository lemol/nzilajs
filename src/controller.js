(function(nzila, helpers){

    var Controller = nzila.Controller = function(type, path, defaults) {
        if(!(this instanceof Controller)) {
            return new Controller(type, path, defaults);
        }

        this.type = type;
        this.path = path || "<action>/:id";
        this.defaults = defaults || { action: "index", id: '' };
        this.paramsOrded = helpers.getParamsOrded(this.path);

        for(var p in this.defaults)
            this.path = this.path.replace(new RegExp(":" + p + "(/|$)?"), ":*" + p + "/");

        this.pathRgx = helpers.prepareRgx(this.path);
    };

    Controller.prototype.match = function(hash) {
        var result = {};
        result.paramsOrded = this.paramsOrded;

        for(var action in this.type.prototype) {
            if(action[0]!=='_') {
                var path = this.path.replace("<action>", action);
                var rgx = helpers.prepareRgx(path);
                var res = hash.match(rgx);

                if(!res) continue;

                result.action = action;
                result.params = {};

                for(var i=0; i<this.paramsOrded.length; i++) {
                    result.params[this.paramsOrded[i]] = res[i+1] && res[i+1] || (this.defaults[this.paramsOrded[i]] && this.defaults[this.paramsOrded[i]]);
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
