export function usersReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "GET_USERS":
            return action.payload;
        default:
            return state;
    }
}
//# sourceMappingURL=user-reducer.js.map