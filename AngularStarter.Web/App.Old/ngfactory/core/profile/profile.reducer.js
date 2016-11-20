import { ProfileActionTypes } from './profile.actions';
var initialState = {
    role: [""],
    sub: null,
    jti: null,
    at_hash: null,
    useage: null,
    nbf: null,
    exp: null,
    iat: null,
    iss: null,
    unique_name: null,
    email_confirmed: false,
    first_name: null,
    last_name: null
};
export function profileReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ProfileActionTypes.LOAD:
            return action.payload;
        case ProfileActionTypes.DELETE:
            return initialState;
        default:
            return state;
    }
}
;
//# sourceMappingURL=profile.reducer.js.map