import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService } from '../core/alert/alert.service';
import { AuthTokenService } from '../core/auth-token/auth-token.service';
export var AppComponent = (function () {
    function AppComponent(tokens, store, alert) {
        this.tokens = tokens;
        this.store = store;
        this.alert = alert;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tokens.startupTokenRefresh()
            .subscribe(function () {
            console.info("startup done");
            _this.tokens.scheduleRefresh();
        }, function (error) {
            console.error(error);
            if (error != "No token in Storage")
                _this.alert.sendWarning("error");
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.tokens.unsubscribeRefresh();
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    template: "\n<loading-bar></loading-bar>\n<alert></alert>\n<navigation></navigation>\n<router-outlet></router-outlet>\n",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./app.component.scss', './deeppurple-amber.css']
                },] },
    ];
    AppComponent.ctorParameters = [
        { type: AuthTokenService, },
        { type: Store, },
        { type: AlertService, },
    ];
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map