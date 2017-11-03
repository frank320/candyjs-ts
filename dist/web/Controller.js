"use strict";
/**
 * @author
 * @license MIT
 */
const Candy_1 = require("../Candy");
const Controller_1 = require("../core/Controller");
/**
 * 控制器
 */
class Controller extends Controller_1.default {
    /**
     * constructor
     */
    constructor(context) {
        super(context);
        this.viewHandler = 'candy/web/View';
        this.view = null;
    }
    /**
     * @inheritdoc
     */
    getView() {
        if (null !== this.view) {
            return this.view;
        }
        this.view = Candy_1.default.createObject(this.viewHandler, this.context);
        return this.view;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;
//# sourceMappingURL=Controller.js.map