import {Injectable} from '@angular/core';

declare let FB: any;
declare let gapi: any;

@Injectable()
export class ExternalAuthService {

    init(){
        FB.init({
            appId      : '1841204649444154',
            status     : true,
            cookie     : true,
            xfbml      : false,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.5
        });

        gapi.load('auth2', () => {

            gapi.auth2.init({
                client_id: '163400937643-kh0h9ojo2bhb0n7mtao0dfqdgrklpseu.apps.googleusercontent.com',
                scope: 'profile'
            })

        })
    }

    authorizeFacebook() {
        FB.login(response => {
            console.log(response);

            FB.api('/me',  { locale: 'en_US', fields: 'name, email' }, next =>{
                console.log(next)
            })
        },{scope: 'email'});
    }

    authorizeGoogle() {

        let auth = gapi.auth2.getAuthInstance();

        auth.signIn().then((response) =>{
            console.log(response.w3.U3)
            console.log(response.w3.ig)
            console.log(response)
        })
    }
}