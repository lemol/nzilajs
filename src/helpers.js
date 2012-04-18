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

    helpers.prepareRgx = function(path) {
        path = path.replace(escapeRegExp, "\\$&")
                   .replace(namedParam, "([^\/?]*)")
                   .replace(splatParam, "([^\?]*)");
        path += '([\/]?[\?]{1}.*)?';
        return new RegExp('^[\/]?' + path + '$');
    };

    helpers.getParamsOrded = function(path) {
        var matches = path.match(namedParam)||[];
        var result = [];

        for(var i=0; i<matches.length; i++) {
            result.push(matches[i].replace(':',''));
        }

        return result;
    };

    /// quickly from backbone.queryparam.js
var queryStringParam = /^\?(.*)/;
var namedParam    = /:([\w\d]+)/g;
var splatParam    = /\*([\w\d]+)/g;
var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

})(window.nzila);