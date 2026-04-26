import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AssignmentsService } from '../../services/assignments.service';
import { AssignmentResponse } from '../../models/assignment.model';
import {
  CatalogOption
} from '../../../../core/services/catalogs.service';
import { UserService } from '../../../user/services/user.service';
import { CourseService } from '../../../course/services/course.service';
import { Course } from '../../../course/models/course.model';
import { UserWithRoles } from '../../../user/models/http/users.interface';

@Component({
  selector: 'app-list-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-assignments.component.html',
  styleUrl: './list-assignments.component.css'
})
export class ListAssignmentsComponent implements OnInit {
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly userService = inject(UserService);
  private readonly courseService = inject(CourseService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly filtersForm = this.fb.nonNullable.group({
    userId: [''],
    courseId: ['']
  });

  protected assignments: AssignmentResponse[] = [];
  protected loading = false;
  protected errorMessage = '';

  protected users: UserWithRoles[] = [];
  protected courses: Course[] = [];

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadAssignments();
  }

  protected loadCatalogs(): void {
    forkJoin({
      users: this.userService.getUsers(),
      courses: this.courseService.getCourses()
    }).subscribe({
      next: ({ users, courses }) => {
        this.users = users.users;
        this.courses = courses.courses;
      }
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
      }
    });
  }

  protected clearFilters(): void {
    this.filtersForm.reset({
      userId: '',
      courseId: ''
    });
    this.loadAssignments();
  }

  protected goToCreate(): void {
    this.router.navigate(['/assignments/create']);
  }

  protected getUserLabel(userId: string): string {
    return this.users.find((item) => item.user.id === userId)?.user.name ?? userId;
  }

  protected getCourseLabel(courseId: string): string {
    return this.courses.find((item) => item.id === courseId)?.name ?? courseId;
  }
}