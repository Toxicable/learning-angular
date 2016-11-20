import { Injectable } from '@angular/core';
import { AuthGuard } from "./auth-guard.service";
export var AuthenticatedAuthGuard = (function () {
    function AuthenticatedAuthGuard(authGuard) {
        this.authGuard = authGuard;
    }
    AuthenticatedAuthGuard.prototype.canActivate = function () {
        return this.authGuard.isLoggedIn();
    };
    AuthenticatedAuthGuard.decorators = [
        { type: Injectable },
    ];
    AuthenticatedAuthGuard.ctorParameters = [
        { type: AuthGuard, },
    ];
    return AuthenticatedAuthGuard;
}());
//# sourceMappingURL=authenticated-auth-guard.service.js.map