import { ActionReducer, Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { AuthTokenModel } from '../models/auth-tokens.model';
import * as authTokenActions from './auth-token.actions'

const initalState: AuthTokenModel ={
    id_token: "",
    access_token: "",
    refresh_token: "",
    expires_in: 0,
    token_type: ""
}

export const reducer = (state = initalState, action: authTokenActions.Actions): AuthTokenModel => {
    switch (action.type){
        case authTokenActions.ActionTypes.LOAD:
            return action.payload;

        case authTokenActions.ActionTypes.DELETE:
            return initalState;

        default:
            return state;
    }
};