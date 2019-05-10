import CookieManager from '../cookie-manager';
import ArrayStorage from './array-storage';
import CookieStorage from './cookie-storage';
import StorageContract from './storage-contract';

export default function getStorage(storageType: string): StorageContract {
    switch (storageType) {
        case 'array':
            return new ArrayStorage();
        case 'cookie':
            return new CookieStorage(new CookieManager());
        default:
            throw new Error('Storage does not support this type.');
    }
};
