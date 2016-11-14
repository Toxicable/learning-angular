import {ActionReducer, Action, Store} from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';
import {Injectable} from '@angular/core';
import {AppState} from '../../app/app-store';
import * as profileActions from './profile.actions';

const initialState: ProfileModel = {
    role: [""],
    sub: null,
    jti: null,
    at_hash: null,
    useage: null,
    nbf: null,
    exp: null,
    iat: null,
    iss: null,
    unique_name: null,
    email_confirmed: false,
    first_name: null,
    last_name: null
}
 
export const reducer = (state = initialState, action: profileActions.Actions): ProfileModel => {
    switch (action.type){
        case profileActions.ActionTypes.LOAD:
            return action.payload

        case profileActions.ActionTypes.DELETE:
            return initialState

        default:
            return state;
    }
};