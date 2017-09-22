/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
import * as http from 'http';
import * as url from 'url';
import * as querystring from 'querystring';

import Cookie from './Cookie';
import CoreRequest from '../core/Request';

/**
 * 请求
 */
export default class Request extends CoreRequest {
    
    /**
     * constructor
     */
    constructor(request: http.ServerRequest) {
        super(request);
    }
    
    /**
     * 解析 request url
     *
     * @param {http.ServerRequest} request 请求对象
     */
    public static parseUrl(request: http.ServerRequest) {
        let obj = url.parse(request.url);
        
        return {
            protocol: obj.protocol,
            host: obj.host,
            hash: obj.hash,
            query: obj.query,
            additionalQuery: undefined === request['additionalQuery'] ? null : request['additionalQuery'],
            pathname: obj.pathname
        };
    }
    
    /**
     * 获取客户端 ip
     *
     * @param {http.ServerRequest} request 请求对象
     */
    public static getClientIp(request: http.ServerRequest) {
        let forward = request.headers['x-forwarded-for'];
        if(undefined !== forward) {
            return (<string>forward).substring(0, forward.indexOf(','));
        }
        
        return request.connection.remoteAddress;
    }
    
    /**
     * 静态方法 获取 get 参数
     * 
     * @param {Object} request 请求对象
     * @param {String} param 参数名
     * @return {String | null | ''}
     */
    public static getQueryString(request: http.ServerRequest, param: string) {
        let parsed = Request.parseUrl(request);
        
        // 查找参数
        if(null !== parsed.query &&
            (0 === parsed.query.indexOf(param) ||
                parsed.query.indexOf('&' + param) > 0)) {
            
            return querystring.parse(parsed.query)[param];
        }
        
        if(null !== parsed.additionalQuery) {
            return parsed.additionalQuery[param];
        }

        return null;
    }
    
    /**
     * 静态方法 获取 post 参数
     * 
     * @param {http.ServerRequest} request 请求对象
     * @param {String} param 参数名
     * @return {String | null | undefined | ''}
     */
    public static getParameter(request: http.ServerRequest, param: string) {
        if(undefined === request['body']) {
            return null;
        }
        
        return request['body'][param];
    }
    
    /**
     * 
     * @param {http.ServerRequest} request 请求对象
     * @param {String} name cookie name
     */
    public static getCookie(request: http.ServerRequest, name: string) {
        return Cookie.getCookie(request, name);
    }
    
    /**
     * 获取 get 参数
     *
     * @param {String} param 参数名
     * @return {String | null | ''}
     */
    public getQueryString(param: string) {
        var parsed = Request.parseUrl(this.request);
        
        // 查找参数
        if(null !== parsed.query &&
            (0 === parsed.query.indexOf(param) ||
                parsed.query.indexOf('&' + param) > 0)) {
            
            return querystring.parse(parsed.query)[param];
        }
        
        if(null !== parsed.additionalQuery) {
            return parsed.additionalQuery[param];
        }

        return null;
    }
    
    /**
     * 设置 get 参数
     *
     * @param {String} param 参数名
     * @param {String} value 参数值
     */
    public setQueryString(param: string, value: string) {
        if(undefined === this.request['additionalQuery']) {
            this.request['additionalQuery'] = {};
        }
        
        this.request['additionalQuery'][param] = value;
    }
    
    /**
     * 获取 post 参数
     *
     * @param {String} param 参数名
     * @return {String | null | undefined | ''}
     */
    public getParameter(param: string) {
        if(undefined === this.request['body']) {
            return null;
        }
        
        return this.request['body'][param];
    }
    
    /**
     * 获取 cookie
     *
     * @param {String} name cookie name
     */
    public getCookie(name: string) {
        return Cookie.getCookie(this.request, name);
    }
    
}
