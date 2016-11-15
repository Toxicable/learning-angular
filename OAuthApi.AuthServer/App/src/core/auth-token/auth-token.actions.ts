import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';

export const AuthTokenActionTypes = {
    LOAD: type('[AuthToken] Load'),
    DELETE: type('[AuthToken] Delete')
}

export class AuthTokenAction{
    Delete(payload = null){
        return new DeleteAction(payload);
    }
    Load(payload: AuthTokenModel){
        return new LoadAction(payload);
    }
}

class DeleteAction implements Action{
    type = AuthTokenActionTypes.DELETE;
    constructor(public payload = null){}
}

class LoadAction implements Action{
    type = AuthTokenActionTypes.LOAD;
    constructor(public payload: AuthTokenModel){}
}


export type AuthTokenActions = LoadAction | DeleteAction;