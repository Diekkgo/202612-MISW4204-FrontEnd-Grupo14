import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  UserParticipation,
  UserTaskRecord,
  WeeklyHistoryDetail,
  WeeklyHistoryItem,
  WeekOption
} from './operational.model';
import { Weeks } from '../weeks/weeks.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationalService {
  private apiUrl = environment.urlBase;
  private professorId = 'a0000000-0000-0000-0000-000000000001';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJmYzU3OWItMjk1YS00NTE0LWFmZDAtYTRhMzZlYTEwY2Q0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaXNzIjoidGFza3MtdHJhY2tpbmctYXBpIiwiZXhwIjoxNzc3MTc1ODQ0LCJuYmYiOjE3NzcwODk0NDQsImlhdCI6MTc3NzA4OTQ0NH0.jaYZ5dF9irJ3W13JeSsMmT8v2pYhh-wDs4dBJuvD11U';
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}
  
  getCourses(userId: string): Observable<UserParticipation[]> {
      return this.http.get<UserParticipation[]>(`${this.apiUrl}courses/${userId}`, { headers: this.headers });
  }

  getMyTasks(userId: string): Observable<UserTaskRecord[]> {
      return this.http.get<UserTaskRecord[]>(`${this.apiUrl}tasks/${userId}`, { headers: this.headers });
  }

  getHistory(userId: string): Observable<WeeklyHistoryItem[]> {
      return this.http.get<WeeklyHistoryItem[]>(`${this.apiUrl}history/${userId}`, { headers: this.headers });
  }

  getHistoryDetail(weekId: string): Observable<WeeklyHistoryDetail> {
      return this.http.get<WeeklyHistoryDetail>(`${this.apiUrl}history/${this.professorId}/weeks/${weekId}/detail`, { headers: this.headers });
  }

  getWeeks(): Observable<Weeks[]> {
      return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
  }
}