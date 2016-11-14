import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../../core/models/alert.model';
import * as loadingBarActions from './loading-bar.actions';

const initalState: boolean = false;

export const reducer = (state = initalState, action: loadingBarActions.Actions): boolean => {
    switch (action.type){
        case loadingBarActions.ActionTypes.START:
            return true;

        case loadingBarActions.ActionTypes.DONE:
            return false;

        default:
            return state;
    }
};