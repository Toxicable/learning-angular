import { LoggedInActionTypes, LoggedInActions } from './logged-in.actions';

const initalState: boolean = false

export const loggedInReducer = (state = initalState, action: LoggedInActions): boolean => {
    switch (action.type){
        case LoggedInActionTypes.LOGGED_IN:
            return true;

        case LoggedInActionTypes.NOT_LOGGED_IN:
            return false;

        default:
            return state;
    }
};
