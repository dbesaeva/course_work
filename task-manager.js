class TaskManager
{

    constructor(tasksListDomEl, allTasksDomEl, doneTasksDomEl) {
        this.tasksListDomEl = tasksListDomEl;
        this.allTasksDomEl = allTasksDomEl;
        this.doneTasksDomEl = doneTasksDomEl;
        this.tasks = {};
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    createItem(el) {
        let self = this;

        let item = document.createElement('li'),
            remove = document.createElement('div'),
            text = document.createElement('span');
        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function () {
            self.removeTask(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            self.doneTask(this);
        });
        switch (el.taskState) {
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

    doneTask(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('app__list-item--done');

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

    removeTask(el) {
        let removeEl = el.parentNode,
            removeElId = removeEl.id,
            removeElState = removeEl.classList.contains('app__list-item--done');
    
        removeEl.remove();
        const items = removeElState ? this.tasks.done : this.tasks.current;
        for (const [index, item] of items.entries()) {
            if (item.id !== removeElId) continue;
            items.splice(index, 1);
        }
        this.allTasksDomEl.innerHTML = this.tasks.allTasksCount;
        this.doneTasksDomEl.innerHTML = this.tasks.doneTasksCount;
    }

    addTasks(str) {
        let self = this;
        let elem = new Task(self.doId(), str, "current");
        this.tasks.current.push(elem);
        self.createItem(elem);
        this.allTasksDomEl.innerHTML = this.tasks.allTasksCount;
    }

    doId() {
        return Math.random().toString(36).substr(2, 16);
    }
}