import { Component } from '@angular/core'
import {Router} from "@angular/router";
import {AlertService} from "../../core/services/alert.service";
import {AuthHttp, tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Observable} from "rxjs/Observable";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import { AuthTokenService } from '../../core/auth-token/auth-token.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
constructor(    private router: Router,
                private alertService: AlertService,
                private authHttp: AuthHttp,
                private tokens: AuthTokenService,
                private store: Store<AppState>
    ){}

    testAuth() {
        this.authHttp.get("api/account/isauthenticated")
            .subscribe(
                x => this.alertService.sendSuccess("all goods"),
                error => this.alertService.sendWarning(error)
            )
    }

    testToken(){
        this.store.select( state => state.auth.authTokens.access_token)
            .subscribe(

                token => {
                    let jwtHelper: JwtHelper = new JwtHelper();
                    console.log(jwtHelper.isTokenExpired(token))}
            )
    }

    refreshTokens() {
        this.tokens.refreshTokens()
            .subscribe()
    }

}