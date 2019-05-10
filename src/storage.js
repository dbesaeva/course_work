import CookieManager from './cookie-manager';
import Task from './task';

export default function getStorageTasks(taskManager, storageType) {
    switch (storageType) {
        case 'array':
            return [
                new Task(taskManager.doId(), 'Задача 1', 'current'),
                new Task(taskManager.doId(), 'Задача 2', 'current'),
                new Task(taskManager.doId(), 'Задача 3', 'done')
            ];
        case 'cookie':
            const cookieManager = new CookieManager();
            return cookieManager.hasCookie('tasks') ? JSON.parse(cookieManager.getCookie('tasks')) : [];
        default:
            throw new Error('Storage does not support this type.');
    }
};