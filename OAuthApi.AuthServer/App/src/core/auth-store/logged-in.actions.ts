import { type } from '../../util/action-name-helper';
import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOGGED_IN: type('[LoggedIn] True'),
    NOT_LOGGED_IN: type('[LoggedIn] False')
}

export class LoggedInAction implements Action{
    type = ActionTypes.LOGGED_IN;
    constructor(){}
}

export class NotLoggedInAction implements Action{
    type = ActionTypes.NOT_LOGGED_IN;
    constructor(){}
}

export type Actions = LoggedInAction | NotLoggedInAction
