"use strict";
const Candy_1 = require("../Candy");
const Application_1 = require("../core/Application");
const Controller_1 = require("../core/Controller");
var Request = require('./Request');
var InvalidRouteException = require('../core/InvalidRouteException');
/**
 * web 应用
 */
class Application extends Application_1.default {
    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);
        this.defaultExceptionHandler = 'candy/web/ExceptionHandler';
    }
    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        let route = Request.parseUrl(request).pathname;
        let controller = this.createController(route);
        if (null === controller) {
            throw new InvalidRouteException('The route requested is invalid');
        }
        // 是否继承自框架控制器
        if (!(controller instanceof Controller_1.default)) {
            controller['run'](request, response);
            return;
        }
        controller.runControllerAction(request, response);
    }
    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        var handler = Candy_1.default.createObject('' === this.exceptionHandler
            ? this.defaultExceptionHandler
            : this.exceptionHandler);
        handler.handlerException(response, exception);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
//# sourceMappingURL=Application.js.map