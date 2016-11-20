import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var AlertActionTypes = {
    ADD: type('[Alert] Add'),
    DELETE: type('[Alert] Delete')
};
export var AlertActions = (function () {
    function AlertActions() {
    }
    AlertActions.prototype.Add = function (payload) {
        return {
            type: AlertActionTypes.ADD,
            payload: payload
        };
    };
    AlertActions.prototype.Delete = function (payload) {
        return {
            type: AlertActionTypes.DELETE,
            payload: payload
        };
    };
    AlertActions.decorators = [
        { type: Injectable },
    ];
    AlertActions.ctorParameters = [];
    return AlertActions;
}());
//# sourceMappingURL=alert.actions.js.map