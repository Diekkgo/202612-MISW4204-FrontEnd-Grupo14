import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

import { ListUserComponent } from './modules/user/pages/list-user/list-user.component';
import { CreateUserComponent } from './modules/user/pages/create-user/create-user.component';
import { AssociateRoleComponent } from './modules/user/pages/associate-role/associate-role.component';

import { ListAssignmentsComponent } from './modules/assignments/pages/list-assignments/list-assignments.component';
import { CreateAssignmentComponent } from './modules/assignments/pages/create-assignment/create-assignment.component';

import { ListTasksComponent } from './modules/tasks/pages/list-tasks/list-tasks.component';
import { CreateTaskComponent } from './modules/tasks/pages/create-task/create-task.component';
import { TaskDetailComponent } from './modules/tasks/pages/task-detail/task-detail.component';
import { EditTaskComponent } from './modules/tasks/pages/edit-task/edit-task.component';

import { ListReportsComponent } from './modules/reports/pages/list-reports/list-reports.component';
import { GenerateReportsComponent } from './modules/reports/pages/generate-reports/generate-reports.component';

import { ListCourseComponent } from './modules/course/pages/list-course/list-course.component';
import { CreateCourseComponent } from './modules/course/pages/create-course/create-course.component';
import { CourseDetailsComponent } from './modules/course/pages/course-details/course-details.component';

import { ProfessorComponent } from './modules/professor/pages/professor.component';
import { OperationalComponent } from './modules/operational/pages/operational.component';

import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  {
    path: 'users',
    component: ListUserComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'users/create',
    component: CreateUserComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'users/:id/roles',
    component: AssociateRoleComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] }
  },

  {
    path: 'assignments',
    component: ListAssignmentsComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },
  {
    path: 'assignments/create',
    component: CreateAssignmentComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },

  {
    path: 'tasks',
    component: ListTasksComponent,
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE', 'PROFESOR', 'ADMIN'] }
  },
  {
    path: 'tasks/create',
    component: CreateTaskComponent,
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE'] }
  },
  {
    path: 'tasks/:id/edit',
    component: EditTaskComponent,
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE'] }
  },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE', 'PROFESOR', 'ADMIN'] }
  },

  {
    path: 'reports',
    component: ListReportsComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },
  {
    path: 'reports/generate',
    component: GenerateReportsComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },

  {
    path: 'courses',
    component: ListCourseComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },
  {
    path: 'courses/create',
    component: CreateCourseComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },
  {
    path: 'courses/details/:id',
    component: CourseDetailsComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },

  {
    path: 'professor',
    component: ProfessorComponent,
    canActivate: [roleGuard],
    data: { roles: ['PROFESOR', 'ADMIN'] }
  },
  {
    path: 'student-monitor',
    component: OperationalComponent,
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE', 'ADMIN'] }
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