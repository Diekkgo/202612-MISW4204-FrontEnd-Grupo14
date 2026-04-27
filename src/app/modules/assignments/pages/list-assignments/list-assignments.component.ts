import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';

import { AssignmentsService } from '../../services/assignments.service';
import { AssignmentResponse } from '../../models/assignment.model';
import { UserService } from '../../../user/services/user.service';
import { CourseService } from '../../../course/services/course.service';
import { Router, RouterModule } from '@angular/router';

interface CatalogOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-list-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-assignments.component.html',
  styleUrl: './list-assignments.component.css',
})
export class ListAssignmentsComponent implements OnInit {
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly userService = inject(UserService);
  private readonly courseService = inject(CourseService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly filtersForm = this.fb.nonNullable.group({
    userId: [''],
    courseId: [''],
  });

  protected users: CatalogOption[] = [];
  protected courses: CatalogOption[] = [];

  protected assignments: AssignmentResponse[] = [];
  protected loading = false;
  protected errorMessage = '';

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadAssignments();
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

        this.users = usersList.map((item: any) => {
            const user = item.user ?? item;

            return {
              id: user.id,
              label: user.name ?? user.email ?? user.id,
            };
          });

        this.courses = coursesList.map((course: any) => ({
          id: course.id,
          label: `${course.name} (${course.type})`,
        }));
      },
    });
  }

  protected loadAssignments(): void {
    this.loading = true;
    this.errorMessage = '';

    const { userId, courseId } = this.filtersForm.getRawValue();

    this.assignmentsService.getAssignments(userId, courseId).subscribe({
      next: (response) => {
        this.assignments = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible consultar las asignaciones.';
        this.loading = false;
      },
    });
  }

  protected clearFilters(): void {
    this.filtersForm.reset({
      userId: '',
      courseId: '',
    });
    this.loadAssignments();
  }

  protected getUserLabel(userId: string): string {
    return this.users.find((user) => user.id === userId)?.label ?? userId;
  }

  protected getCourseLabel(courseId: string): string {
    return (
      this.courses.find((course) => course.id === courseId)?.label ?? courseId
    );
  }

  protected goToCreate(): void {
    this.router.navigate(['/assignments/create']);
  }
}
