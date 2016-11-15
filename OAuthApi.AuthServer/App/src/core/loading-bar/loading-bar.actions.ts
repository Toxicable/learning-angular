import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';

export const ActionTypes = {
    START: type('[LoadingBar] Start'),
    DONE: type('[LoadingBar] Done')
}

export class StartAction implements Action{
    type = ActionTypes.DONE;
    constructor(){}
}

export class DoneAction implements Action{
    type = ActionTypes.START;
    constructor(){}
}


export type Actions = StartAction | DoneAction;