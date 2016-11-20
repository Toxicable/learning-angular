import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Logger } from '../logger';
import * as appSettings from '../../app-settings';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../account/account.service';
export var ExternalAuthService = (function () {
    function ExternalAuthService(http, logger, account) {
        this.http = http;
        this.logger = logger;
        this.account = account;
    }
    ExternalAuthService.prototype.init = function () {
        FB.init({
            appId: appSettings.appSettings.auth.external.facebookAppId,
            status: true,
            cookie: true,
            xfbml: false,
            version: 'v2.8'
        });
        gapi.load('auth', function () { });
    };
    ExternalAuthService.prototype.register = function (provider) {
        var _this = this;
        var accessToken$;
        if (provider == "Facebook") {
            accessToken$ = this.authorizeFacebook();
        }
        if (provider == "Google") {
            accessToken$ = this.authorizeGoogle();
        }
        return accessToken$.flatMap(function (accessToken) {
            return _this.account.externalRegister({
                accessToken: accessToken,
                provider: provider,
            });
        });
    };
    ExternalAuthService.prototype.login = function (provider) {
        var _this = this;
        var accessToken$;
        if (provider == "Facebook") {
            accessToken$ = this.authorizeFacebook();
        }
        if (provider == "Google") {
            accessToken$ = this.authorizeGoogle();
        }
        return accessToken$.flatMap(function (accessToken) {
            return _this.account.externalLogin({
                assertion: accessToken,
                provider: provider,
            });
        });
    };
    ExternalAuthService.prototype.authorizeFacebook = function () {
        return Observable.create(function (observer) {
            try {
                FB.login(function (response) {
                    observer.next(response.authResponse.accessToken);
                    observer.complete;
                }, { scope: 'email' });
            }
            catch (error) {
                observer.error(error);
            }
        });
    };
    ExternalAuthService.prototype.authorizeGoogle = function () {
        return Observable.create(function (observer) {
            try {
                gapi.auth.authorize({
                    client_id: appSettings.appSettings.auth.external.googleClientId,
                    scope: 'profile'
                }, function (token) {
                    observer.next(token.access_token);
                    observer.complete();
                });
            }
            catch (error) {
                observer.error(error);
            }
        });
    };
    ExternalAuthService.decorators = [
        { type: Injectable },
    ];
    ExternalAuthService.ctorParameters = [
        { type: Http, },
        { type: Logger, },
        { type: AccountService, },
    ];
    return ExternalAuthService;
}());
//# sourceMappingURL=external-auth.service.js.map