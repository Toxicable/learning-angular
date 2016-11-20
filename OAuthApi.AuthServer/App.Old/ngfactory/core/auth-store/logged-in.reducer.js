import { LoggedInActionTypes } from './logged-in.actions';
var initalState = false;
export var loggedInReducer = function (state, action) {
    if (state === void 0) { state = initalState; }
    switch (action.type) {
        case LoggedInActionTypes.LOGGED_IN:
            return true;
        case LoggedInActionTypes.NOT_LOGGED_IN:
            return false;
        default:
            return state;
    }
};
//# sourceMappingURL=logged-in.reducer.js.map