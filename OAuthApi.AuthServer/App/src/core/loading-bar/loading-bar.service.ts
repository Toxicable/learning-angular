import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import { LoadingBarAction } from './loading-bar.actions';

@Injectable()
export class LoadingBarService{
    constructor(private store: Store<AppState>) {}

    load(){
        this.store.dispatch(new LoadingBarAction().Start())
    }

    done(){
        this.store.dispatch(new LoadingBarAction().Start())
    }
 
    doWithLoader<T>(task: Observable<T>): Observable<T>{
        return Observable
            .of(true)
            .do(() => this.load())
            .flatMap(() => task)
            .finally( () => this.done());
    }
}