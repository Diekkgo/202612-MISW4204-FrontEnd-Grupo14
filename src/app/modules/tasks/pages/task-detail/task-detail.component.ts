import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { TasksService } from '../../services/tasks.service';
import { TaskResponse } from '../../models/task.model';
import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TasksService);
  private readonly router = inject(Router);
  protected readonly tokenService = inject(TokenService);

  protected task?: TaskResponse;
  protected loading = false;
  protected deleting = false;
  protected errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadTask(id);
  }

  protected loadTask(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible cargar el detalle de la tarea.';
        this.loading = false;
      },
    });
  }

  protected deleteTask(): void {
    if (!this.task || !this.canEditOrDelete) {
      this.errorMessage = 'No tienes permisos para eliminar esta tarea.';
      return;
    }

    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la tarea "${this.task.title}"?`,
    );
    if (!confirmed) return;

    this.deleting = true;
    this.errorMessage = '';

    this.service.deleteTask(this.task.id).subscribe({
      next: () => {
        this.router.navigate(['/tasks'], {
          state: { successMessage: 'Tarea eliminada correctamente.' },
        });
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible eliminar la tarea.';
        this.deleting = false;
      },
    });
  }

  protected edit(): void {
    if (!this.task || !this.canEditOrDelete) {
      this.errorMessage = 'No tienes permisos para editar esta tarea.';
      return;
    }

    this.router.navigate(['/tasks', this.task.id, 'edit']);
  }

  protected goBack(): void {
    this.router.navigate(['/tasks']);
  }

  protected get canEditOrDelete(): boolean {
    return (
      !!this.task && this.tokenService.isStudent() && !this.task.isLateReport
    );
  }
}
