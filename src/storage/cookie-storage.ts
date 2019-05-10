import ArrayStorage from './array-storage';
import CookieManager from '../cookie-manager';

let TASKS: any = null;

export default class CookieStorage extends ArrayStorage {
    constructor(private cookieManager: CookieManager) {
        super();
    }

    getAll() {
        if (null === TASKS) {
            TASKS = this.cookieManager.hasCookie('tasks') ? JSON.parse(this.cookieManager.getCookie('tasks')) : [];
            this.tasks = TASKS;
        }

        return this.tasks;
    }

    create(str: any) {
        let task = super.create(str);
        this.updateCookie();

        return task;
    }

    remove(id: any) {
        super.remove(id);
        this.updateCookie();
    }

    done(id: any) {
        super.done(id);
        this.updateCookie();
    }

    updateCookie(): void {
        this.cookieManager.setCookie('tasks', JSON.stringify(this.tasks), {path: '/'});
    }
}