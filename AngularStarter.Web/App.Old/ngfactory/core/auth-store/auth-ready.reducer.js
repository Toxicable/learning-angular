import { AuthReadyActionTypes } from './auth-ready.actions';
var initalState = false;
export function authReadyReducer(state, action) {
    if (state === void 0) { state = initalState; }
    switch (action.type) {
        case AuthReadyActionTypes.READY:
            return true;
        default:
            return state;
    }
}
;
//# sourceMappingURL=auth-ready.reducer.js.map