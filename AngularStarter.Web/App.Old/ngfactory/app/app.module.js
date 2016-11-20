import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { createNewHosts, createInputTransfer, removeNgStyles } from "@angularclass/hmr";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { providedStore } from './app-store';
export var AppModule = (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
        console.clear();
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        ReactiveFormsModule,
                        SharedModule,
                        CoreModule,
                        routing,
                        providedStore,
                        StoreDevtoolsModule.instrumentOnlyWithExtension()
                    ],
                    declarations: [
                        AppComponent,
                        HomeComponent,
                        NotFoundComponent,
                        NavigationComponent,
                        UnauthorizedComponent
                    ],
                    bootstrap: [AppComponent]
                },] },
    ];
    AppModule.ctorParameters = [
        { type: ApplicationRef, },
    ];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map