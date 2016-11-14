import { StoreModule }        from '@ngrx/store';
//models
import { User }               from '../+admin/models/user';
import { Alert }              from '../core/models/alert.model';
//reducers
import * as alertReducer      from '../core/alert/alert.reducer';
import * as loadingBarReducer from '../core/loading-bar/loading-bar.reducer';
import { usersReducer }       from '../+admin/users/user-reducer';
import { authReducer, Auth }  from '../core/stores/auth.store';

export interface AppState{
    users: User[],
    alerts: Alert[],
    auth: Auth,
    loading: boolean,
    appStarting: boolean,
}

export const providedStore = StoreModule
    .provideStore({
        users: usersReducer,
        alerts: alertReducer.reducer,
        loading: loadingBarReducer.reducer,
        auth: authReducer
    });