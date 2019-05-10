(function () {
    let tasksList = document.getElementById("app__list");
    let allTasks = document.getElementById("js-all-tasks");
    let doneTasks = document.getElementById("js-done-tasks");
    
        let taskManager = new TaskManager(tasksList, allTasks, doneTasks);

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

    function INIT() {
        for (const item of tasks.current) {
            taskManager.createItem(item);
        }
        for (const item of tasks.done) {
            taskManager.createItem(item);
        }
        allTasks.innerHTML = tasks.allTasksCount;
        doneTasks.innerHTML = tasks.doneTasksCount;
    }

    INIT();

    addNewTaskField.addEventListener('keyup', function (e) {
        if(e.keyCode === 13) {
            taskManager.addTasks(this.value);
            this.value = "";
        }
    })

})();