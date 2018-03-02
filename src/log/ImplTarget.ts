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
abstract class ImplTarget extends LogEvent implements ITarget {

    /**
     * @property {String} EVENT_FLUSH 事件
     */
    public static EVENT_FLUSH: string = 'flush';

    /**
     * @property {String} fileExtension 文件扩展名
     */
    public fileExtension: string = '.log';

    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {};

}

export default ImplTarget;
