import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  AssignmentResponse,
  CreateAssignmentRequest
} from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.urlBase}assignments`;

  createAssignment(payload: CreateAssignmentRequest): Observable<AssignmentResponse> {
    return this.http.post<AssignmentResponse>(this.baseUrl, payload);
  }

  getAssignments(userId?: string, courseId?: string): Observable<AssignmentResponse[]> {
    let params = new HttpParams();

    if (userId?.trim()) {
      params = params.set('userId', userId.trim());
    }

    if (courseId?.trim()) {
      params = params.set('courseId', courseId.trim());
    }

    return this.http.get<AssignmentResponse[]>(this.baseUrl, { params });
  }
}