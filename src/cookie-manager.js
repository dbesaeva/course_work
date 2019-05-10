export default class CookieManager {
    /**
     * @param {String} name 
     * @param {String} value 
     * @param {Object} options
     * @return {void}
     */
    setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == 'number' && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + '=' + value;

        for (var propName in options) {
            if (!options.hasOwnProperty(propName)) {
                continue;
            }

            updatedCookie += '; ' + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    /**
     * @param {String} name
     * @return {void}
     */
    deleteCookie(name) {
        this.setCookie(name, '', {
            expires: -1
        });
    }

    /**
     * @param {String} name
     * @return {String}
     */
    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * @param {String} name
     * @return {Boolean}
     */
    hasCookie(name) {
        return this.getCookie(name) !== undefined;
    }
}