import * as authReadyActions from './auth-ready.actions'

const initalState: boolean = false

export const reducer = (state = initalState, action: authReadyActions.Actions): boolean => {
    switch (action.type){
        case authReadyActions.ActionTypes.READY:
            return true;
            
        default:
            return state;
    }
};
