import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ListUserComponent } from './modules/user/pages/list-user/list-user.component';
import { ListAssignmentsComponent } from './modules/assignments/pages/list-assignments/list-assignments.component';
import { CreateAssignmentComponent } from './modules/assignments/pages/create-assignment/create-assignment.component';
import { EditTaskComponent } from './modules/tasks/pages/edit-task/edit-task.component';
import { TaskDetailComponent } from './modules/tasks/pages/task-detail/task-detail.component';
import { CreateTaskComponent } from './modules/tasks/pages/create-task/create-task.component';
import { ListTasksComponent } from './modules/tasks/pages/list-tasks/list-tasks.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'users',
        component: ListUserComponent
    },
    {
        path: 'assignments',
        component: ListAssignmentsComponent
    },
    {
        path: 'assignments/create',
        component: CreateAssignmentComponent
    },
    {
        path:'tasks',
        component:ListTasksComponent
    },
    {
        path:'tasks/create',
        component:CreateTaskComponent
    },
    {
        path:'tasks/:id',
        component:TaskDetailComponent
    },
    {
        path:'tasks/:id/edit',
        component:EditTaskComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
