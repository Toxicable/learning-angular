import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from "../../core/alert/alert.service";
import { Store } from '@ngrx/store';
import { AuthTokenService } from '../../core/auth-token/auth-token.service';
import { AuthHttp } from '../../core/auth-http/auth-http.service';
import { Storage } from '../../core/storage';
export var HomeComponent = (function () {
    function HomeComponent(router, alertService, tokens, store, authHttp, storage) {
        this.router = router;
        this.alertService = alertService;
        this.tokens = tokens;
        this.store = store;
        this.authHttp = authHttp;
        this.storage = storage;
        this.messages = ["Testa 1", "test 2"];
    }
    HomeComponent.prototype.testAuth = function () {
        var _this = this;
        this.authHttp.get("api/values")
            .subscribe(function (x) { return _this.alertService.sendSuccess("all goods"); }, function (error) { return _this.alertService.sendWarning(error); });
    };
    HomeComponent.prototype.connect = function () {
        var _this = this;
        this.hub = $.connection.echoHub;
        $.connection.hub.logging = true;
        this.hub.client.broadCast = function (message) {
            console.log(_this.messages);
            _this.messages.push(message);
        };
        $.connection.hub.start().done(function () {
            console.log("Connected");
        });
    };
    HomeComponent.prototype.echo = function () {
        this.hub.server.broadcast("I am number 1");
    };
    HomeComponent.prototype.refreshTokens = function () {
        this.tokens.refreshTokens()
            .subscribe();
    };
    HomeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'home',
                    templateUrl: './home.component.html'
                },] },
    ];
    HomeComponent.ctorParameters = [
        { type: Router, },
        { type: AlertService, },
        { type: AuthTokenService, },
        { type: Store, },
        { type: AuthHttp, },
        { type: Storage, },
    ];
    return HomeComponent;
}());
//# sourceMappingURL=home.component.js.map