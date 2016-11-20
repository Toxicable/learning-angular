import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlertType } from "../models/alert-types";
import { Store } from '@ngrx/store';
import { AlertActions } from './alert.actions';
export var AlertService = (function () {
    function AlertService(store, alertActions) {
        this.store = store;
        this.alertActions = alertActions;
    }
    AlertService.prototype.sendSuccess = function (message, delay) {
        this.sendAlert({ message: message, type: AlertType.success }, delay);
    };
    AlertService.prototype.sendInfo = function (message, delay) {
        this.sendAlert({ message: message, type: AlertType.info }, delay);
    };
    AlertService.prototype.sendWarning = function (message, delay) {
        this.sendAlert({ message: message, type: AlertType.warning }, delay);
    };
    AlertService.prototype.sendError = function (message, delay) {
        this.sendAlert({ message: message, type: AlertType.error }, delay);
    };
    AlertService.prototype.sendAlert = function (alert, delay) {
        var _this = this;
        if (delay === void 0) { delay = 3000; }
        this.store.dispatch(this.alertActions.Add(alert));
        Observable.of(true)
            .delay(delay)
            .subscribe(function () { return _this.store.dispatch(_this.alertActions.Delete(alert)); });
    };
    AlertService.decorators = [
        { type: Injectable },
    ];
    AlertService.ctorParameters = [
        { type: Store, },
        { type: AlertActions, },
    ];
    return AlertService;
}());
//# sourceMappingURL=alert.service.js.map