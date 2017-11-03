"use strict";
/**
 * @author
 * @license MIT
 */
const Candy_1 = require("../Candy");
const StringHelper_1 = require("../helpers/StringHelper");
/**
 * MVC 基类
 */
class Core {
    /**
     * constructor
     */
    constructor() {
        this.interceptAll = null;
        this.routesMap = null;
        this.modules = null;
        this.defaultRoute = 'index/index';
        this.defaultControllerNamespace = 'app/controllers';
        this.defaultControllerId = 'index';
    }
    /**
     * 创建控制器实例
     *
     * @param {String} route 路由
     */
    createController(route) {
        /**
         * @var {String} moduleId 当前的模块
         */
        let moduleId = '';
        /**
         * @var {String} controllerId 当前的控制器
         */
        let controllerId = '';
        /**
         * @var {String} subRoute 子目录
         *
         * eg. subRoute = ''  ->  app/views/xxx.html
         * eg. subRoute = 'subdir'  ->  app/views/subdir/xxx.html
         *
         */
        let subRoute = '';
        route = StringHelper_1.default.lTrimChar(route, '/');
        // route eg. index/index
        if ('' === route || '/' === route) {
            route = this.defaultRoute;
        }
        // 检测非法
        if (!/^[\w\-\/]+$/.test(route) || route.indexOf('//') >= 0) {
            return null;
        }
        // 拦截路由
        if (null !== this.interceptAll) {
            return Candy_1.default.createObject(this.interceptAll);
        }
        // 解析路由
        // 目录前缀或模块 id
        let id = '';
        let pos = route.indexOf('/');
        if (-1 !== pos) {
            id = route.substring(0, pos);
            route = route.substring(pos + 1);
            controllerId = route;
        }
        else {
            id = route;
            route = '';
        }
        // 保存前缀
        subRoute = id;
        // 保存当前控制器标识
        if (-1 !== (pos = route.lastIndexOf('/'))) {
            subRoute = subRoute + '/' + route.substring(0, pos);
            controllerId = route.substring(pos + 1);
        }
        if ('' === controllerId) {
            controllerId = this.defaultControllerId;
        }
        // 搜索顺序 用户配置 -> 模块控制器 -> 普通控制器
        // 模块没有前缀目录
        let clazz = null;
        if (null !== this.routesMap && undefined !== this.routesMap[id]) {
            return Candy_1.default.createObject(this.routesMap[id], {
                moduleId: moduleId,
                controllerId: controllerId,
                subRoute: subRoute
            });
        }
        if (null !== this.modules && undefined !== this.modules[id]) {
            moduleId = id;
            clazz = StringHelper_1.default.trimChar(this.modules[id], '/')
                + '/controllers/'
                + StringHelper_1.default.ucFirst(controllerId) + 'Controller';
            return Candy_1.default.createObject(clazz, {
                moduleId: moduleId,
                controllerId: controllerId,
                subRoute: subRoute
            });
        }
        clazz = this.defaultControllerNamespace
            + '/'
            + subRoute
            + '/'
            + StringHelper_1.default.ucFirst(controllerId) + 'Controller';
        return Candy_1.default.createObject(clazz, {
            moduleId: moduleId,
            controllerId: controllerId,
            subRoute: subRoute
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Core;
//# sourceMappingURL=Core.js.map