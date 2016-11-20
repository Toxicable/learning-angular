import { Component } from '@angular/core';
import { ProfileService } from "../../core/profile/profile.service";
import { Store } from '@ngrx/store';
import { AccountService } from '../../core/account/account.service';
export var NavigationComponent = (function () {
    function NavigationComponent(profile, account, store) {
        this.profile = profile;
        this.account = account;
        this.store = store;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        this.username = this.store.select(function (state) { return state.auth.profile.unique_name; });
        this.loggedIn = this.store.select(function (state) { return state.auth.loggedIn; });
    };
    NavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'navigation',
                    templateUrl: './navigation.component.html',
                    styleUrls: ['./navigation.component.scss']
                },] },
    ];
    NavigationComponent.ctorParameters = [
        { type: ProfileService, },
        { type: AccountService, },
        { type: Store, },
    ];
    return NavigationComponent;
}());
//# sourceMappingURL=navigation.component.js.map