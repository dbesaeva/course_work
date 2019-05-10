import TaskManager from './task-manager';
import Task from './task';
import CookieManager from './cookie-manager';
import TaskCollection from './task-collection';

let tasksListDomEl = document.getElementById("app__list");
let allTasksDomEl = document.getElementById("js-all-tasks");
let doneTasksDomEl = document.getElementById("js-done-tasks");

let taskManager = new TaskManager(tasksListDomEl, allTasksDomEl, doneTasksDomEl);

let cookieManager = new CookieManager();

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
    allTasksDomEl.innerHTML = taskCollection.getAllTasksCount();
    doneTasksDomEl.innerHTML = taskCollection.getDoneTasksCount();
}
