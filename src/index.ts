import TaskManager from './task/task-manager';
import TaskCollection from './task/task-collection';
import getStorage from './storage/storage';
import TaskDomInterface from './task/task-dom-interface';
import env from './env';

let taskDomElements = {
    appList: document.getElementById('app__list'),
    all: document.getElementById('js-all-tasks'),
    done: document.getElementById('js-done-tasks')
};

let addNewTaskField = document.getElementById('app__task-new');

let storage = getStorage(env.storage);
let tasks = storage.getAll();

let taskManager = new TaskManager(taskDomElements, storage);

let taskCollection = new TaskCollection(tasks);

taskManager.setTaskCollection(taskCollection);

init();

addNewTaskField.addEventListener('keyup', function (e) {
    let self = (this as HTMLInputElement);

    if (e.keyCode === 13) {
        taskManager.addTask(self.value);
        self.value = '';
    }
});


function init(): void {
    let currentTasks = tasks.filter(task => task.state === 'current');
    let doneTasks = tasks.filter(task => task.state === 'done');

    for (const item of currentTasks) {
        taskManager.createItem(item);
    }
    for (const item of doneTasks) {
        taskManager.createItem(item);
    }

    (taskDomElements as TaskDomInterface).all.innerHTML = String(taskCollection.getAllTasksCount());
    (taskDomElements as TaskDomInterface).done.innerHTML = String(taskCollection.getDoneTasksCount());
}
