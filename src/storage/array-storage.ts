import Task from '../task/task';
import StorageContract from './storage-contract';

export default class ArrayStorage implements StorageContract {
    protected tasks: Array<Task> = [];

    setTasks(tasks: Array<Task>): void {
        this.tasks = tasks;
    }

    getAll(): Array<Task> {
        return this.tasks;
    }

    static doId(): string {
        return Math.random().toString(36).substr(2, 16);
    }

    create(str: any): Task {
        const task = new Task(ArrayStorage.doId(), str, 'current');
        this.tasks.push(task);

        return task;
    }

    remove(id: any): void {
        this.tasks.forEach((item, index) => {
            if (item.id === id) {
                this.tasks.splice(index, 1);
            }
        });
    }

    done(id: any): void {
        this.tasks.forEach(item => {
            if (item.id === id) {
                item.state = item.state === 'current' ? 'done' : 'current';
            }
        });
    }
}
