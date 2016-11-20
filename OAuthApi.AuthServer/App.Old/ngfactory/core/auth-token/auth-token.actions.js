import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var AuthTokenActionTypes = {
    LOAD: type('[AuthToken] Load'),
    DELETE: type('[AuthToken] Delete')
};
export var AuthTokenActions = (function () {
    function AuthTokenActions() {
    }
    AuthTokenActions.prototype.Delete = function () {
        return {
            type: AuthTokenActionTypes.LOAD
        };
    };
    AuthTokenActions.prototype.Load = function (payload) {
        return {
            type: AuthTokenActionTypes.LOAD,
            payload: payload
        };
    };
    AuthTokenActions.decorators = [
        { type: Injectable },
    ];
    AuthTokenActions.ctorParameters = [];
    return AuthTokenActions;
}());
//# sourceMappingURL=auth-token.actions.js.map