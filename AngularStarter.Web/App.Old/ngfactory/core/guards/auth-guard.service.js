import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from "../alert/alert.service";
import { ProfileService } from "../profile/profile.service";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
export var AuthGuard = (function () {
    function AuthGuard(router, alertService, profile, store) {
        this.router = router;
        this.alertService = alertService;
        this.profile = profile;
        this.store = store;
    }
    AuthGuard.prototype.isLoggedIn = function () {
        var _this = this;
        return this.store.map(function (state) { return state.auth; })
            .first(function (auth) { return auth.authReady; })
            .map(function (auth) { return auth.loggedIn; })
            .do(function (loggedIn) {
            if (!loggedIn) {
                _this.alertService.sendError("You are not logged in");
                _this.router.navigate(['auth/login']);
            }
        });
    };
    AuthGuard.prototype.isInRole = function (role) {
        var _this = this;
        return this.store.map(function (state) { return state.auth; })
            .first(function (auth) { return auth.authReady; })
            .flatMap(function (auth) {
            if (!auth.loggedIn) {
                _this.alertService.sendError("Unauthorized");
                _this.router.navigate(['unauthorized']);
                return Observable.of(false);
            }
            return _this.profile.isInRole(role)
                .map(function (isInRole) {
                if (!isInRole) {
                    _this.alertService.sendError("Unauthorized");
                    _this.router.navigate(['unauthorized']);
                    return false;
                }
                return true;
            });
        })
            .first();
    };
    AuthGuard.decorators = [
        { type: Injectable },
    ];
    AuthGuard.ctorParameters = [
        { type: Router, },
        { type: AlertService, },
        { type: ProfileService, },
        { type: Store, },
    ];
    return AuthGuard;
}());
//# sourceMappingURL=auth-guard.service.js.map