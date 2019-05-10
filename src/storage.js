import CookieManager from './cookie-manager';
import ArrayStorage from './storage/array-storage';
import CookieStorage from './storage/cookie-storage';
import StorageContract from './storage/storage-contract';

/**
 * @param {String} storageType
 * @return {StorageContract} 
 */
export default function getStorage(storageType) {
    switch (storageType) {
        case 'array':
            return new ArrayStorage();
        case 'cookie':
            return new CookieStorage(new CookieManager());
        default:
            throw new Error('Storage does not support this type.');
    }
};