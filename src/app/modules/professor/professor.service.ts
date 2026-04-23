import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AssignmentView,
  PersonSummary,
  ProfessorTaskView,
  ReportedVsContracted,
  SupervisedPerson,
  WeeklyDetail,
  WeekOption
} from './professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  getSupervisedPeople(): Observable<SupervisedPerson[]> {
    return of([
      {
        userId: '1',
        name: 'Ana Gómez',
        email: 'ana@uni.edu',
        role: 'MONITOR',
        assignmentsCount: 2,
        activeAssignments: 1
      },
      {
        userId: '2',
        name: 'Luis Pérez',
        email: 'luis@uni.edu',
        role: 'ASISTENTE_GRADUADO',
        assignmentsCount: 1,
        activeAssignments: 1
      }
    ]);
  }

  getAssignmentsByPerson(userId: string): Observable<AssignmentView[]> {
    return of([
      {
        assignmentId: 'a1',
        type: 'COURSE',
        name: 'Arquitectura de Software',
        hoursPerWeek: 10,
        startDate: '2026-01-20',
        endDate: '2026-05-30',
        isActive: true
      }
    ]);
  }

  getWeeks(): Observable<WeekOption[]> {
    return of([
      { id: 'w1', label: 'Semana 1 - 2026-04-20 a 2026-04-26' },
      { id: 'w2', label: 'Semana 2 - 2026-04-27 a 2026-05-03' }
    ]);
  }

  getWeeklyDetail(userId: string, weekId: string): Observable<WeeklyDetail> {
    return of({
      userId,
      name: 'Ana Gómez',
      weekStartDate: '2026-04-20',
      weekEndDate: '2026-04-26',
      tasks: [
        {
          taskId: 't1',
          assignmentId: 'a1',
          assignmentName: 'Arquitectura de Software',
          title: 'Preparación de laboratorio',
          description: 'Creación de material de apoyo',
          hours: 4,
          status: 'COMPLETED'
        },
        {
          taskId: 't2',
          assignmentId: 'a1',
          assignmentName: 'Arquitectura de Software',
          title: 'Atención a estudiantes',
          description: 'Resolución de dudas',
          hours: 3,
          status: 'COMPLETED'
        }
      ],
      totalReportedHours: 7
    });
  }

  getPersonSummary(userId: string): Observable<PersonSummary> {
    return of({
      userId,
      name: 'Ana Gómez',
      weeksReported: 6,
      totalReportedHours: 48,
      totalExpectedHours: 60,
      differenceHours: -12,
      compliancePercentage: 80,
      byAssignment: [
        {
          assignmentId: 'a1',
          assignmentName: 'Arquitectura de Software',
          reportedHours: 48,
          expectedHours: 60
        }
      ]
    });
  }

  getTasksByProfessor(): Observable<ProfessorTaskView[]> {
    return of([
      {
        taskId: 't1',
        userName: 'Ana Gómez',
        assignmentName: 'Arquitectura de Software',
        weekStart: '2026-04-20',
        weekEnd: '2026-04-26',
        title: 'Preparación de laboratorio',
        hours: 4,
        status: 'COMPLETED'
      },
      {
        taskId: 't2',
        userName: 'Luis Pérez',
        assignmentName: 'Proyecto de Analítica',
        weekStart: '2026-04-20',
        weekEnd: '2026-04-26',
        title: 'Revisión de entregables',
        hours: 5,
        status: 'PENDING'
      }
    ]);
  }

  getReportedVsContracted(weekId: string): Observable<ReportedVsContracted[]> {
    return of([
      {
        userId: '1',
        userName: 'Ana Gómez',
        assignmentId: 'a1',
        assignmentName: 'Arquitectura de Software',
        contractedHours: 10,
        reportedHours: 7,
        differenceHours: -3,
        status: 'INCOMPLETE'
      },
      {
        userId: '2',
        userName: 'Luis Pérez',
        assignmentId: 'a2',
        assignmentName: 'Proyecto de Analítica',
        contractedHours: 8,
        reportedHours: 8,
        differenceHours: 0,
        status: 'COMPLETE'
      }
    ]);
  }
}