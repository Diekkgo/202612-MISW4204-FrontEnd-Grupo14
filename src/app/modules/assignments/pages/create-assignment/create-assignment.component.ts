import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';

import { AssignmentsService } from '../../services/assignments.service';
import {
  AssignmentRoleType,
  CreateAssignmentRequest,
} from '../../models/assignment.model';
import { UserService } from '../../../user/services/user.service';
import { CourseService } from '../../../course/services/course.service';

interface CatalogOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.css',
})
export class CreateAssignmentComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly userService = inject(UserService);
  private readonly courseService = inject(CourseService);

  protected readonly roleOptions: AssignmentRoleType[] = [
    'MONITOR',
    'ASSISTANT',
  ];

  protected readonly form = this.fb.nonNullable.group({
    userId: ['', [Validators.required]],
    courseId: ['', [Validators.required]],
    roleType: ['MONITOR' as AssignmentRoleType, [Validators.required]],
    contractedHours: [1, [Validators.required, Validators.min(1)]],
  });

  protected users: CatalogOption[] = [];
  protected courses: CatalogOption[] = [];

  protected loading = false;
  protected loadingCatalogs = false;
  protected successMessage = '';
  protected errorMessage = '';

  ngOnInit(): void {
    this.loadCatalogs();
  }

  protected loadCatalogs(): void {
    forkJoin({
      users: this.userService.getUsers().pipe(
        catchError(() => {
          console.warn('No se pudieron cargar los usuarios');
          return of({ users: [], total: 0 });
        }),
      ),
      courses: this.courseService.getCourses().pipe(
        catchError(() => {
          console.warn('No se pudieron cargar los cursos');
          return of({ courses: [], total: 0 });
        }),
      ),
    }).subscribe({
      next: ({ users, courses }) => {
        const usersList = Array.isArray(users) ? users : (users.users ?? []);
        const coursesList = Array.isArray(courses)
          ? courses
          : (courses.courses ?? []);

        this.users = usersList.map((user: any) => ({
          id: user.id,
          label: user.name ?? user.email ?? user.id,
        }));

        this.courses = coursesList.map((course: any) => ({
          id: course.id,
          label: `${course.name} (${course.type})`,
        }));
      },
    });
  }

  protected submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload: CreateAssignmentRequest = {
      userId: this.form.getRawValue().userId,
      courseId: this.form.getRawValue().courseId,
      roleType: this.form.getRawValue().roleType,
      contractedHours: Number(this.form.getRawValue().contractedHours),
    };

    this.assignmentsService.createAssignment(payload).subscribe({
      next: () => {
        this.successMessage = 'Asignación creada correctamente.';
        this.form.reset({
          userId: '',
          courseId: '',
          roleType: 'MONITOR',
          contractedHours: 1,
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible crear la asignación.';
        this.loading = false;
      },
    });
  }

  protected hasError(
    controlName: 'userId' | 'courseId' | 'roleType' | 'contractedHours',
  ): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}
