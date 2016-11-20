import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { Store } from '@ngrx/store';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from '../auth-token/auth-token.actions';
import { ProfileActions } from '../profile/profile.actions';
import { AuthHttp } from '../auth-http/auth-http.service';
export var AccountService = (function () {
    function AccountService(loadingBar, http, httpExceptions, authHttp, authTokens, store, loggedInAction, authTokenActions, profileActions) {
        this.loadingBar = loadingBar;
        this.http = http;
        this.httpExceptions = httpExceptions;
        this.authHttp = authHttp;
        this.authTokens = authTokens;
        this.store = store;
        this.loggedInAction = loggedInAction;
        this.authTokenActions = authTokenActions;
        this.profileActions = profileActions;
    }
    AccountService.prototype.register = function (data) {
        return this.http.post("api/account/create", data)
            .catch(this.httpExceptions.handleError);
    };
    AccountService.prototype.externalRegister = function (model) {
        return this.http.post('/api/account/registerexternal', model);
    };
    AccountService.prototype.externalLogin = function (model) {
        var _this = this;
        return this.authTokens.getTokens(model, "urn:ietf:params:oauth:grant-type:external_identity_token")
            .do(function () { return _this.authTokens.scheduleRefresh(); });
    };
    AccountService.prototype.login = function (user) {
        var _this = this;
        return this.authTokens.getTokens(user, "password")
            .do(function (res) { return _this.authTokens.scheduleRefresh(); });
    };
    AccountService.prototype.sendForgotPassword = function (data) {
        return this.authHttp.post("/account/SendForgotPassword", data);
    };
    AccountService.prototype.changePassword = function (data) {
        return this.authHttp.post("/account/changePassword", data);
    };
    AccountService.prototype.resetPassword = function (data) {
        return this.authHttp.post("/account/resetPassword", data);
    };
    AccountService.prototype.logout = function () {
        this.authTokens.deleteTokens();
        this.authTokens.unsubscribeRefresh();
        this.store.dispatch(this.loggedInAction.NotLoggedIn());
        this.store.dispatch(this.authTokenActions.Delete());
        this.store.dispatch(this.profileActions.Delete());
    };
    AccountService.decorators = [
        { type: Injectable },
    ];
    AccountService.ctorParameters = [
        { type: LoadingBarService, },
        { type: Http, },
        { type: HttpExceptionService, },
        { type: AuthHttp, },
        { type: AuthTokenService, },
        { type: Store, },
        { type: LoggedInActions, },
        { type: AuthTokenActions, },
        { type: ProfileActions, },
    ];
    return AccountService;
}());
//# sourceMappingURL=account.service.js.map