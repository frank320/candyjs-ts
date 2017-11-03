"use strict";
/**
 * @author
 * @license MIT
 */
const Candy_1 = require("../Candy");
const Core_1 = require("./Core");
const InvalidConfigException_1 = require("./InvalidConfigException");
/**
 * 应用基类
 */
class Application extends Core_1.default {
    /**
     * constructor
     *
     * @param {Object} config 配置信息
     */
    constructor(config) {
        super();
        this.encoding = 'UTF-8';
        this.debug = false;
        this.exceptionHandler = '';
        Candy_1.default.app = this;
        this.init(config);
        Candy_1.default.config(this, config);
    }
    /**
     * 初始化应用
     *
     * @param {Object} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if (undefined === config['id']) {
            throw new InvalidConfigException_1.default('The "id" configuration is required');
        }
        if (undefined !== config['appPath']) {
            this.setAppPath(config['appPath']);
            delete config['appPath'];
        }
        else {
            throw new InvalidConfigException_1.default('The "appPath" configuration is required');
        }
        if (undefined !== config['runtimePath']) {
            this.setRuntimePath(config['runtimePath']);
            delete config['runtimePath'];
        }
        else {
            // set "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
        if (undefined !== config['rootPath']) {
            this.setRootPath(config['rootPath']);
            delete config['rootPath'];
        }
        else {
            this.setRootPath(process.env.pwd);
        }
    }
    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path) {
        Candy_1.default.setPathAlias('@app', path);
    }
    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath() {
        return Candy_1.default.getPathAlias('@app');
    }
    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path) {
        Candy_1.default.setPathAlias('@runtime', path);
    }
    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath() {
        return Candy_1.default.getPathAlias('@runtime');
    }
    /**
     * 设置 root 路径
     *
     * @param {String} path 路径
     */
    setRootPath(path) {
        Candy_1.default.setPathAlias('@root', path);
    }
    /**
     * 得到 root 目录
     *
     * @return {String} 路径
     */
    getRootPath() {
        return Candy_1.default.getPathAlias('@root');
    }
    /**
     * handler request
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request, response) { }
    /**
     * 异常处理
     *
     * @param {Object} response 输出类
     * @param {Exception} exception 异常类
     */
    handlerException(response, exception) { }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
//# sourceMappingURL=Application.js.map