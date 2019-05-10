import ArrayStorage from './array-storage';

let TASKS = null;

export default class CookieStorage extends ArrayStorage {
    constructor(cookieManager) {
        super();
        this.cookieManager = cookieManager;
    }

    getAll() {
        if (null === TASKS) {
            TASKS = this.cookieManager.hasCookie('tasks') ? JSON.parse(this.cookieManager.getCookie('tasks')) : [];
            this.tasks = TASKS;
        }

        return this.tasks;
    }

    create(str) {
        let task = super.create(str);
        this.updateCookie();

        return task;
    }

    remove(id) {
        super.remove(id);
        this.updateCookie();
    }

    done(id) {
        super.done(id);
        this.updateCookie();
    }

    updateCookie() {
        this.cookieManager.setCookie('tasks', JSON.stringify(this.tasks), {expires: 60 * 60, path: '/'});
    }
}