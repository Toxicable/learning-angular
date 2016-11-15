import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';

export const AlertActionTypes = {
    ADD: type('[Alert] Add'),
    DELETE: type('[Alert] Delete')
}

export class AlertAtion{
    Add(payload: Alert){
        return new AddAction(payload);
    }
    Delete(payload: Alert){
        return new DeleteAction(payload);
    }
}

class DeleteAction implements Action{
    type = AlertActionTypes.DELETE;
    constructor(public payload: Alert){}
}

class AddAction implements Action{
    type = AlertActionTypes.ADD;
    constructor(public payload: Alert){}
}


export type AlertActions = AddAction | DeleteAction;