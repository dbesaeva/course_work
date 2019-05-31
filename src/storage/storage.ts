import CookieManager from '../cookie-manager';
import ArrayStorage from './array-storage';
import CookieStorage from './cookie-storage';
import StorageContract from './storage-contract';
import Task from '../task/task';

export default function getStorage(storageConfig: any): StorageContract {
    switch (storageConfig.type) {
        case 'array':
            const storage = new ArrayStorage();
            storage.setTasks(getTasksList());
            return storage;
        case 'cookie':
            return new CookieStorage(new CookieManager(storageConfig.expires));
        default:
            throw new Error('Storage does not support this type.');
    }
};

function getTasksList(): Array<Task> {
    return [
        new Task(ArrayStorage.doId(), 'Задача 1', 'current'),
        new Task(ArrayStorage.doId(), 'Задача 2', 'current'),
        new Task(ArrayStorage.doId(), 'Задача 3', 'done')
    ];
}
