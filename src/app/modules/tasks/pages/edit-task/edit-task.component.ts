import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TasksService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    hours: [1, [Validators.required, Validators.min(1)]],
    observations: ['']
  });

  private taskId!: string;

  protected loading = false;
  protected saving = false;
  protected errorMessage = '';

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.loadTask();
  }

  protected loadTask(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          hours: task.hours,
          observations: task.observations
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible cargar la tarea.';
        this.loading = false;
      }
    });
  }

  protected submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.service.updateTask(this.taskId, this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/tasks', this.taskId], {
          state: { successMessage: 'Tarea actualizada correctamente.' }
        });
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          'No fue posible actualizar la tarea.';
        this.saving = false;
      }
    });
  }
}