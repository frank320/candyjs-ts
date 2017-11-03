/**
 * @author
 * @license MIT
 */
"use strict";
/**
 * server request
 */
class Request {
    /**
     * constructor
     *
     * @param {http.ServerRequest} request
     */
    constructor(request) {
        this.request = request;
        this._scriptFile = '';
    }
    /**
     * 返回入口文件名
     *
     * @return {String}
     */
    getScriptFile() {
        if (null === this._scriptFile) {
            this._scriptFile = process.mainModule.filename;
        }
        return this._scriptFile;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Request;
//# sourceMappingURL=Request.js.map