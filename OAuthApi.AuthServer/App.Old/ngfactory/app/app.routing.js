import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { SuperAdminAuthGuard } from "../core/guards/super-admin-auth-guard.service";
var appRoutes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'admin',
        loadChildren: '../+admin/admin.module#AdminModule',
        canLoad: [SuperAdminAuthGuard]
    },
    {
        path: 'auth',
        loadChildren: '../+auth/auth.module#AuthModule'
    },
    {
        path: 'account',
        loadChildren: '../+account/account.module#AccountModule'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
export var routing = RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
});
//# sourceMappingURL=app.routing.js.map