import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';
import { ProfileModel } from '../models/profile-model';

export const ProfileActionTypes = {
    LOAD: type('[Profile] Load'),
    DELETE: type('[Profile] Delete')
}

export class ProfileAction{
    Load(payload: ProfileModel){
        return new LoadAction(payload);
    }
    Delete(payload = null){
        return new DeleteAction(payload);
    }
}

class LoadAction implements Action{
    type = ProfileActionTypes.LOAD;
    constructor(public payload: ProfileModel){}
}

class DeleteAction implements Action{
    type = ProfileActionTypes.DELETE;
    constructor(public payload = null){}
}


export type ProfileActions = LoadAction | DeleteAction;