import TaskManager from './task-manager';
import Task from './task';
import CookieManager from './cookie-manager';
import TaskCollection from './task-collection';

let taskDomElements = {
    appList: document.getElementById("app__list"),
    all: document.getElementById("js-all-tasks"),
    done: document.getElementById("js-done-tasks")
};

let cookieManager = new CookieManager();

let taskManager = new TaskManager(taskDomElements, cookieManager);

let tasks = {};

if (cookieManager.hasCookie('tasks')) {
    tasks = JSON.parse(cookieManager.getCookie('tasks'));
} else {
    tasks = {
        current: [
            new Task(taskManager.doId(), "Задача 1", "current"),
            new Task(taskManager.doId(), "Задача 2", "current")
        ],
        done: [
            new Task(taskManager.doId(), "Задача 3", "done")
        ]
    };
}

let taskCollection = new TaskCollection(tasks);

taskManager.setTaskCollection(taskCollection);

let addNewTaskField = document.getElementById("app__task-new");

init();

addNewTaskField.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        taskManager.addTask(this.value);
        this.value = "";
    }
});


function init() {
    for (const item of tasks.current) {
        taskManager.createItem(item);
    }
    for (const item of tasks.done) {
        taskManager.createItem(item);
    }
    taskDomElements.all.innerHTML = taskCollection.getAllTasksCount();
    taskDomElements.done.innerHTML = taskCollection.getDoneTasksCount();
}
