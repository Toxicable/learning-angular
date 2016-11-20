import { StoreModule } from '@ngrx/store';
import { usersReducer } from '../+admin/users/user-reducer';
import { authReducer } from '../core/auth-store/auth.store';
import { loadingBarReducer } from '../core/loading-bar/loading-bar.reducer';
import { alertReducer } from '../core/alert/alert.reducer';
export var providedStore = StoreModule
    .provideStore({
    users: usersReducer,
    alerts: alertReducer,
    loading: loadingBarReducer,
    auth: authReducer
});
//# sourceMappingURL=app-store.js.map