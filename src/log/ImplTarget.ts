/**
 * @author
 * @license MIT
 */
'use strict';

import ITarget from './ITarget';
import LogEvent from './LogEvent';

/**
 * 日志抽象层
 */
export default abstract class ImplTarget extends LogEvent implements ITarget {
    
    /**
     * @property {String} fileExtension 文件扩展名
     */
    public fileExtension: string = '.log';
    
    /**
     * @property {String} EVENT_FLUSH 事件
     */
    public EVENT_FLUSH: string = 'flush';
    
    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {}
    
}
