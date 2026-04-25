import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Course,
  Student,
  PersonSummary,
  ProfessorTaskView,
  ReportedVsContracted,
  WeeklyDetail,
} from './professor.model';
import { Weeks } from '../weeks/weeks.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = environment.urlBase;
  private professorId = 'a0000000-0000-0000-0000-000000000001';
  private userId = 'a0000000-0000-0000-0000-000000000002';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJmYzU3OWItMjk1YS00NTE0LWFmZDAtYTRhMzZlYTEwY2Q0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaXNzIjoidGFza3MtdHJhY2tpbmctYXBpIiwiZXhwIjoxNzc3MTc1ODQ0LCJuYmYiOjE3NzcwODk0NDQsImlhdCI6MTc3NzA4OTQ0NH0.jaYZ5dF9irJ3W13JeSsMmT8v2pYhh-wDs4dBJuvD11U';
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}professors/${this.professorId}/students`, { headers: this.headers });
  }

  getCoursesByPerson(userId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}professors/${this.professorId}/${this.userId}/courses`, { headers: this.headers });
  }

  getWeeks(): Observable<Weeks[]> {
      return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
  }

  getWeeklyDetail(userId: string): Observable<WeeklyDetail> {
    return this.http.get<WeeklyDetail>(`${this.apiUrl}professors/user/${this.userId}/weeks`, { headers: this.headers });
  }

  getConsolidated(userId: string): Observable<PersonSummary> {
      return this.http.get<PersonSummary>(`${this.apiUrl}professors/user/${this.userId}/consolidated-report`, { headers: this.headers });
  }

  getTasksByProfessor(weekId: string): Observable<ProfessorTaskView[]> {
      return this.http.get<ProfessorTaskView[]>(`${this.apiUrl}professors/${this.professorId}/weeks/f3b2f06c-9100-4a2a-b152-6e1375d78874/professor-tasks`, { headers: this.headers });
  }

  getReportedVsContracted(weekId: string): Observable<ReportedVsContracted[]> {
      return this.http.get<ReportedVsContracted[]>(`${this.apiUrl}professors/weeks/f3b2f06c-9100-4a2a-b152-6e1375d78874/time-comparison`, { headers: this.headers });
  }
}