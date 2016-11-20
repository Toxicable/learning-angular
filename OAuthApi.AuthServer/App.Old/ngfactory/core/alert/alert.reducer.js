import { AlertActionTypes } from './alert.actions';
var initalState = [];
export function alertReducer(state, action) {
    if (state === void 0) { state = initalState; }
    switch (action.type) {
        case AlertActionTypes.ADD:
            return state.concat([
                action.payload
            ]);
        case AlertActionTypes.DELETE:
            return state.filter(function (alert) {
                return alert.message !== action.payload.message;
            });
        default:
            return state;
    }
}
;
//# sourceMappingURL=alert.reducer.js.map