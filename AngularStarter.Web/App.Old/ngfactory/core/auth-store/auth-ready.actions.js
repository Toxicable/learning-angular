import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var AuthReadyActionTypes = {
    READY: type('[AuthReady] True')
};
export var AuthReadyActions = (function () {
    function AuthReadyActions() {
    }
    AuthReadyActions.prototype.Ready = function () {
        return {
            type: AuthReadyActionTypes.READY
        };
    };
    AuthReadyActions.decorators = [
        { type: Injectable },
    ];
    AuthReadyActions.ctorParameters = [];
    return AuthReadyActions;
}());
//# sourceMappingURL=auth-ready.actions.js.map