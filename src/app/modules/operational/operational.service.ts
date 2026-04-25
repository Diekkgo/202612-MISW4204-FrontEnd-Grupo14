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
  private userId = 'a0000000-0000-0000-0000-000000000002';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAyIiwiZW1haWwiOiJtb25pdG9yLnVub0B1bml2ZXJzaWRhZC5lZHUiLCJpc3MiOiJ0YXNrcy10cmFja2luZy1hcGkiLCJleHAiOjE3NzcyMjI1ODEsIm5iZiI6MTc3NzEzNjE4MSwiaWF0IjoxNzc3MTM2MTgxfQ.NtXWEhXXWlSUKvrK1l3c6bRTXzcD8wJU50sEoVEyets';
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}
  
  getCourses(userId: string): Observable<UserParticipation[]> {
      return this.http.get<UserParticipation[]>(`${this.apiUrl}operational/${this.userId}/dashboard`, { headers: this.headers });
  }

  getMyTasks(userId: string): Observable<UserTaskRecord[]> {
      return this.http.get<UserTaskRecord[]>(`${this.apiUrl}operational/${this.userId}/weeks/f3b2f06c-9100-4a2a-b152-6e1375d78874/tasks`, { headers: this.headers });
  }

  getHistory(userId: string): Observable<WeeklyHistoryItem[]> {
      return this.http.get<WeeklyHistoryItem[]>(`${this.apiUrl}operational/${this.userId}/weeks/f3b2f06c-9100-4a2a-b152-6e1375d78874/history/`, { headers: this.headers });
  }

  getHistoryDetail(weekId: string): Observable<WeeklyHistoryDetail> {
      return this.http.get<WeeklyHistoryDetail>(`${this.apiUrl}operational/history/${this.professorId}/weeks/f3b2f06c-9100-4a2a-b152-6e1375d78874/detail`, { headers: this.headers });
  }

  getWeeks(): Observable<Weeks[]> {
      return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
  }
}