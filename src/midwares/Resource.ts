/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
import * as fs from 'fs';
import * as http from 'http';

import Request from '../web/Request';

/**
 * 静态资源处理
 */
export default class Resource {

    /**
     * MimeType
     */
    public static mime = {
        'js': 'text/javascript',
        'css': 'text/css',

        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',

        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',

        'swf': 'application/x-shockwave-flash'
    };

    /**
     * 缓存
     */
    public static cache = {
        // 那些资源需要缓存
        'regExp': /(\.gif|\.jpg|\.jpeg|\.png|\.js|\.css)$/ig,
        // 缓存时间毫秒
        'maxAge': 1000 * 3600 * 24 * 30
    };

    public root: string;
    public options: any;

    /**
     * constructor
     *
     * @param {String} root 静态资源目录
     * @param {Object} options 配置参数
     *
     * {
     *    mime: { ... },
     *    cache: {regExp, maxAge}
     * }
     *
     */
    constructor(root, options = {}) {
        this.root = root;
        this.options = options;
    }

    /**
     * 入口
     *
     * @return {Function} 中间件
     */
    public serve() {
        return this.handler.bind(this);
    }

    /**
     * 是否是静态资源
     *
     * @param {http.ServerRequest} request 请求对象
     * @return {Boolean}
     */
    public isStatic(request: http.ServerRequest): boolean {
        let ret = false;
        let pathname = Request.parseUrl(request).pathname;
        let ext = this.getExtName(pathname).substring(1);
        let mime = undefined === this.options.mime ?
            Resource.mime :
            Object.assign({}, Resource.mime, this.options.mime);

        if('' === ext) {
            return false;
        }

        for(let key in mime) {
            if(ext === key) {
                ret = true;
                break;
            }
        }

        return ret;
    }

    /**
     * 获取 mimeType
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    public getMimeType(pathName: string): string {
        let ret = '';
        let ext = this.getExtName(pathName).substring(1);
        let mime = undefined === this.options.mime ?
            Resource.mime :
            Object.assign({}, Resource.mime, this.options.mime);

        for(let key in mime) {
            if(ext === key) {
                ret = mime[key];
                break;
            }
        }

        return ret;
    }

    /**
     * 获得扩展名
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    public getExtName(pathName: string): string {
        return pathName.substring(pathName.lastIndexOf('.'));
    }

    /**
     * 处理静态资源
     *
     * @param {Object} request
     * @param {Object} response
     * @param {any} next
     */
    public handler(request: http.ServerRequest, response: http.ServerResponse, next: any) {
        if('GET' !== request.method || !this.isStatic(request)) {
            next();
            return;
        }

        let pathname = Request.parseUrl(request).pathname;
        let mimeType = this.getMimeType(pathname);
        pathname = (this.root + pathname).replace(/\.\.\//g, '');

        fs.stat(pathname, (err, stats) => {
            if(null !== err) {
                response.writeHead(404);
                response.end();
                return;
            }

            if(stats.isDirectory()) {
                response.writeHead(403);
                response.end();
                return;
            }

            // headers
            response.setHeader('Content-Type', '' === mimeType ? 'text/plain' : mimeType);
            response.setHeader('Last-Modified', stats.mtime.toUTCString());

            // 设置缓存
            let extName = this.getExtName(pathname);
            let cacheConfig = undefined === this.options.cache ?
                Resource.cache : this.options.cache;

            if(cacheConfig.regExp.test(extName)) {
                response.setHeader('Expires', new Date(Date.now() + cacheConfig.maxAge).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + cacheConfig.maxAge / 1000);
            }

            // 有缓存直接返回
            if(stats.mtime.toUTCString() === request.headers['if-modified-since']) {
                response.writeHead(304);
                response.end();
                return;
            }

            let rs = fs.createReadStream(pathname);
            response.writeHead(200);
            rs.pipe(response);
        });
    }

}
