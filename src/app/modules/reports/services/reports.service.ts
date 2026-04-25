import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import {
  GenerateReportsRequest,
  GenerateReportsResponse,
  ListReportsResponse
} from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.urlBase}reports`;

  generateReports(weekId: string): Observable<GenerateReportsResponse> {
    const payload: GenerateReportsRequest = { week_id: weekId };
    return this.http.post<GenerateReportsResponse>(`${this.baseUrl}/generate`, payload);
  }

  listReports(weekId?: string): Observable<ListReportsResponse> {
    let params = new HttpParams();

    if (weekId) {
      params = params.set('week_id', weekId);
    }

    return this.http.get<ListReportsResponse>(this.baseUrl, { params });
  }

  downloadReport(reportId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${reportId}/download`, {
      responseType: 'blob'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'No fue posible descargar el reporte.';

        if (error.status === 403) {
          message = 'No tienes permiso para descargar este reporte.';
        } else if (error.status === 404) {
          message = 'El reporte no fue encontrado.';
        }

        return throwError(() => ({ error: { message } }));
      })
    );
  }
}
