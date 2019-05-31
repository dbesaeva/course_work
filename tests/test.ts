import { expect } from 'chai';
import ArrayStorage from '../src/storage/array-storage';

describe('Test array storage', function() {
    const storage = new ArrayStorage();

    it('Check storage default length', function(done) {
        expect(storage.getAll().length).to.equal(3);
        done();
    });

    it('Check value remove', function(done) {
        const task = storage.getAll()[0];

        expect(storage.getAll().length).to.equal(3);

        storage.remove(task.id);

        expect(storage.getAll().length).to.equal(2);
        done();
    });

});



        
