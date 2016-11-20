import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
export var HttpExceptionService = (function () {
    function HttpExceptionService() {
    }
    HttpExceptionService.prototype.handleError = function (res) {
        switch (res.status) {
            case 400:
                return this.handleBadRequest(res);
            case 500:
                return this.handleInternalServerError(res);
            default:
                return Observable.throw(["an Unhandled error occured" + res.status]);
        }
    };
    HttpExceptionService.prototype.handleInternalServerError = function (res) {
        console.log(res);
        return Observable.throw([res.text()]);
    };
    HttpExceptionService.prototype.handleTokenBadRequest = function (res) {
        var badRequest = res.json();
        var error = badRequest.error_description;
        return Observable.throw([error]);
    };
    HttpExceptionService.prototype.handleBadRequest = function (res) {
        var badRequest = res.json();
        var errors = badRequest.modelState[""];
        return Observable.throw(errors);
    };
    HttpExceptionService.decorators = [
        { type: Injectable },
    ];
    HttpExceptionService.ctorParameters = [];
    return HttpExceptionService;
}());
//# sourceMappingURL=http-exceptions.service.js.map