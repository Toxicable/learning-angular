import { StoreModule }        from '@ngrx/store';
import { Alert }              from '../core/models/alert.model';
import { authReducer, AuthState }  from '../core/auth-store/auth.store';
import { loadingBarReducer } from '../core/loading-bar/loading-bar.reducer';
import { alertReducer } from '../core/alert/alert.reducer';
import { User } from './+admin/models/user';

export interface AppState {
    users: User[],
    alerts: Alert[],
    auth: AuthState,
    loading: boolean,
    appStarting: boolean,
}
