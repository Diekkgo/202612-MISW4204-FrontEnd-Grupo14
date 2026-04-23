import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  UserParticipation,
  UserTaskRecord,
  WeeklyHistoryDetail,
  WeeklyHistoryItem,
  WeekOption
} from './operational.model';

@Injectable({
  providedIn: 'root'
})
export class OperationalService {
  getParticipations(): Observable<UserParticipation[]> {
    return of([
      {
        assignmentId: 'a1',
        type: 'COURSE',
        name: 'Arquitectura de Software',
        professorName: 'Carlos Rodríguez',
        hoursPerWeek: 10,
        startDate: '2026-01-20',
        endDate: '2026-05-30',
        isActive: true
      },
      {
        assignmentId: 'a2',
        type: 'PROJECT',
        name: 'Proyecto de Analítica',
        professorName: 'María González',
        hoursPerWeek: 8,
        startDate: '2026-02-01',
        endDate: '2026-06-01',
        isActive: true
      }
    ]);
  }

  getMyTasks(): Observable<UserTaskRecord[]> {
    return of([
      {
        taskId: 't1',
        assignmentId: 'a1',
        assignmentName: 'Arquitectura de Software',
        weekId: 'w1',
        weekLabel: '2026-04-20 a 2026-04-26',
        title: 'Preparación de laboratorio',
        description: 'Creación de material de apoyo',
        hours: 4,
        status: 'COMPLETED',
        createdAt: '2026-04-22'
      },
      {
        taskId: 't2',
        assignmentId: 'a2',
        assignmentName: 'Proyecto de Analítica',
        weekId: 'w1',
        weekLabel: '2026-04-20 a 2026-04-26',
        title: 'Revisión de resultados',
        description: 'Análisis de métricas del proyecto',
        hours: 3,
        status: 'PENDING',
        createdAt: '2026-04-23'
      }
    ]);
  }

  getHistory(): Observable<WeeklyHistoryItem[]> {
    return of([
      {
        weekId: 'w1',
        weekStartDate: '2026-04-20',
        weekEndDate: '2026-04-26',
        totalReportedHours: 7,
        totalTasks: 2,
        status: 'REPORTED'
      },
      {
        weekId: 'w2',
        weekStartDate: '2026-04-27',
        weekEndDate: '2026-05-03',
        totalReportedHours: 8,
        totalTasks: 3,
        status: 'REPORTED'
      }
    ]);
  }

  getHistoryDetail(weekId: string): Observable<WeeklyHistoryDetail> {
    return of({
      weekId,
      weekStartDate: '2026-04-20',
      weekEndDate: '2026-04-26',
      totalReportedHours: 7,
      tasks: [
        {
          taskId: 't1',
          assignmentId: 'a1',
          assignmentName: 'Arquitectura de Software',
          weekId: 'w1',
          weekLabel: '2026-04-20 a 2026-04-26',
          title: 'Preparación de laboratorio',
          description: 'Creación de material de apoyo',
          hours: 4,
          status: 'COMPLETED',
          createdAt: '2026-04-22'
        },
        {
          taskId: 't2',
          assignmentId: 'a2',
          assignmentName: 'Proyecto de Analítica',
          weekId: 'w1',
          weekLabel: '2026-04-20 a 2026-04-26',
          title: 'Revisión de resultados',
          description: 'Análisis de métricas del proyecto',
          hours: 3,
          status: 'PENDING',
          createdAt: '2026-04-23'
        }
      ]
    });
  }

  getWeeks(): Observable<WeekOption[]> {
    return of([
      { id: 'w1', label: 'Semana 1 - 2026-04-20 a 2026-04-26' },
      { id: 'w2', label: 'Semana 2 - 2026-04-27 a 2026-05-03' }
    ]);
  }
}