/**
 * @author
 * @license MIT
 */
'use strict';

import Event from '../core/Event';

/**
 * Log event
 */
export default class LogEvent extends Event {

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {Array} param 日志信息
     */
    trigger(eventName: string, param: any[]): void {
        if(undefined !== this.handlers[eventName]) {
            for(let handler of this.handlers[eventName]) {
                handler.flush(param);
            }
        }
    }

}
