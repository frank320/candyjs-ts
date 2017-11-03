/**
 * @author
 * @license MIT
 */
"use strict";
/**
 * 异常
 */
class Exception extends Error {
    /**
     * constructor
     *
     * @param {String} message 错误信息
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
    /**
     * 获得错误名
     *
     * @return {String}
     */
    getName() {
        return this.name;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Exception;
//# sourceMappingURL=Exception.js.map