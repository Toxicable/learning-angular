
import * as loggedInActions from './logged-in.actions'

const initalState: boolean = false

export const reducer = (state = initalState, action: loggedInActions.Actions): boolean => {
    switch (action.type){
        case loggedInActions.ActionTypes.LOGGED_IN:
            return true;

        case loggedInActions.ActionTypes.NOT_LOGGED_IN:
            return false;

        default:
            return state;
    }
};
