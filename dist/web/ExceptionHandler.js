"use strict";
const Candy_1 = require("../Candy");
const ExceptionHandler_1 = require("../core/ExceptionHandler");
/**
 * web 异常错误处理
 */
class ExceptionHandler extends ExceptionHandler_1.default {
    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);
        response.end(true === Candy_1.default.app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExceptionHandler;
//# sourceMappingURL=ExceptionHandler.js.map