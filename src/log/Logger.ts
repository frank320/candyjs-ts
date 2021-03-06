/**
 * @author
 * @license MIT
 */
import Candy from '../Candy';
import InvalidConfigException from '../core/InvalidConfigException';
import ImplTarget from './ImplTarget';

/**
 * 日志
 */
export default class Logger {

    /**
     * Logger instance
     */
    public static _logger = null;

    /**
     * Error message level
     */
    public static LEVEL_ERROR = 1;

    /**
     * Warning message level
     */
    public static LEVEL_WARNING = 2;

    /**
     * Informational message level
     */
    public static LEVEL_INFO = 4;

    /**
     * Tracing message level
     */
    public static LEVEL_TRACE = 8;

    /**
     * @property {Array} messages logged messages
     *
     * Each log message is of the following structure:
     * [
     *   [0] => string:message
     *   [1] => number:level
     *   [2] => number:timestamp
     * ]
     */
    public messages: any[];

    /**
     * @property {Number} flushInterval how many messages should be logged before they are flushed from memory
     */
    public flushInterval: number;

    /**
     * @property {Array} targets the targets class
     */
    public targets: ImplTarget[];

    /**
     * constructor
     */
    constructor(settings) {
        this.messages = [];

        this.flushInterval = 10;

        this.targets = [];

        if(undefined === settings || undefined === settings.targets) {
            throw new InvalidConfigException('No log targets found');
        }
        if(undefined !== settings.flushInterval) {
            this.flushInterval = settings.flushInterval;
        }
        for(let target in settings.targets) {
            if(undefined !== settings.targets[target]['class']) {
                let clazz = Candy.createObject(settings.targets[target]['class'],
                    settings.targets[target]);
                clazz.on(ImplTarget.EVENT_FLUSH, clazz);

                this.targets.push(clazz);
            }
        }
    }

    /**
     * 获取日志类实例
     *
     * @return {Logger} 实例
     */
    public static getLogger(): Logger {
        if(null === Logger._logger) {
            Logger._logger = new Logger(Candy.app['log']);
        }

        return Logger._logger;
    }

    /**
     * 创建新日志对象
     *
     * @param {any} settings
     * @return {Logger} 实例
     */
    public static newInstance(settings): Logger {
        return new Logger(settings);
    }

    /**
     * 记录日志
     *
     * @param {String} message 消息
     * @param {Number} level 日志级别
     */
    public log(message: string, level: number): void {
        this.messages.push([message, level, Date.now()]);

        if(this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush();
        }
    }

    /**
     * 清空 log 并写入目的地
     */
    public flush(): void {
        let messages = this.messages;
        this.messages = [];

        for(let target of this.targets) {
            target.trigger(ImplTarget.EVENT_FLUSH, messages);
        }
    }

    /**
     * Logs a error message
     *
     * @param {String} message the message to be logged
     */
    public error(message: string): void {
        this.log(message, Logger.LEVEL_ERROR);
    }

    /**
     * Logs a warning message
     *
     * @param {String} message the message to be logged
     */
    public warning(message: string): void {
        this.log(message, Logger.LEVEL_WARNING);
    }

    /**
     * Logs a info message
     *
     * @param {String} message the message to be logged
     */
    public info(message: string): void {
        this.log(message, Logger.LEVEL_INFO);
    }

    /**
     * Logs a trace message
     *
     * @param {String} message the message to be logged
     */
    public trace(message: string): void {
        this.log(message, Logger.LEVEL_TRACE);
    }

    /**
     * 获取日志级别描述
     *
     * @param {Number} level 级别
     * @return {String}
     */
    public static getLevelName(level: number): string {
        let name = 'unknown';
        switch(level) {
            case Logger.LEVEL_ERROR :
                name = 'error';
                break;
            case Logger.LEVEL_WARNING :
                name = 'warning';
                break;
            case Logger.LEVEL_INFO :
                name = 'info';
                break;
            case Logger.LEVEL_TRACE :
                name = 'trace';
                break;
            default :
                break;
        }

        return name;
    }

}
