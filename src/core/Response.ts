/**
 * @author
 * @license MIT
 */

/**
 * server response
 */
export default class Response {

    public response: object;
    
    /**
     * constructor
     *
     * @param {Object} response
     */
    constructor(response: object) {
        this.response = response;
    }
    
    /**
     * sends data to client and end response
     *
     * @param {String | Buffer} content
     */
    public send(content: string | Buffer) {}
    
}
