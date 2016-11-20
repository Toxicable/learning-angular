import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
import { Store } from '@ngrx/store';
import { Storage } from "../storage";
import { AlertService } from '../alert/alert.service';
import { JwtHelper } from 'angular2-jwt';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token.actions';
import { AuthReadyActions } from '../auth-store/auth-ready.actions';
import { ProfileActions } from '../profile/profile.actions';
export var AuthTokenService = (function () {
    function AuthTokenService(storage, loadingBar, http, httpExceptions, store, alert, loggedInActions, authTokenActions, authReadActions, profileActions) {
        this.storage = storage;
        this.loadingBar = loadingBar;
        this.http = http;
        this.httpExceptions = httpExceptions;
        this.store = store;
        this.alert = alert;
        this.loggedInActions = loggedInActions;
        this.authTokenActions = authTokenActions;
        this.authReadActions = authReadActions;
        this.profileActions = profileActions;
        this.jwtHelper = new JwtHelper();
    }
    AuthTokenService.prototype.getTokens = function (data, grantType) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new RequestOptions({ headers: headers });
        Object.assign(data, {
            grant_type: grantType,
            scope: ["openid offline_access"]
        });
        return this.http.post("/api/connect/token", this.encodeObjectToParams(data), options)
            .map(function (res) { return res.json(); })
            .map(function (tokens) {
            _this.store.dispatch(_this.authTokenActions.Load(tokens));
            _this.store.dispatch(_this.loggedInActions.LoggedIn());
            var profile = _this.jwtHelper.decodeToken(tokens.id_token);
            _this.store.dispatch(_this.profileActions.Load(profile));
            _this.storage.setItem("auth-tokens", tokens);
        })
            .do(function (_) { return _this.store.dispatch(_this.authReadActions.Ready()); })
            .catch(function (error) { return _this.httpExceptions.handleTokenBadRequest(error); });
    };
    AuthTokenService.prototype.deleteTokens = function () {
        this.storage.removeItem("auth-tokens");
        this.store.dispatch(this.authTokenActions.Delete());
    };
    AuthTokenService.prototype.unsubscribeRefresh = function () {
        if (this.refreshSubscription$) {
            this.refreshSubscription$.unsubscribe();
        }
    };
    AuthTokenService.prototype.refreshTokens = function () {
        var _this = this;
        return this.store.map(function (state) { return state.auth.authTokens.refresh_token; })
            .first()
            .flatMap(function (refreshToken) {
            return _this.getTokens({ refresh_token: refreshToken }, "refresh_token")
                .catch(function (error) { return Observable.throw("Session Expired"); });
        });
    };
    AuthTokenService.prototype.startupTokenRefresh = function () {
        var _this = this;
        return this.storage.getItem("auth-tokens")
            .flatMap(function (rawTokens) {
            debugger;
            if (!rawTokens) {
                _this.store.dispatch(_this.authReadActions.Ready());
                return Observable.throw("No token in Storage");
            }
            var tokens = JSON.parse(rawTokens);
            _this.store.dispatch(_this.authTokenActions.Load(tokens));
            if (!_this.jwtHelper.isTokenExpired(tokens.id_token)) {
                var profile = _this.jwtHelper.decodeToken(tokens.id_token);
                _this.store.dispatch(_this.profileActions.Load(profile));
                _this.store.dispatch(_this.loggedInActions.LoggedIn());
                _this.store.dispatch(_this.authReadActions.Ready());
            }
            return _this.refreshTokens();
        })
            .catch(function (error) {
            _this.store.dispatch(_this.loggedInActions.NotLoggedIn());
            _this.store.dispatch(_this.authReadActions.Ready());
            return Observable.throw(error);
        });
    };
    AuthTokenService.prototype.scheduleRefresh = function () {
        var _this = this;
        var source = this.store.select(function (state) { return state.auth.authTokens; })
            .take(1)
            .flatMap(function (tokens) {
            var delay = tokens.expires_in / 2 * 1000;
            console.log(delay);
            return Observable.interval(delay);
        });
        this.refreshSubscription$ = source.subscribe(function () {
            console.log("refresh fired");
            _this.refreshTokens()
                .subscribe();
        });
    };
    AuthTokenService.prototype.encodeObjectToParams = function (obj) {
        return Object.keys(obj)
            .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); })
            .join('&');
    };
    AuthTokenService.decorators = [
        { type: Injectable },
    ];
    AuthTokenService.ctorParameters = [
        { type: Storage, },
        { type: LoadingBarService, },
        { type: Http, },
        { type: HttpExceptionService, },
        { type: Store, },
        { type: AlertService, },
        { type: LoggedInActions, },
        { type: AuthTokenActions, },
        { type: AuthReadyActions, },
        { type: ProfileActions, },
    ];
    return AuthTokenService;
}());
//# sourceMappingURL=auth-token.service.js.map