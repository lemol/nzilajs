(function(window,nzila){

    var Worker = nzila.Worker = function() {
        this.apps = [];
    };

    Worker.prototype = {
        registerApp: function(app) {
            if(this.apps.indexOf(app)===-1)
                this.apps.push(app);
        },
        notify: function(request) {
            for (var i=0; i<this.apps.length; i++) {
                var app = this.apps[i];
                if(app.running)
                    app.exec(request);
            }
        }
    };

    nzila.worker = new Worker();

})(window,window.nzila);