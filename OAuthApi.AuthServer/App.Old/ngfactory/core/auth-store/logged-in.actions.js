import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var LoggedInActionTypes = {
    LOGGED_IN: type('[LoggedIn] True'),
    NOT_LOGGED_IN: type('[LoggedIn] False')
};
export var LoggedInActions = (function () {
    function LoggedInActions() {
    }
    LoggedInActions.prototype.LoggedIn = function () {
        return {
            type: LoggedInActionTypes.LOGGED_IN
        };
    };
    LoggedInActions.prototype.NotLoggedIn = function () {
        return {
            type: LoggedInActionTypes.NOT_LOGGED_IN
        };
    };
    LoggedInActions.decorators = [
        { type: Injectable },
    ];
    LoggedInActions.ctorParameters = [];
    return LoggedInActions;
}());
//# sourceMappingURL=logged-in.actions.js.map