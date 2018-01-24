/**
 * @author
 * @license MIT
 */
'use strict';

import * as fs from 'fs';

import Candy from '../../Candy';
import Logger from '../Logger';
import ImplTarget from '../ImplTarget';
import FileHelper from '../../helpers/FileHelper';
import TimeHelper from '../../helpers/TimeHelper';

/**
 * 文件日志
 *
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'class': 'candy/log/file/Target',
 *             'logPath': __dirname + '/logs'
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 *
 */
export default class Target extends ImplTarget {
    
    /**
     * @property {String} logPath 日志路径
     */
    public logPath: string;

    /**
     * @property {String} logFile 日志文件名
     */
    public logFile: string;

    /**
     * constructor
     */
    constructor(config: any) {
        super();
        
        this.logPath = undefined === config.logPath
            ? Candy.getPathAlias('@runtime/logs')
            : config.logPath;
        
        this.logFile = this.generateTimeLogFile();
        
        // 目录不存在就创建
        if(!fs.existsSync(this.logPath)) {
            FileHelper.createDirectorySync(this.logPath);
        }
    }
    
    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {
        let msg = this.formatMessage(messages);
        let file = this.logPath + '/' + this.logFile;
        
        fs.appendFile(file, msg, Candy.app.encoding, (err) => {});
    }
    
    /**
     * 生成日志文件名
     */
    private generateTimeLogFile(): string {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + this.fileExtension;
    }
    
    /**
     * 格式化内容
     */
    private formatMessage(messages: any[]): string {
        let msg = '';
        for(let i=0,len=messages.length; i<len; i++) {
            msg += TimeHelper.format('y-m-d h:i:s', messages[i][2])
                + ' -- '
                + Logger.getLevelName(messages[i][1])
                + ' -- '
                + messages[i][0]
                + '\n';
        }
        
        return msg;
    }
}
