
(function(window, nzila, helpers){

    window.onsubmit = function(e) {
        var form = e.target;
        var data = helpers.serializeForm(form);
        var action = form.getAttribute("action");
        var req = new nzila.Request(e.oldURL, action||window.location.href);
        req.form = data;

        nzila.worker.notify(req);
        return false;
    };

})(window,window.nzila,window.nzila.helpers);
