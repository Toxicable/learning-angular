import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';

export const LoadingBarActionTypes = {
    START: type('[LoadingBar] Start'),
    DONE: type('[LoadingBar] Done')
}

export class LoadingBarAction{
    Start(){
        return new StartAction();
    }
    Done(){
        return new DoneAction();
    }
}

class StartAction implements Action{
    type = LoadingBarActionTypes.DONE;
    constructor(){}
}

class DoneAction implements Action{
    type = LoadingBarActionTypes.START;
    constructor(){}
}


export type LoadingBarActions = StartAction | DoneAction;