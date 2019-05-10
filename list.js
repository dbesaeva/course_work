(function () {
    let tasksListDomEl = document.getElementById("app__list");
    let allTasksDomEl = document.getElementById("js-all-tasks");
    let doneTasksDomEl = document.getElementById("js-done-tasks");
    
    let taskManager = new TaskManager(tasksListDomEl, allTasksDomEl, doneTasksDomEl);

    let tasks = {
        current: [
            new Task(taskManager.doId(), "Задача 1", "current"),
            new Task(taskManager.doId(), "Задача 2", "current")
        ],
        done: [
            new Task(taskManager.doId(), "Задача 3", "done")
        ],
        get allTasksCount() {
            return this.current.length + this.done.length;
        },
        get doneTasksCount() {
            return this.done.length;
        }
    };
        
    taskManager.setTasks(tasks);

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
        allTasksDomEl.innerHTML = tasks.allTasksCount;
        doneTasksDomEl.innerHTML = tasks.doneTasksCount;
    }

})();