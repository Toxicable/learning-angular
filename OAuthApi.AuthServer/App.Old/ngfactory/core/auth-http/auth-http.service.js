import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { HttpExceptionService } from '../services/http-exceptions.service';
export var AuthHttp = (function () {
    function AuthHttp(http, store, httpExceptions, loadingBar) {
        this.http = http;
        this.store = store;
        this.httpExceptions = httpExceptions;
        this.loadingBar = loadingBar;
        this.baseUrl = '/api';
        this.globalHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }
    AuthHttp.prototype.getHeaders = function () {
        var _this = this;
        return this.store.map(function (state) { return state.auth; })
            .first(function (auth) { return auth.authReady; })
            .map(function (auth) { return auth.authTokens.access_token; })
            .map(function (accessToken) { return new Headers(Object.assign({}, _this.globalHeaders, {
            Authorization: 'Bearer ' + accessToken
        })); });
    };
    AuthHttp.prototype.get = function (url) {
        var _this = this;
        return this.loadingBar.doWithLoader(this.getHeaders()
            .flatMap(function (headers) {
            var options = new RequestOptions({ headers: headers });
            return _this.http.get(_this.baseUrl + url, options)
                .map(_this.checkForError)
                .catch(function (error) { return Observable.throw(error); })
                .map(_this.getJson);
        }));
    };
    AuthHttp.prototype.post = function (url, data) {
        var _this = this;
        return this.loadingBar.doWithLoader(this.getHeaders()
            .flatMap(function (headers) {
            var options = new RequestOptions({ headers: headers });
            return _this.http.post(url, data, options)
                .map(_this.checkForError)
                .catch(function (error) { return _this.httpExceptions.handleError(error); })
                .map(_this.getJson);
        }));
    };
    AuthHttp.prototype.getJson = function (res) {
        if (res.text() != "") {
            return res.json();
        }
    };
    AuthHttp.prototype.checkForError = function (res) {
        if (res.ok) {
            return res;
        }
        throw res;
    };
    AuthHttp.decorators = [
        { type: Injectable },
    ];
    AuthHttp.ctorParameters = [
        { type: Http, },
        { type: Store, },
        { type: HttpExceptionService, },
        { type: LoadingBarService, },
    ];
    return AuthHttp;
}());
//# sourceMappingURL=auth-http.service.js.map