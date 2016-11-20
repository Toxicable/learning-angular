import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
export var LoadingBarComponent = (function () {
    function LoadingBarComponent(store) {
        this.store = store;
    }
    LoadingBarComponent.prototype.ngOnInit = function () {
        this.loading$ = this.store.select(function (state) { return state.loading; });
    };
    LoadingBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'loading-bar',
                    template: "\n<div *ngIf=\"loading$ | async\">\n    <md-progress-bar mode=\"indeterminate\"></md-progress-bar>\n</div>",
                    styleUrls: ['loading-bar.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    LoadingBarComponent.ctorParameters = [
        { type: Store, },
    ];
    return LoadingBarComponent;
}());
//# sourceMappingURL=loading-bar.component.js.map