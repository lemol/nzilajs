(function(nzila){

    var helpers = nzila.helpers = {};

    helpers.getQueryStringParams = function(qs) {
        if(!qs)
            return {};

        var res = {};
        var params = qs.split('&');

        for(var i=0; i<params.length && params[i]!==''; i++) {
            var param = params[i].split("="),
                key = param[0],
                value = param[1];

            if(value!==undefined)
                res[key] = value;
        }

        return res;
    };

})(window.nzila);