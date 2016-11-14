import {ActionReducer, Action, Store, combineReducers} from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';
import {Injectable} from '@angular/core';
import {AppState} from '../../app/app-store';
import {profileReducer} from './profile.store';
import { AuthTokenModel } from '../models/auth-tokens.model';
import * as authTokenReducer from '../auth-token/auth-token.reducer'

export interface Auth{
    authTokens: AuthTokenModel,
    profile: ProfileModel,
    loggedIn: boolean,
    authReady: boolean
}

@Injectable()
export class AuthActions{
    constructor(private store: Store<AppState>){}

    isLoggedIn(){
          this.store.dispatch({type: "IS_LOGGED_IN"})
    }
    isNotLoggedIn(){
        this.store.dispatch({type: "NOT_LOGGED_IN"})
    }
    authReady(){
        this.store.dispatch({type: "AUTH_READY"})
    }
}

const loggedInReducer: ActionReducer<boolean> = (state = false, action: Action) => {
    switch (action.type){
        case "IS_LOGGED_IN":
            return true;
        case "NOT_LOGGED_IN":
            return false;
        default:
            return state;
    }
};

const authReadyReducer: ActionReducer<boolean> = (state = false, action: Action) => {
    switch (action.type){
        case "AUTH_READY":
            return true;
        default:
            return state;
    }
};


export const authReducer: ActionReducer<Auth> = combineReducers({
    profile: profileReducer,
    tokens: authTokenReducer.reducer,
    loggedIn: loggedInReducer,
    authReady: authReadyReducer
});