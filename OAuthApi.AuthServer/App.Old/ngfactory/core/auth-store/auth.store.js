import { combineReducers } from '@ngrx/store';
import { profileReducer } from '../profile/profile.reducer';
import { authTokenReducer } from '../auth-token/auth-token.reducer';
import { authReadyReducer } from './auth-ready.reducer';
import { loggedInReducer } from './logged-in.reducer';
var reducers = combineReducers({
    profile: profileReducer,
    authTokens: authTokenReducer,
    loggedIn: loggedInReducer,
    authReady: authReadyReducer
});
export function authReducer(state, action) {
    return reducers(state, action);
}
//# sourceMappingURL=auth.store.js.map