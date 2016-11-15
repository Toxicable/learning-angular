import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Alert} from "../models/alert.model";
import {AlertType} from "../models/alert-types";
import {Store} from '@ngrx/store';
import {AppState} from '../../app/app-store';
import * as alertActions from './alert.actions';
import { AlertAtion } from './alert.actions';

@Injectable()
export class AlertService{
    constructor(private store: Store<AppState>){}

    sendSuccess(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.success}, delay)
    }

    sendInfo(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.info}, delay)
    }

    sendWarning(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.warning}, delay)
    }

    sendError(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.error}, delay)
    }

    private sendAlert(alert: Alert, delay:number = 3000){
        this.store.dispatch(new AlertAtion().Add(alert));
        Observable.of(true)
            .delay(delay)
            .subscribe(
                () => this.store.dispatch(new AlertAtion().Delete(alert))
            );
    }
}