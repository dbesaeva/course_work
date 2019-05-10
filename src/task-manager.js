import Task from './task';

export default class TaskManager {

    /**
     * @param {HTMLElement} tasksListDomEl 
     * @param {HTMLElement} allTasksDomEl 
     * @param {HTMLElement} doneTasksDomEl 
     */
    constructor(tasksListDomEl, allTasksDomEl, doneTasksDomEl) {
        this.tasksListDomEl = tasksListDomEl;
        this.allTasksDomEl = allTasksDomEl;
        this.doneTasksDomEl = doneTasksDomEl;
        this.tasks = {};
    }

    /**
     * @param {Object} tasks
     * @return {void}
     */
    setTasks(tasks) {
        this.tasks = tasks;
    }

    /**
     * @param {Task} el
     * @return {void} 
     */
    createItem(el) {
        let self = this;

        let item = document.createElement('li');
        let remove = document.createElement('div');
        let text = document.createElement('span');

        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function () {
            self.removeTask(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            self.doneTask(this);
        });

        switch (el.state) {
            case 'done':
                item.classList.add('app__list-item', 'app__list-item--done');
                break;
            default:
                item.classList.add('app__list-item');
        }

        item.id = el.id;
        text.innerHTML = el.content;
        item.appendChild(text);
        item.appendChild(remove);
        this.tasksListDomEl.appendChild(item);
    }

    /**
     * @param {Task} el
     * @return {void} 
     */
    doneTask(el) {
        let elem = el.parentNode;
        let elemId = elem.id;
        let elemState = elem.classList.contains('app__list-item--done');

        const [itemsRemove, itemsAdd] = elemState ? [this.tasks.done, this.tasks.current]
            : [this.tasks.current, this.tasks.done];

        elem.classList.toggle('app__list-item--done');

        for (const [index, item] of itemsRemove.entries()) {
            if (item.id !== elemId) continue;
            itemsAdd.push(item);
            itemsRemove.splice(index, 1);
        }
        
        this.doneTasksDomEl.innerHTML = this.tasks.doneTasksCount;
    }

    /**
     * @param {Task} el
     * @return {void} 
     */
    removeTask(el) {
        let removeEl = el.parentNode;
        let removeElId = removeEl.id;
        let removeElState = removeEl.classList.contains('app__list-item--done');
    
        removeEl.remove();
        const items = removeElState ? this.tasks.done : this.tasks.current;

        for (const [index, item] of items.entries()) {
            if (item.id !== removeElId) continue;
            items.splice(index, 1);
        }

        this.allTasksDomEl.innerHTML = this.tasks.allTasksCount;
        this.doneTasksDomEl.innerHTML = this.tasks.doneTasksCount;
    }

    /**
     * @param {String} el
     * @return {void} 
     */
    addTask(str) {
        let self = this;

        let elem = new Task(self.doId(), str, "current");
        this.tasks.current.push(elem);
        self.createItem(elem);

        this.allTasksDomEl.innerHTML = this.tasks.allTasksCount;
    }

    /**
     * @return {String}
     */
    doId() {
        return Math.random().toString(36).substr(2, 16);
    }
}