import { Injectable } from '@angular/core';
import { Observable, of, using } from 'rxjs';
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
import { TokenService } from '../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class OperationalService {
    private apiUrl = environment.urlBase;
    private token = '';
    private headers: HttpHeaders | undefined;

    constructor(private http: HttpClient, private tokenService: TokenService) {}
    
    getCourses(userId: string): Observable<UserParticipation[]> {
        return this.http.get<UserParticipation[]>(`${this.apiUrl}operational/${userId}/dashboard`, { headers: this.headers });
    }

    getMyTasks(userId: string, weekId: string): Observable<UserTaskRecord[]> {
        return this.http.get<UserTaskRecord[]>(`${this.apiUrl}operational/${userId}/weeks/${weekId}/tasks`, { headers: this.headers });
    }

    getHistory(userId: string, weekId: string): Observable<WeeklyHistoryItem[]> {        
        return this.http.get<WeeklyHistoryItem[]>(`${this.apiUrl}operational/${userId}/weeks/${weekId}/history`, { headers: this.headers });
    }

    getWeeks(): Observable<Weeks[]> {
        return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
    }

    createHeaders(): HttpHeaders {
        this.token = this.tokenService.getToken() || '';
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }
}