import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface CatalogOption {
  id: string;
  label: string;
}

interface WeekResponse {
  ID: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  IsClosed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<CatalogOption[]> {
    return of([
      { id: '33333333-3333-3333-3333-333333333301', label: 'Estudiante Demo 1' },
      { id: '33333333-3333-3333-3333-333333333302', label: 'Estudiante Demo 2' },
      { id: '33333333-3333-3333-3333-333333333303', label: 'Estudiante Demo 3' },
      { id: '22222222-2222-2222-2222-222222222201', label: 'Profesor Demo 1' }
    ]);
  }

  getCourses(): Observable<CatalogOption[]> {
    return of([
      { id: '44444444-4444-4444-4444-444444444401', label: 'Curso Demo 1' },
      { id: '44444444-4444-4444-4444-444444444402', label: 'Curso Demo 2' }
    ]);
  }

  getWeeks(): Observable<CatalogOption[]> {
    return this.http.get<WeekResponse[]>(`${environment.urlBase}weeks`).pipe(
      map((weeks) =>
        weeks.map((w) => ({
          id: w.ID,
          label: this.formatWeekLabel(w.StartDate, w.EndDate)
        }))
      )
    );
  }

  private formatWeekLabel(startDate: string, endDate: string): string {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    return `${fmt(startDate)} – ${fmt(endDate)}`;
  }
}