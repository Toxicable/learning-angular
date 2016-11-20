import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '../storage';
export var ProfileService = (function () {
    function ProfileService(storage, store) {
        this.storage = storage;
        this.store = store;
    }
    ProfileService.prototype.isEmailConfirmed = function () {
        return this.store.select(function (state) { return state.auth.profile.email_confirmed; })
            .map(function (emailConfirmed) { return emailConfirmed.toString() == "True"; });
    };
    ProfileService.prototype.isInRole = function (pageRole) {
        return this.store.map(function (state) { return state.auth.profile.role; })
            .map(function (role) {
            return role.indexOf(pageRole, 0) > -1;
        });
    };
    ProfileService.decorators = [
        { type: Injectable },
    ];
    ProfileService.ctorParameters = [
        { type: Storage, },
        { type: Store, },
    ];
    return ProfileService;
}());
//# sourceMappingURL=profile.service.js.map