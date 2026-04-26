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