import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core'
import {Store} from '@ngrx/store';
import {AppState} from './app-store';
import {AlertService} from '../core/alert/alert.service';
import { AuthTokenService } from '../core/auth-token/auth-token.service';
import { LoggedInAction } from '../core/auth-store/logged-in.actions';
import { AuthReadyAction } from '../core/auth-store/auth-ready.actions';

@Component({
    selector: 'my-app',
    template: `
<loading-bar></loading-bar>
<alert></alert>
<navigation></navigation>
<router-outlet></router-outlet>
`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', './deeppurple-amber.css']
})
export class AppComponent implements OnInit, OnDestroy{

    constructor(private tokens: AuthTokenService,
                private store: Store<AppState>,
                private alert: AlertService
    ){    }

    ngOnInit(): void {
        this.tokens.startupTokenRefresh()
            .subscribe(
            () => {
                console.info("startup done");
                // we manage to refresh the tokens so we can carry with the scheduleRefresh
                this.tokens.scheduleRefresh();
            }, error => {
                console.error(error);
                this.store.dispatch(new LoggedInAction().NotLoggedIn());
                this.store.dispatch(new AuthReadyAction().Ready());

                //keep it silent if there's nothing in storage
                if(error != "No token in Storage")
                    this.alert.sendWarning("error");
            })
    }

    ngOnDestroy(): void {
        this.tokens.unsubscribeRefresh();
    }
}