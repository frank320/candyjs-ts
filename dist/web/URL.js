"use strict";
const StringHelper_1 = require("../helpers/StringHelper");
/**
 * Uniform Resource Location
 *
 * @see https://tools.ietf.org/html/rfc1738
 */
class URL {
    /**
     * constructor
     */
    constructor(request) {
        this.request = request;
    }
    /**
     * 获取引用网址
     *
     * @return {String}
     */
    getReferer() {
        if (undefined !== this.request.headers.referer) {
            return this.request.headers.referer;
        }
        return '';
    }
    /**
     * 获取 URI 协议和主机部分
     *
     * @return {String}
     */
    getHostInfo() {
        let protocol = undefined !== this.request.socket['encrypted']
            || this.request.headers['x-forwarded-protocol'] === 'https'
            ? 'https'
            : 'http';
        let host = protocol + '://' + this.request.headers.host;
        return host;
    }
    /**
     * 获取当前网址 不包含锚点部分
     *
     * @return {String}
     */
    getCurrent() {
        return this.getHostInfo() + this.request.url;
    }
    /**
     * 创建一个 url
     *
     * eg.
     *
     * // scheme://host/index/index
     * url.to('index/index')
     *
     * // scheme://host/index/index?id=1#anchor
     * url.to('index/index', {id: 1, '#': 'anchor'})
     *
     * @param {String} url
     * @param {Object} params
     * @return {String}
     */
    to(url, params = null) {
        let host = this.getHostInfo();
        let query = '';
        let anchor = '';
        url = host + '/' + url;
        if (null !== params) {
            if (undefined !== params['#']) {
                anchor = params['#'];
                delete params['#'];
            }
            for (let k in params) {
                query = query + k + '=' + params[k] + '&';
            }
            query = StringHelper_1.default.rTrimChar(query, '&');
            if ('' !== query) {
                url = url + '?' + query;
            }
            if ('' !== anchor) {
                url = url + '#' + anchor;
            }
        }
        return url;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = URL;
//# sourceMappingURL=URL.js.map