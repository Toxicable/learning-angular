import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {AppState} from '../../app/app-store';
import {Store} from '@ngrx/store';
import * as loadingBarActions from './loading-bar.actions'

@Injectable()
export class LoadingBarService{
    constructor(private store: Store<AppState>) {}

    load(){
        this.store.dispatch(new loadingBarActions.StartAction)
    }

    done(){
        this.store.dispatch(new loadingBarActions.DoneAction)
    }
 
    doWithLoader<T>(task: Observable<T>): Observable<T>{
        return Observable
            .of(true)
            .do(() => this.load())
            .flatMap(() => task)
            .finally( () => this.done());
    }
}