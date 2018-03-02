/**
 * @author
 * @license MIT
 */
import Candy from '../Candy';
import InvalidConfigException from '../core/InvalidConfigException';

class Cache {

    /**
     * @var {Map<String, Object>} _caches
     */
    public static _caches: any = {};

    /**
     * 获取 cache 实例
     *
     * @param {String} cacheFlag
     */
    public static getCache(cacheFlag: string) {
        if(undefined === cacheFlag) {
            throw new InvalidConfigException('Invalid param: cacheFlag');
        }
        if(undefined === Candy.app['cache'] || undefined === Candy.app['cache'][cacheFlag]) {
            throw new InvalidConfigException('No cache config found');
        }
        if(undefined === Candy.app['cache'][cacheFlag]['class']) {
            throw new InvalidConfigException('The cache config lost key: class');
        }

        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Candy.createObject(Candy.app['cache'][cacheFlag]['class'],
                Candy.app['cache'][cacheFlag]);

            Cache._caches[cacheFlag].init();
        }

        return Cache._caches[cacheFlag];
    }

}

module.exports = Cache;
