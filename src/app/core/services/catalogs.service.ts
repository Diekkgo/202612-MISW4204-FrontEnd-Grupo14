import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CatalogOption {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  // Temporal para avanzar mientras llegan los servicios reales.

  getUsers(): Observable<CatalogOption[]> {
    return of([
      {
        id: '33333333-3333-3333-3333-333333333301',
        label: 'Estudiante Demo 1'
      },
      {
        id: '33333333-3333-3333-3333-333333333302',
        label: 'Estudiante Demo 2'
      },
      {
        id: '33333333-3333-3333-3333-333333333303',
        label: 'Estudiante Demo 3'
      },
      {
        id: '22222222-2222-2222-2222-222222222201',
        label: 'Profesor Demo 1'
      }
    ]);
  }

  getCourses(): Observable<CatalogOption[]> {
    return of([
      {
        id: '44444444-4444-4444-4444-444444444401',
        label: 'Curso Demo 1'
      },
      {
        id: '44444444-4444-4444-4444-444444444402',
        label: 'Curso Demo 2'
      }
    ]);
  }

  getWeeks(): Observable<CatalogOption[]> {
    return of([
      {
        id: '77777777-7777-7777-7777-777777777701',
        label: 'Semana 1'
      },
      {
        id: '77777777-7777-7777-7777-777777777702',
        label: 'Semana 2'
      },
      {
        id: '77777777-7777-7777-7777-777777777703',
        label: 'Semana 3'
      }
    ]);
  }
}