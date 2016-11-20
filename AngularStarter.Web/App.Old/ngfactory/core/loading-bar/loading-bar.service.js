import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { LoadingBarActions } from './loading-bar.actions';
export var LoadingBarService = (function () {
    function LoadingBarService(store, loadingBarActions) {
        this.store = store;
        this.loadingBarActions = loadingBarActions;
    }
    LoadingBarService.prototype.load = function () {
        this.store.dispatch(this.loadingBarActions.Start());
    };
    LoadingBarService.prototype.done = function () {
        this.store.dispatch(this.loadingBarActions.Done());
    };
    LoadingBarService.prototype.doWithLoader = function (task) {
        var _this = this;
        return Observable
            .of(true)
            .do(function () { return _this.load(); })
            .flatMap(function () { return task; })
            .finally(function () { return _this.done(); });
    };
    LoadingBarService.decorators = [
        { type: Injectable },
    ];
    LoadingBarService.ctorParameters = [
        { type: Store, },
        { type: LoadingBarActions, },
    ];
    return LoadingBarService;
}());
//# sourceMappingURL=loading-bar.service.js.map