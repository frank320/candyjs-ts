/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 日志接口层
 */
export default interface ITarget {
    
    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    flush(messages: any[]): void;
    
}
