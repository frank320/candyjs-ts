/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
import Candy from '../Candy';
import Core from './Core';
import InvalidConfigException from './InvalidConfigException';

/**
 * 应用基类
 */
export default class Application extends Core {
    
    /**
     * @property {String} encoding 编码
     */
    public encoding: string;

    /**
     * @property {Boolean} debug 调试
     */
    public debug: boolean;

    /**
     * @property {String} exceptionHandler 异常处理类
     */
    public exceptionHandler: string;

    /**
     * constructor
     *
     * @param {JSON} config 配置信息
     */
    constructor(config) {
        super();
        
        this.encoding = 'UTF-8';
        this.debug = false;
        this.exceptionHandler = '';
        
        Candy.app = this;
        this.init(config);
        Candy.config(this, config);
    }
    
    /**
     * 初始化应用
     *
     * @param {Object} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config: object) {
        if(undefined === config['id']) {
            throw new InvalidConfigException('The "id" configuration is required');
        }
        
        if(undefined !== config['appPath']) {
            this.setAppPath(config['appPath']);
            delete config['appPath'];
            
        } else {
            throw new InvalidConfigException('The "appPath" configuration is required');
        }
        
        if(undefined !== config['runtimePath']) {
            this.setRuntimePath(config['runtimePath']);
            delete config['runtimePath'];
            
        } else {
            // set "app/runtime"
            this.setRuntimePath( this.getAppPath() + '/runtime');
        }
        
        if(undefined !== config['rootPath']) {
            this.setRootPath(config['rootPath']);
            delete config['rootPath'];
            
        } else {
            this.setRootPath(process.env.pwd);
        }
    }
    
    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path: string) {
        Candy.setPathAlias('@app', path);
    }
    
    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath(): string {
        return Candy.getPathAlias('@app');
    }
    
    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path: string) {
        Candy.setPathAlias('@runtime', path);
    }
    
    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath(): string {
        return Candy.getPathAlias('@runtime');
    }
    
    /**
     * 设置 root 路径
     *
     * @param {String} path 路径
     */
    setRootPath(path: string) {
        Candy.setPathAlias('@root', path);
    }
    
    /**
     * 得到 root 目录
     *
     * @return {String} 路径
     */
    getRootPath(): string {
        return Candy.getPathAlias('@root');
    }
    
    /**
     * handler request
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request: object, response: object) {}
    
    /**
     * 异常处理
     *
     * @param {Object} response 输出类
     * @param {Exception} exception 异常类
     */
    handlerException(response: object, exception: Error) {}
    
}
