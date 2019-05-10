export default class TaskCollection {
    /**
     * @param {Object} tasks 
     */
    constructor(tasks) {
        this.tasks = tasks;
    }

    /**
     * @return {Object}
     */
    getTasks() {
        return this.tasks;
    }

    /**
     * @return {Number}
     */
    getAllTasksCount() {
        return this.tasks.current.length + this.tasks.done.length;
    }

    /**
     * @return {Number}
     */
    getDoneTasksCount() {
        return this.tasks.done.length;
    }
}