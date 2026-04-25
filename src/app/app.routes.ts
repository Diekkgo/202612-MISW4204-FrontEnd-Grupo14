import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ListUserComponent } from './modules/user/pages/list-user/list-user.component';
import { ListAssignmentsComponent } from './modules/assignments/pages/list-assignments/list-assignments.component';
import { CreateAssignmentComponent } from './modules/assignments/pages/create-assignment/create-assignment.component';
import { EditTaskComponent } from './modules/tasks/pages/edit-task/edit-task.component';
import { TaskDetailComponent } from './modules/tasks/pages/task-detail/task-detail.component';
import { CreateTaskComponent } from './modules/tasks/pages/create-task/create-task.component';
import { ListTasksComponent } from './modules/tasks/pages/list-tasks/list-tasks.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { CreateUserComponent } from './modules/user/pages/create-user/create-user.component';
import { AssociateRoleComponent } from './modules/user/pages/associate-role/associate-role.component';
import { ListCourseComponent } from './modules/course/pages/list-course/list-course.component';
import { CreateCourseComponent } from './modules/course/pages/create-course/create-course.component';
import { CourseDetailsComponent } from './modules/course/pages/course-details/course-details.component';

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
        path: 'users/create',
        component: CreateUserComponent
    },
    {
        path: 'users/:id/roles',
        component: AssociateRoleComponent
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
        path: 'courses',
        component: ListCourseComponent
    },
    {
        path: 'courses/create',
        component: CreateCourseComponent
    },
    {
        path: 'courses/details/:id',
        component: CourseDetailsComponent
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
