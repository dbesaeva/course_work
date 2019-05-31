import { expect } from 'chai';
import ArrayStorage from '../src/storage/array-storage';
import Task from '../src/task/task';

describe('Test array storage', function() {

    it('Check storage default length', function(done) {
        const storage = createArrayStorage();
        expect(storage.getAll().length).to.equal(3);

        done();
    });

    it('Check value remove', function(done) {
        const storage = createArrayStorage();
        const task = storage.getAll()[0];

        expect(storage.getAll().length).to.equal(3);

        storage.remove(task.id);

        expect(storage.getAll().length).to.equal(2);

        done();
    });

    it('Check add value', function(done) {
        const storage = createArrayStorage();
        expect(storage.getAll().length).to.equal(3);

        storage.create(new Task(ArrayStorage.doId(), 'Новая задача', 'current'));

        expect(storage.getAll().length).to.equal(4);

        done();
    });

    it('Check tasks with "current" state', function(done) {
        const storage = createArrayStorage();
        expect(storage.getAll().length).to.equal(3);

        expect(countTasksWithState(storage, 'current')).to.equal(2);

        done();
    });

    it('Check tasks with "done" state', function(done) {
        const storage = createArrayStorage();
        expect(storage.getAll().length).to.equal(3);

        expect(countTasksWithState(storage, 'done')).to.equal(1);

        done();
    });

    it('Check done function', function(done) {
        const storage = createArrayStorage();
        expect(storage.getAll().length).to.equal(3);

        expect(countTasksWithState(storage, 'done')).to.equal(1);

        const task = storage.getAll()[0];

        storage.done(task.id);

        expect(countTasksWithState(storage, 'done')).to.equal(2);

        expect(countTasksWithState(storage, 'current')).to.equal(1);

        done();
    });

});

function createArrayStorage(): ArrayStorage {
    const storage = new ArrayStorage();
    storage.setTasks([
        new Task(ArrayStorage.doId(), 'Задача 1', 'current'),
        new Task(ArrayStorage.doId(), 'Задача 2', 'current'),
        new Task(ArrayStorage.doId(), 'Задача 3', 'done')
    ]);

    return storage;
}

function countTasksWithState(storage: ArrayStorage, state: string) {
    return storage.getAll().filter(task => task.state === state).length;
}
