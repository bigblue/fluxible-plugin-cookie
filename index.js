'use strict';

var cookie = require('cookie');

function cookiePlugin() {
    return {
        name: 'CookiePlugin',
        plugContext: function (options) {
            var req = options.req;
            var res = options.res;

            return {
                plugActionContext: function (actionContext) {
                    actionContext.setCookie = function (name, value, options) {
                        var cookieStr = cookie.serialize(name, value, options);
                        if (res) {
                            res.setHeader('Set-Cookie', cookieStr);
                        } else {
                            document.cookie = cookieStr;
                        }
                    };
                    actionContext.getCookie = function (name) {
                        var cookies = req ? req.cookies : cookie.parse(document.cookie);
                        return cookies[name];
                    }
                }
            };
        }
    };
}

module.exports = cookiePlugin;
