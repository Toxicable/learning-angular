import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';
import { ProfileModel } from '../models/profile-model';

export const ActionTypes = {
    LOAD: type('[Profile] Load'),
    DELETE: type('[Profile] Delete')
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: ProfileModel){}
}

export class DeleteAction implements Action{
    type = ActionTypes.DELETE;
    constructor(public payload = null){}
}


export type Actions = LoadAction | DeleteAction;