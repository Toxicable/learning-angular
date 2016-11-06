/**
 * Created by Fabian on 26/10/2016.
 */
import {Observable} from "rxjs";

export class Storage {
    constructor(private storageBackend:StorageBackend){}

    setItem(key, value){
        return this.storageBackend.setItem(key, value);
    }
    getItem(key){
        return this.storageBackend.getItem(key);
    }
    removeItem(key){
        return this.storageBackend.removeItem(key);
    }
}

export class LocalStorageBackend implements StorageBackend {
    setItem(key, value) {
        return Observable.of( localStorage.setItem(key, value))
    }
    getItem(key){
        return Observable.of( localStorage.getItem(key))
    }
    removeItem(key){
        return Observable.of( localStorage.removeItem(key))
    }
}
export abstract class StorageBackend {
    abstract setItem(key: string, value: string): Observable<any>
    abstract getItem(key: string): Observable<any>
    abstract removeItem(key: string): Observable<any>
}