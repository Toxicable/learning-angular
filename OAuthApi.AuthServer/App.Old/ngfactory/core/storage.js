import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
export var StorageBackend = (function () {
    function StorageBackend() {
    }
    return StorageBackend;
}());
export var Storage = (function () {
    function Storage(storageBackend) {
        this.storageBackend = storageBackend;
    }
    Storage.prototype.setItem = function (key, value) {
        return this.storageBackend.setItem(key, JSON.stringify(value));
    };
    Storage.prototype.getItem = function (key) {
        return this.storageBackend.getItem(key)
            .map(function (item) { return JSON.parse(item); });
    };
    Storage.prototype.removeItem = function (key) {
        return this.storageBackend.removeItem(key);
    };
    Storage.decorators = [
        { type: Injectable },
    ];
    Storage.ctorParameters = [
        { type: StorageBackend, },
    ];
    return Storage;
}());
export var LocalStorageBackend = (function () {
    function LocalStorageBackend() {
    }
    LocalStorageBackend.prototype.setItem = function (key, value) {
        return Observable.of(localStorage.setItem(key, value));
    };
    LocalStorageBackend.prototype.getItem = function (key) {
        return Observable.of(localStorage.getItem(key));
    };
    LocalStorageBackend.prototype.removeItem = function (key) {
        return Observable.of(localStorage.removeItem(key));
    };
    LocalStorageBackend.decorators = [
        { type: Injectable },
    ];
    LocalStorageBackend.ctorParameters = [];
    return LocalStorageBackend;
}());
//# sourceMappingURL=storage.js.map