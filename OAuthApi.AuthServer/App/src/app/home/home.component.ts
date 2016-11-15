import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/alert/alert.service";
import {Observable} from "rxjs/Observable";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import { AuthTokenService } from '../../core/auth-token/auth-token.service';
import { AuthHttp } from '../../core/auth-http/auth-http.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private tokens: AuthTokenService,
                private store: Store<AppState>,
                private authHttp: AuthHttp
    ){}

    testAuth() {
        this.authHttp.get("api/values")
            .subscribe(
                x => this.alertService.sendSuccess("all goods"),
                error => this.alertService.sendWarning(error)
            )
    }

    // testToken(){
    //     this.store.select( state => state.auth.authTokens.access_token)
    //         .subscribe(

    //             token => {
    //                 let jwtHelper: JwtHelper = new JwtHelper();
    //                 console.log(jwtHelper.isTokenExpired(token))}
    //         )
    // }

    refreshTokens() {
        this.tokens.refreshTokens()
            .subscribe()
    }

}