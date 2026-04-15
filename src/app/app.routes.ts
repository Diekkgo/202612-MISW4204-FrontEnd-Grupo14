import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ListUserComponent } from './modules/user/pages/list-user/list-user.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: 'user',
        component: ListUserComponent
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
