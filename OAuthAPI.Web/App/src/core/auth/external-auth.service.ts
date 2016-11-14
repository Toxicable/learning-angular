import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Logger } from '../logger';
import { ExternalRegistrationModel } from '../models/external-registration-model';
import { AccountService } from './account.service';
import * as appSettings from '../../app-settings';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs'


@Injectable()
export class ExternalAuthService {

    constructor(private http: Http,
                private logger: Logger,
                private account: AccountService
    ) {}

    init(){
        FB.init({
            appId      : appSettings.appSettings.auth.external.facebookAppId,
            status     : true,
            cookie     : true,
            xfbml      : false,
            version    : 'v2.8' 
        });

        gapi.load('auth', () => {

            //gapi.auth.init()

        })
    }

    authorizeFacebook() {
        let login:Observable<any> = Observable.create( (observer: Observer<any>) => {
            try{
                FB.login(response => {
                observer.next(response)
                observer.complete
            },{scope: 'email'})
            }catch(error){
                observer.error(error);
            }        
        });

        return login.flatMap(response => {
            return this.account.externalRegister({
                accessToken: response.authResponse.accessToken,
                provider: "facebook",
            })
        })

    }

    authorizeGoogle() {
        let login = Observable.create((observer: Observer<any>) => {
            try{
                gapi.auth.authorize({
                    client_id: appSettings.appSettings.auth.external.googleClientId,
                    scope: 'profile'
                }, token => observer.next(token));
            }catch(error){
                observer.error(error);
            }
        })

         return  login.flatMap((response: any) => {
            return this.account.externalRegister({
                accessToken: response.access_token,
                provider: "google",
            })
        })            
    }
}
