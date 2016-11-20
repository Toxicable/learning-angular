import { Injectable } from '@angular/core';
import { AuthGuard } from "./auth-guard.service";
export var SuperAdminAuthGuard = (function () {
    function SuperAdminAuthGuard(authGuard) {
        this.authGuard = authGuard;
        this.role = "SuperAdmin";
    }
    SuperAdminAuthGuard.prototype.canActivate = function () {
        return this.authGuard.isInRole(this.role);
    };
    SuperAdminAuthGuard.prototype.canLoad = function (route) {
        return this.canActivate();
    };
    SuperAdminAuthGuard.decorators = [
        { type: Injectable },
    ];
    SuperAdminAuthGuard.ctorParameters = [
        { type: AuthGuard, },
    ];
    return SuperAdminAuthGuard;
}());
//# sourceMappingURL=super-admin-auth-guard.service.js.map