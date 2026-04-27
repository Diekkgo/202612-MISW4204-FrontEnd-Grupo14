import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';

import { TasksService } from '../../services/tasks.service';
import { TaskResponse, TaskStatus } from '../../models/task.model';
import { AssignmentsService } from '../../../assignments/services/assignments.service';
import { AssignmentResponse } from '../../../assignments/models/assignment.model';
import {
  CatalogOption,
  CatalogsService,
} from '../../../../core/services/catalogs.service';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css',
})
export class ListTasksComponent implements OnInit {
  private readonly service = inject(TasksService);
  private readonly assignmentsService = inject(AssignmentsService);
  private readonly catalogsService = inject(CatalogsService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly statusOptions: TaskStatus[] = [
    'OPEN',
    'IN_PROGRESS',
    'DONE',
  ];
  protected readonly tokenService = inject(TokenService);

  protected readonly filtersForm = this.fb.nonNullable.group({
    assignmentId: [''],
    weekId: [''],
  });

  protected tasks: TaskResponse[] = [];
  protected assignments: AssignmentResponse[] = [];
  protected weeks: CatalogOption[] = [];

  protected loading = false;
  protected errorMessage = '';
  protected successMessage = '';

  ngOnInit(): void {
    this.successMessage = history.state?.successMessage ?? '';
    this.loadCatalogs();
    this.loadTasks();
  }

  protected loadCatalogs(): void {
    forkJoin({
      assignments: this.assignmentsService.getAssignments().pipe(
        catchError(() => {
          console.warn('No se pudieron cargar las asignaciones');
          return of([]);
        }),
      ),
      weeks: this.catalogsService.getWeeks().pipe(
        catchError(() => {
          console.warn('No se pudieron cargar las semanas');
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ assignments, weeks }) => {
        this.assignments = assignments;
        this.weeks = weeks;

        if (!assignments.length || !weeks.length) {
          this.errorMessage =
            'Algunos catálogos no pudieron cargarse. Puedes intentar refrescar la página.';
        }
      },
    });
  }

  protected loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    const { assignmentId, weekId } = this.filtersForm.getRawValue();

    this.service.getTasks(assignmentId, weekId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible cargar las tareas.';
        this.loading = false;
      },
    });
  }

  protected clearFilters(): void {
    this.filtersForm.reset({
      assignmentId: '',
      weekId: '',
    });
    this.loadTasks();
  }

  protected goToDetail(id: string): void {
    this.router.navigate(['/tasks', id]);
  }

  protected goToCreate(): void {
    this.router.navigate(['/tasks/create']);
  }

  protected updateStatus(task: TaskResponse, status: TaskStatus): void {
    if (!this.canModifyTask(task)) {
      this.errorMessage = 'No tienes permisos para modificar esta tarea.';
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.service.updateTaskStatus(task.id, { status }).subscribe({
      next: () => {
        task.status = status;
        this.successMessage = 'Estado actualizado correctamente.';
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible actualizar el estado.';
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

  protected getWeekLabel(weekId: string): string {
    return this.weeks.find((item) => item.id === weekId)?.label ?? weekId;
  }

  protected get canCreateTask(): boolean {
    return this.tokenService.isStudent();
  }

  protected get canUpdateTaskStatus(): boolean {
    return this.tokenService.isStudent();
  }

  protected canModifyTask(task: TaskResponse): boolean {
    return this.tokenService.isStudent() && !task.isLateReport;
  }
}
