import TaskManager from './task-manager';
import CookieManager from './cookie-manager';
import TaskCollection from './task-collection';
import getStorageTasks from './storage';

let taskDomElements = {
    appList: document.getElementById('app__list'),
    all: document.getElementById('js-all-tasks'),
    done: document.getElementById('js-done-tasks')
};

let taskManager = new TaskManager(taskDomElements, new CookieManager());

let tasks = getStorageTasks(taskManager, 'cookie');

let taskCollection = new TaskCollection(tasks);

taskManager.setTaskCollection(taskCollection);

let addNewTaskField = document.getElementById('app__task-new');

init();

addNewTaskField.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        taskManager.addTask(this.value);
        this.value = '';
    }
});


function init() {
    let currentTasks = tasks.filter(task => task.state === 'current');
    let doneTasks = tasks.filter(task => task.state === 'done');

    for (const item of currentTasks) {
        taskManager.createItem(item);
    }
    for (const item of doneTasks) {
        taskManager.createItem(item);
    }
    taskDomElements.all.innerHTML = taskCollection.getAllTasksCount();
    taskDomElements.done.innerHTML = taskCollection.getDoneTasksCount();
}
