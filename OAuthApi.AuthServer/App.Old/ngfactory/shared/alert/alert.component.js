import { Component } from '@angular/core';
import { AlertService } from "../../core/alert/alert.service";
import { Store } from '@ngrx/store';
export var AlertComponent = (function () {
    function AlertComponent(alertService, store) {
        this.alertService = alertService;
        this.store = store;
    }
    AlertComponent.prototype.ngOnInit = function () {
        this.alerts = this.store.select(function (state) { return state.alerts; });
    };
    AlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'alert',
                    templateUrl: 'alert.component.html',
                    styleUrls: ['alert.component.scss']
                },] },
    ];
    AlertComponent.ctorParameters = [
        { type: AlertService, },
        { type: Store, },
    ];
    return AlertComponent;
}());
//# sourceMappingURL=alert.component.js.map