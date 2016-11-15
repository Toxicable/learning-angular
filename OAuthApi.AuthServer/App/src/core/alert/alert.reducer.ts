import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../../core/models/alert.model';
import * as alertActions from './alert.actions';

const initalState: Alert[] = []

export const reducer = (state = initalState, action: alertActions.Actions): Alert[] => {
    switch (action.type){
        case alertActions.ActionTypes.ADD:
            return [
                ...state,
                action.payload
            ];

        case alertActions.ActionTypes.DELETE:
            return state.filter( alert =>
                alert.message !== action.payload.message
            );

        default:
            return state;
    }
};