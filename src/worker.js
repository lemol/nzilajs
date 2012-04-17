(function(window,nzila){

    var _apps;

    // Singleton
    var Worker = function() {
        _apps = [];
    };

    Worker.prototype = {
        registerApp: function(app) {
            if(_apps.indesOf(app)!==-1)
                _apps.push(app);
        },
        notify: function(request) {
            for (var i=0; i<_apps.length; i++) {
                _apps[i].exec(request);
            }
        }
    };

    nzila.worker = new Worker();

})(window,window.nzila);