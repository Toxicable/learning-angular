import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';

export const ActionTypes = {
    LOAD: type('[AuthTokens] Load'),
    DELETE: type('[AuthTokens] Delete')
}

export class DeleteAction implements Action{
    type = ActionTypes.DELETE;
    constructor(){}
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: AuthTokenModel){}
}


export type Actions = LoadAction;