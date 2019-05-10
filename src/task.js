export default class Task {
    /**
     * @param {String} id 
     * @param {String} content 
     * @param {String} state 
     */
    constructor(id, content, state) {
        this.id = id;
        this.content = content;
        this.state = state;
    }
}

