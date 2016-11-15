import { type } from '../../util/action-name-helper';
import { Action } from '@ngrx/store';

export const LoggedInActionTypes = {
    LOGGED_IN: type('[LoggedIn] True'),
    NOT_LOGGED_IN: type('[LoggedIn] False')
}

export class LoggedInAction{
    LoggedIn(){
        return new IsLoggedInAction();
    }
    NotLoggedIn(){
        return new NotLoggedInAction();
    }
}

class IsLoggedInAction implements Action{
    type = LoggedInActionTypes.LOGGED_IN;
    constructor(){}
}

class NotLoggedInAction implements Action{
    type = LoggedInActionTypes.NOT_LOGGED_IN;
    constructor(){}
}

export type LoggedInActions = IsLoggedInAction | NotLoggedInAction
