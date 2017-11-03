"use strict";
/**
 * @author
 * @license MIT
 */
const fs = require("fs");
const Candy_1 = require("../Candy");
const View_1 = require("../core/View");
/**
 * 视图
 */
class View extends View_1.default {
    /**
     * constructor
     */
    constructor(context) {
        super(context);
    }
    /**
     * @inheritdoc
     */
    getTemplateFilePath(view) {
        let app = Candy_1.default.app;
        let context = this.context;
        let path = '';
        // 模块无子目录 普通控制器有子目录
        if ('' !== context['moduleId']) {
            path = app.modules[context['moduleId']]
                + '/views/'
                + view + View.defaultViewExtension;
        }
        else {
            path = app.getAppPath()
                + '/views/'
                + ('' === context['subRoute'] ? '.' : context['subRoute'])
                + '/'
                + view + View.defaultViewExtension;
        }
        return path;
    }
    /**
     * @inheritdoc
     */
    getTemplate(view, callback) {
        var path = this.getTemplateFilePath(view);
        fs.readFile(path, Candy_1.default.app.encoding, callback);
    }
    /**
     * @inheritdoc
     */
    getTemplateFromPath(path, callback) {
        fs.readFile(path, Candy_1.default.app.encoding, callback);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = View;
//# sourceMappingURL=View.js.map