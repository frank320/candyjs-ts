/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 异常错误处理基类
 */
export default class ExceptionHandler {
    
    /**
     * 异常处理
     *
     * @param {object} response 输出类
     * @param {Error} exception 异常类
     */
    handlerException(response: any, exception: Error) {}
    
}
