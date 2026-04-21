import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ListUserComponent } from './modules/user/pages/list-user/list-user.component';
import { CreateUserComponent } from './modules/user/pages/create-user/create-user.component';
import { AssociateRoleComponent } from './modules/user/pages/associate-role/associate-role.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: 'users',
        component: ListUserComponent
    },
    {
        path: 'users/create',
        component: CreateUserComponent
    },
    {
        path: 'users/:id/roles',
        component: AssociateRoleComponent
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
