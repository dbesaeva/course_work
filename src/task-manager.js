import Task from './task';
import TaskCollection from './task-collection';
import StorageContract from './storage/storage-contract';

export default class TaskManager {

    /**
     * @param {Object} taskDomElements 
     * @param {StorageContract} storage
     */
    constructor(taskDomElements, storage) {
        this.tasksListDomEl = taskDomElements.appList;
        this.allTasksDomEl = taskDomElements.all;
        this.doneTasksDomEl = taskDomElements.done;
        this.tasks = [];
        this.storage = storage;
    }

    /**
     * @param {TaskCollection} taskCollection
     * @return {void}
     */
    setTaskCollection(taskCollection) {
        this.tasks = taskCollection.getTasks();
        this.taskCollection = taskCollection;
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

        elem.classList.toggle('app__list-item--done');

        this.storage.done(elemId);
        
        this.doneTasksDomEl.innerHTML = this.taskCollection.getDoneTasksCount();
    }

    /**
     * @param {Task} el
     * @return {void} 
     */
    removeTask(el) {
        let removeEl = el.parentNode;
        let removeElId = removeEl.id;
    
        removeEl.remove();

        this.storage.remove(removeElId);

        this.allTasksDomEl.innerHTML = this.taskCollection.getAllTasksCount();
        this.doneTasksDomEl.innerHTML = this.taskCollection.getDoneTasksCount();
    }

    /**
     * @param {String} el
     * @return {void} 
     */
    addTask(str) {
        this.createItem(this.storage.create(str));

        this.allTasksDomEl.innerHTML = this.taskCollection.getAllTasksCount();
    }
}