import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';
export var ProfileActionTypes = {
    LOAD: type('[Profile] Load'),
    DELETE: type('[Profile] Delete')
};
export var ProfileActions = (function () {
    function ProfileActions() {
    }
    ProfileActions.prototype.Load = function (payload) {
        return {
            type: ProfileActionTypes.LOAD,
            payload: payload
        };
    };
    ProfileActions.prototype.Delete = function () {
        return {
            type: ProfileActionTypes.DELETE
        };
    };
    ProfileActions.decorators = [
        { type: Injectable },
    ];
    ProfileActions.ctorParameters = [];
    return ProfileActions;
}());
//# sourceMappingURL=profile.actions.js.map