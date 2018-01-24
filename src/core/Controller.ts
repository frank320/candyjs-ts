/**
 * @author
 * @license MIT
 */
import * as http from 'http';

import Component from './Component';

/**
 * 控制器基类
 */
export default class Controller extends Component {
    
    /**
     * @property {Object} context 上下文环境 用于保存当前请求相关的信息
     */
    protected context: any;

    /**
     * @property {String} EVENT_BEFORE_ACTIONCALL
     */
    public EVENT_BEFORE_ACTIONCALL: string;

     /**
     * @property {String} EVENT_AFTER_ACTIONCALL
     */
    public EVENT_AFTER_ACTIONCALL: string;

    /**
     * constructor
     */
    constructor(context: any) {
        super();
        
        this.context = context;
        this.EVENT_BEFORE_ACTIONCALL = 'beforeActionCall';
        this.EVENT_AFTER_ACTIONCALL = 'afterActionCall';
    }
    
    /**
     * 控制器方法执行前
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    public beforeActionCall(request: http.ServerRequest, response: http.ServerResponse) {
        this.triggerWithRestParams(this.EVENT_BEFORE_ACTIONCALL, request, response);
    }
    
    /**
     * 控制器方法执行后
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    public afterActionCall(request: http.ServerRequest, response: http.ServerResponse) {
        this.triggerWithRestParams(this.EVENT_AFTER_ACTIONCALL, request, response);
    }
    
    /**
     * 执行控制器的方法
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    public runControllerAction(request: http.ServerRequest, response: http.ServerResponse) {
        this.beforeActionCall(request, response);
        
        this.run(request, response);
        
        this.afterActionCall(request, response);
    }

    /**
     * 控制器入口
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    public run(request: http.ServerRequest, response: http.ServerResponse) {}
    
    /**
     * 获取视图类
     *
     * @return {Object}
     */
    getView() {}
    
}
