import Task from '../task';
import StorageContract from './storage-contract';

let TASKS = null;

export default class ArrayStorage extends StorageContract {
    constructor() {
        super();
        this.tasks = [];
    }

    getAll() {
        if (null === TASKS) {
            TASKS = [
                new Task(this.doId(), 'Задача 1', 'current'),
                new Task(this.doId(), 'Задача 2', 'current'),
                new Task(this.doId(), 'Задача 3', 'done')
            ];

            this.tasks = TASKS;
        }

        return this.tasks;
    }

    /**
     * @return {String}
     */
    doId() {
        return Math.random().toString(36).substr(2, 16);
    }

    create(str) {
        const task = new Task(this.doId(), str, 'current');
        this.tasks.push(task);

        return task;
    }

    remove(id) {
        for (const [index, item] of this.tasks.entries()) {
            if (item.id !== id) {
                continue;
            }

            this.tasks.splice(index, 1);
        }
    }

    done(id) {
        for (const [index, item] of this.tasks.entries()) {
            if (item.id !== id) {
                continue;
            }

            item.state = item.state === 'current' ? 'done' : 'current';
        }
    }
}

ArrayStorage.TASKS = [];