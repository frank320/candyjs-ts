/**
 * @author
 * @license MIT
 */

export default class Hook {

    /**
     * @property {Hook} _instance 实例
     */
    public static _instance: Hook = null;

    /**
     * @property {Number} index
     */
    public index: number;

    /**
     * @property {any[]} handlers
     */
    public handlers: any[];

    /**
     * @property {any} callback
     */
    public callback: any;
    
    /**
     * constructor
     */
    private constructor() {
        this.index = 0;
        this.handlers = [];
        this.callback = null;
    }
    
    /**
     * 获取 Hook 实例
     */
    public static getInstance(): Hook {
        if(null === Hook._instance) {
            Hook._instance = new Hook();
        }
        
        return Hook._instance;
    }
    
    /**
     * 注册
     *
     * @param {any} handler
     */
    public addHook(handler: any) {
        this.handlers.push(handler);
    }
    
    /**
     * 获取一个 handler
     */
    public getHook(): any {
        if(this.index === this.handlers.length) {
            this.index = 0;
            
            return null;
        }
        
        let ret: any = this.handlers[this.index];
        this.index++;
        
        return ret;
    }
    
    /**
     * 触发
     * 
     * @param {Object} req
     * @param {Object} res
     * @param {Function} callback
     */
    public trigger(req: object, res: object, callback: any) {
        let first: any = this.getHook();
        
        this.callback = callback;
        
        // 没有插件
        if(null === first || 'function' !== typeof first) {
            callback(req, res, null);
            return;
        }
        
        this.triggerHook(req, res, first);
    }
    
    public triggerHook(req: object, res: object, next: any) {
        next(req, res, () => {
            let nextHandler: any = this.getHook();
            
            if(null !== nextHandler && 'function' === typeof nextHandler) {
                this.triggerHook(req, res, nextHandler);
                return;
            }
            
            this.callback(req, res, null);
        });
    }
    
}
