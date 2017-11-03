"use strict";
const Component_1 = require("./Component");
/**
 * 控制器基类
 */
class Controller extends Component_1.default {
    /**
     * constructor
     */
    constructor(context) {
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
    beforeActionCall(request, response) {
        this.triggerWithRestParams(this.EVENT_BEFORE_ACTIONCALL, request, response);
    }
    /**
     * 控制器方法执行后
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    afterActionCall(request, response) {
        this.triggerWithRestParams(this.EVENT_AFTER_ACTIONCALL, request, response);
    }
    /**
     * 执行控制器的方法
     *
     * @param {http.ServerRequest} request
     * @param {http.ServerResponse} response
     */
    runControllerAction(request, response) {
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
    run(request, response) { }
    /**
     * 获取视图类
     *
     * @return {Object}
     */
    getView() { }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;
//# sourceMappingURL=Controller.js.map