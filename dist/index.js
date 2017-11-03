"use strict";
/**
 * @author
 * @license MIT
 */
const http = require("http");
const Candy_1 = require("./Candy");
const Hook_1 = require("./core/Hook");
const Application_1 = require("./web/Application");
const InvalidConfigException_1 = require("./core/InvalidConfigException");
/**
 * 入口
 */
class CandyJs {
    /**
     * constructor
     *
     * @param {Object} config 配置信息
     */
    constructor(config) {
        if (undefined === config) {
            throw new InvalidConfigException_1.default('The app config is required');
        }
        this.config = config;
        this.server = null;
        this.app = new Application_1.default(config);
    }
    // web
    requestListenerWeb(req, res) {
        try {
            this.app.requestListener(req, res);
        }
        catch (e) {
            this.app.handlerException(res, e);
        }
    }
    // handler
    handler(req, res) {
        Hook_1.default.getInstance().trigger(req, res, () => {
            this.requestListenerWeb(req, res);
        });
    }
    /**
     * 获取 http server
     *
     * @return http server
     */
    getServer() {
        return http.createServer(this.handler.bind(this));
    }
    /**
     * listen
     *
     * @param {Number} port
     * @param {Function} callback
     *
     * If you want to create HTTPS server you can do so as shown here
     *
     * var https = require('https');
     * var CandyJs = require('candyjs');
     * var app = new CandyJs({ ... });
     * https.createServer({ ... }, app.handler.bind(app)).listen(443);
     *
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }
}
/**
 * handler
 */
CandyJs.Candy = Candy_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CandyJs;
//# sourceMappingURL=index.js.map