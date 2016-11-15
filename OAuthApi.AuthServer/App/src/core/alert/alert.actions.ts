import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';

export const ActionTypes = {
    ADD: type('[Alert] Add'),
    DELETE: type('[Alert] Delete')
}

export class DeleteAction implements Action{
    type = ActionTypes.DELETE;
    constructor(public payload: Alert){}
}

export class AddAction implements Action{
    type = ActionTypes.ADD;
    constructor(public payload: Alert){}
}


export type Actions = AddAction | DeleteAction;