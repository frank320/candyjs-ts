/**
 * @author
 * @license MIT
 */

/**
 * 视图
 */
export default class View {

    /**
     * @var {String} 默认视图文件后缀
     */
    public static defaultViewExtension: string = '.html';

     /**
     * @property {Object} context 上下文环境
     */
    public context: object;
    
    /**
     * constructor
     */
    constructor(context: object) {
        this.context = context;
    }
    
    /**
     * 获取视图文件路径
     *
     * @param {String} view 视图文件名
     * @return {String}
     */
    public getTemplateFilePath(view: string) {}
    
    /**
     * 读取视图文件
     *
     * @param {String} view 视图文件名
     * @param {any} callback 回调函数
     * @return {String}
     */
    public getTemplate(view: string, callback: any) {}
    
    /**
     * 从指定路径读取视图文件
     *
     * @param {String} path 文件路径
     * @param {any} callback 回调函数
     * @return {String}
     */
    public getTemplateFromPath(path: string, callback: any) {}
    
}
