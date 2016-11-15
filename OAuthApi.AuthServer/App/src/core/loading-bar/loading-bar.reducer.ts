import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../../core/models/alert.model';
import * as loadingBarActions from './loading-bar.actions';
import { LoadingBarActionTypes, LoadingBarActions } from './loading-bar.actions';

const initalState: boolean = false;

export const loadingBarReducer = (state = initalState, action: LoadingBarActions): boolean => {
    switch (action.type){
        case LoadingBarActionTypes.START:
            return true;

        case LoadingBarActionTypes.DONE:
            return false;

        default:
            return state;
    }
};