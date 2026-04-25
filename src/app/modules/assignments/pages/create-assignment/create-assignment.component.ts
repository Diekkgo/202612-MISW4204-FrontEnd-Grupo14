import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';

import { AssignmentsService } from '../../services/assignments.service';
import {
  AssignmentRoleType,
  CreateAssignmentRequest
} from '../../models/assignment.model';
import {
  CatalogOption,
  CatalogsService
} from '../../../../core/services/catalogs.service';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.css'
})
export class CreateAssignmentComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly catalogsService = inject(CatalogsService);

  protected readonly roleOptions: AssignmentRoleType[] = ['MONITOR', 'ASSISTANT'];

  protected readonly form = this.fb.nonNullable.group({
    userId: ['', [Validators.required]],
    courseId: ['', [Validators.required]],
    roleType: ['MONITOR' as AssignmentRoleType, [Validators.required]],
    contractedHours: [1, [Validators.required, Validators.min(1)]]
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
    this.loadingCatalogs = true;

    forkJoin({
      users: this.catalogsService.getUsers(),
      courses: this.catalogsService.getCourses()
    }).subscribe({
      next: ({ users, courses }) => {
        this.users = users;
        this.courses = courses;
        this.loadingCatalogs = false;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar usuarios y cursos.';
        this.loadingCatalogs = false;
      }
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
      contractedHours: Number(this.form.getRawValue().contractedHours)
    };

    this.assignmentsService.createAssignment(payload).subscribe({
      next: () => {
        this.successMessage = 'Asignación creada correctamente.';
        this.form.reset({
          userId: '',
          courseId: '',
          roleType: 'MONITOR',
          contractedHours: 1
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible crear la asignación.';
        this.loading = false;
      }
    });
  }

  protected hasError(controlName: 'userId' | 'courseId' | 'roleType' | 'contractedHours'): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}