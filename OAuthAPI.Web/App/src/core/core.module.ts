import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SuperAdminAuthGuard } from "./guards/super-admin-auth-guard.service";
import { AuthenticatedAuthGuard } from "./guards/authenticated-auth-guard.service";
import { Title } from "@angular/platform-browser";
import { LocalStorageBackend, Storage, StorageBackend } from "./storage";
import { authProvider } from "./auth-factory";
import { AlertService } from "./alert/alert.service";
import { ProfileService } from "./profile/profile.service";
import { HttpExceptionService } from "./services/http-exceptions.service";
import { AuthApiService } from "./services/auth-api.service";
import { FormValidationService } from "./services/form-validation.service";
import { AuthGuard } from './guards/auth-guard.service';
import { AuthActions } from './stores/auth.store';
import { ProfileActions } from './stores/profile.store';
import { Logger, ConsoleLoggerBackend, LoggingBackend } from './logger';
import { ExternalAuthService } from './auth-token/external-auth.service';
import { AuthTokenService } from './auth-token/auth-token.service';
import { AccountService } from './account/account.service';
import { LoadingBarService } from './loading-bar/loading-bar.service';


@NgModule({
    providers:[
        LoadingBarService,
        AlertService,
        ProfileService,
        SuperAdminAuthGuard,
        AuthenticatedAuthGuard,
        Title,
        AuthApiService,
        HttpExceptionService,
        FormValidationService,
        AuthGuard,
        AuthTokenService,
        AccountService,
        ExternalAuthService,

        AuthActions,
        ProfileActions,

        { provide: StorageBackend, useClass: LocalStorageBackend },
        { provide: LoggingBackend, useClass: ConsoleLoggerBackend },
        Logger,
        Storage,
        authProvider
    ]

})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}