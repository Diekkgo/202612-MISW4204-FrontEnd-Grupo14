import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AssignmentsService } from '../../services/assignments.service';
import { AssignmentResponse } from '../../models/assignment.model';
import {
  CatalogOption,
  CatalogsService
} from '../../../../core/services/catalogs.service';

@Component({
  selector: 'app-list-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-assignments.component.html',
  styleUrl: './list-assignments.component.css'
})
export class ListAssignmentsComponent implements OnInit {
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly catalogsService = inject(CatalogsService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly filtersForm = this.fb.nonNullable.group({
    userId: [''],
    courseId: ['']
  });

  protected assignments: AssignmentResponse[] = [];
  protected loading = false;
  protected errorMessage = '';

  protected users: CatalogOption[] = [];
  protected courses: CatalogOption[] = [];

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadAssignments();
  }

  protected loadCatalogs(): void {
    forkJoin({
      users: this.catalogsService.getUsers(),
      courses: this.catalogsService.getCourses()
    }).subscribe({
      next: ({ users, courses }) => {
        this.users = users;
        this.courses = courses;
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
    return this.users.find((item) => item.id === userId)?.label ?? userId;
  }

  protected getCourseLabel(courseId: string): string {
    return this.courses.find((item) => item.id === courseId)?.label ?? courseId;
  }
}