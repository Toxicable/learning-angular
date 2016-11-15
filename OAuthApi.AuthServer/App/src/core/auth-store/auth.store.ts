import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { ProfileModel } from '../models/profile-model';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { AuthTokenModel } from '../models/auth-tokens.model';
import * as authTokenReducer from '../auth-token/auth-token.reducer'
import * as profileReducer from '../profile/profile.reducer'
import * as loggedInReducer from './logged-in.reducer'
import * as authReadyReducer from './auth-ready.reducer'

export interface AuthState{
    authTokens: AuthTokenModel,
    profile: ProfileModel,
    loggedIn: boolean,
    authReady: boolean
}


export const authReducer: ActionReducer<AuthState> = combineReducers({
    profile: profileReducer.reducer,
    authTokens: authTokenReducer.reducer,
    loggedIn: loggedInReducer.reducer,
    authReady: authReadyReducer.reducer
});