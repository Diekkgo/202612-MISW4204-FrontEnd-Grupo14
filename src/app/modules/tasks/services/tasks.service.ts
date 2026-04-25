import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import {
  CreateTaskRequest,
  TaskResponse,
  UpdateTaskRequest,
  UpdateTaskStatusRequest
} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.urlBase}tasks`;

  createTask(payload: CreateTaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.baseUrl, payload);
  }

  getTasks(assignmentId?: string, weekId?: string): Observable<TaskResponse[]> {
    let params = new HttpParams();

    if (assignmentId) {
      params = params.set('assignmentId', assignmentId);
    }

    if (weekId) {
      params = params.set('weekId', weekId);
    }

    return this.http.get<TaskResponse[]>(this.baseUrl, { params });
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.baseUrl}/${id}`);
  }

  updateTask(id: string, payload: UpdateTaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.baseUrl}/${id}`, payload);
  }

  updateTaskStatus(
    id: string,
    payload: UpdateTaskStatusRequest
  ): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, payload);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}