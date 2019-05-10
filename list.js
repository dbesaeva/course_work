(function () {
    let tasksList = document.getElementById("app__list");
    let allTasks = document.getElementById("js-all-tasks");
    let doneTasks = document.getElementById("js-done-tasks");
    
        let taskManager = new TaskManager(tasksList, allTasks, doneTasks);

    let tasks = {
            current: [{
                taskId: taskManager.doId(),
                taskContent: "Задача 1",
                taskState: "current"
            }, {
                taskId: taskManager.doId(),
                taskContent: "Задача 2",
                taskState: "current"
            }],
            done: [{
                taskId: taskManager.doId(),
                taskContent: "Задача 3",
                taskState: "done"
            }],
            get allTasks() {
                return this.current.length + this.done.length;
            },
            get doneTasks() {
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
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    INIT();

    addNewTaskField.addEventListener('keyup', function (e) {
        if(e.keyCode === 13) {
            taskManager.addTasks(this.value);
            this.value = "";
        }
    })

})();