import { type } from '../../util/action-name-helper';
import { Action } from '@ngrx/store';

export const ActionTypes = {
    READY: type('[AuthReady] True')
}

export class AuthReadyAction implements Action{
    type = ActionTypes.READY;
    constructor(){}
}

export type Actions = AuthReadyAction;