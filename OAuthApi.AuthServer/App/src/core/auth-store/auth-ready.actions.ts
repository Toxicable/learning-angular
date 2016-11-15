import { type } from '../../util/action-name-helper';
import { Action } from '@ngrx/store';

export const AuthReadyActionTypes = {
    READY: type('[AuthReady] True')
}

export class AuthReadyAction{
    Ready(){
        return new AuthIsReadyAction();
    }
}

class AuthIsReadyAction implements Action{
    type = AuthReadyActionTypes.READY;
    constructor(){}
}

export type AuthReadyActions = AuthIsReadyAction;