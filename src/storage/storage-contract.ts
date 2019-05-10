import Task from '../task';

export default interface StorageContract {
    getAll(): Array<Task>;

    create(str: any): Task;

    remove(id: any): void;

    done(id: any): void;
}