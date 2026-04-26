import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { TasksService } from '../../services/tasks.service';
import { TaskStatus } from '../../models/task.model';
import { AssignmentsService } from '../../../assignments/services/assignments.service';
import { AssignmentResponse } from '../../../assignments/models/assignment.model';
import {
  CatalogOption,
  CatalogsService,
} from '../../../../core/services/catalogs.service';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(TasksService);
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly catalogsService = inject(CatalogsService);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  protected readonly statusOptions: TaskStatus[] = [
    'OPEN',
    'IN_PROGRESS',
    'DONE',
  ];

  protected readonly form = this.fb.nonNullable.group({
    assignmentId: ['', Validators.required],
    weekId: ['', Validators.required],
    title: ['', Validators.required],
    description: [''],
    hours: [1, [Validators.required, Validators.min(1)]],
    status: ['OPEN' as TaskStatus, Validators.required],
    observations: [''],
    attachments: [[] as string[]],
  });

  protected assignments: AssignmentResponse[] = [];
  protected weeks: CatalogOption[] = [];
  protected loading = false;
  protected loadingCatalogs = false;
  protected errorMessage = '';

  ngOnInit(): void {
    if (!this.tokenService.isStudent()) {
      this.router.navigate(['/tasks']);
      return;
    }

    this.loadCatalogs();
  }

  protected loadCatalogs(): void {
    this.loadingCatalogs = true;

    forkJoin({
      assignments: this.assignmentsService.getAssignments(),
      weeks: this.catalogsService.getWeeks(),
    }).subscribe({
      next: ({ assignments, weeks }) => {
        this.assignments = assignments;
        this.weeks = weeks;
        this.loadingCatalogs = false;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar asignaciones y semanas.';
        this.loadingCatalogs = false;
      },
    });
  }

  protected submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.service.createTask(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/tasks'], {
          state: { successMessage: 'Tarea creada correctamente.' },
        });
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible crear la tarea.';
        this.loading = false;
      },
    });
  }

  protected getAssignmentLabel(assignmentId: string): string {
    const assignment = this.assignments.find(
      (item) => item.id === assignmentId,
    );
    if (!assignment) return assignmentId;

    return `${assignment.roleType} · ${assignment.contractedHours}h`;
  }

  protected hasError(
    controlName: 'assignmentId' | 'weekId' | 'title' | 'hours',
  ): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}
