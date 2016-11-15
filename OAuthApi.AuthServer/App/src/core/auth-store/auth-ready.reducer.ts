import { AuthReadyActions, AuthReadyActionTypes } from './auth-ready.actions';

const initalState: boolean = false

export const authReadyReducer = (state = initalState, action: AuthReadyActions): boolean => {
    switch (action.type){
        case AuthReadyActionTypes.READY:
            return true;
            
        default:
            return state;
    }
};
