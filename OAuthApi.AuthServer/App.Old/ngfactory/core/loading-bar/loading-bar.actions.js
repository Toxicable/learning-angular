import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var LoadingBarActionTypes = {
    START: type('[LoadingBar] Start'),
    DONE: type('[LoadingBar] Done')
};
export var LoadingBarActions = (function () {
    function LoadingBarActions() {
    }
    LoadingBarActions.prototype.Start = function () {
        return {
            type: LoadingBarActionTypes.START
        };
    };
    LoadingBarActions.prototype.Done = function () {
        return {
            type: LoadingBarActionTypes.DONE
        };
    };
    LoadingBarActions.decorators = [
        { type: Injectable },
    ];
    LoadingBarActions.ctorParameters = [];
    return LoadingBarActions;
}());
//# sourceMappingURL=loading-bar.actions.js.map