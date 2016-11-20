import { LoadingBarActionTypes } from './loading-bar.actions';
var initalState = false;
export function loadingBarReducer(state, action) {
    if (state === void 0) { state = initalState; }
    switch (action.type) {
        case LoadingBarActionTypes.START:
            return true;
        case LoadingBarActionTypes.DONE:
            return false;
        default:
            return state;
    }
}
;
//# sourceMappingURL=loading-bar.reducer.js.map