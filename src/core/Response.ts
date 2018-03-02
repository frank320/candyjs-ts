/**
 * @author
 * @license MIT
 */
import * as http from 'http';

/**
 * server response
 */
export default class Response {

    public response: http.ServerResponse;

    /**
     * constructor
     *
     * @param {Object} response
     */
    constructor(response: http.ServerResponse) {
        this.response = response;
    }

    /**
     * sends data to client and end response
     *
     * @param {String | Buffer} content
     */
    public send(content: string | Buffer): void {}

}
