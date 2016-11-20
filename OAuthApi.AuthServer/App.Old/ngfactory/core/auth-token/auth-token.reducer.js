import { AuthTokenActionTypes } from './auth-token.actions';
var initalState = {
    id_token: null,
    access_token: null,
    refresh_token: null,
    expires_in: 0,
    token_type: null
};
export function authTokenReducer(state, action) {
    if (state === void 0) { state = initalState; }
    switch (action.type) {
        case AuthTokenActionTypes.LOAD:
            return action.payload;
        case AuthTokenActionTypes.DELETE:
            return initalState;
        default:
            return state;
    }
}
;
//# sourceMappingURL=auth-token.reducer.js.map