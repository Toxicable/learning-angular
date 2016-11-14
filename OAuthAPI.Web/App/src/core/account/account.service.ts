import { Injectable } from '@angular/core';
import {RegisterModel} from '../../+auth/models/register-model';
import {Observable} from 'rxjs';
import {Response, Http} from '@angular/http';
import {LoadingBarService} from '../services/loading-bar.service';
import {HttpExceptionService} from '../services/http-exceptions.service';
import {LoginModel} from '../../+auth/models/login-model';
import {AuthApiService} from '../services/auth-api.service';
import {AuthActions} from '../stores/auth.store';
import {ChangePasswordModel} from '../models/change-password';
import {ResetPasswordModel} from '../models/reser-password.model';
import {ProfileActions} from '../stores/profile.store';
import {ExternalRegistrationModel} from '../models/external-registration-model';
import { ExternalLoginModel } from '../models/external-login-model';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { AuthTokenService } from '../auth-token/auth-token.service';
import * as authTokenActions from '../auth-token/auth-token.actions'
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../../app/app-store';

@Injectable()
export class AccountService {

    constructor(private loadingBar: LoadingBarService,
                private http: Http,
                private httpExceptions: HttpExceptionService,
                private authApi: AuthApiService,
                private authActions: AuthActions,
                private profileActions: ProfileActions,
                private authTokens: AuthTokenService,
                private store: Store<AppState>
    ) { }


    register(data: RegisterModel): Observable<Response> {
        return this.http.post("api/account/create", data)

            .catch( this.httpExceptions.handleError )
    }

    externalRegister(model: ExternalRegistrationModel){
        return this.http.post('/api/account/registerexternal', model)
    }

    externalLogin(model: ExternalLoginModel){
        return this.authTokens.getTokens(model, "urn:ietf:params:oauth:grant-type:external_identity_token");
        
    }

    login(user: LoginModel)  {
        return this.authTokens.getTokens(user, "password")
            .do(res => this.authTokens.scheduleRefresh() )
    }

    sendForgotPassword( data ){
        return this.authApi.post("/account/SendForgotPassword", data)
    }

    changePassword(data: ChangePasswordModel){
        return this.authApi.post("/account/changePassword", data)
    }

    resetPassword(data: ResetPasswordModel){
        return this.authApi.post("/account/resetPassword", data )

    }

    logout(){
        this.authTokens.deleteTokens();
        this.authTokens.unsubscribeRefresh();

        this.authActions.isNotLoggedIn();
        this.store.dispatch(new authTokenActions.DeleteAction());
        this.profileActions.deleteProfile();
    }

}