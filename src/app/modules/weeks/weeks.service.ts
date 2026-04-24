import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periods, Weeks } from './weeks.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeeksService {
    private apiUrl = environment.urlBase;
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJmYzU3OWItMjk1YS00NTE0LWFmZDAtYTRhMzZlYTEwY2Q0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaXNzIjoidGFza3MtdHJhY2tpbmctYXBpIiwiZXhwIjoxNzc3MDg1NjQzLCJuYmYiOjE3NzY5OTkyNDMsImlhdCI6MTc3Njk5OTI0M30.Svy93QM0ga1YyeP5Braln4q9Xb6YRGiEG0emYGymPEI';
    private headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) {}

    getWeeks(): Observable<Weeks[]> {
        return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
    }

    getPeriods(): Observable<Periods[]> {
        return this.http.get<Periods[]>(`${this.apiUrl}academic-period`, { headers: this.headers });
    }

    getWeekById(id: string): Observable<Weeks> {
        return this.http.get<Weeks>(`${this.apiUrl}weeks/${id}`, {
            headers: this.headers
        });
    }

    activateWeek(id: string): Observable<Weeks> {
        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}/activate`, {}, {
            headers: this.headers
        });
    }

    closeWeek(id: string): Observable<Weeks> {
        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}/close`, {}, {
            headers: this.headers
        });
    }

    createWeek(payload: any): Observable<Weeks> {
        return this.http.post<Weeks>(`${this.apiUrl}weeks`, payload, {
            headers: this.headers
        });
    }

    updateWeek(id: string, payload: any): Observable<Weeks> {
        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}`, payload, {
            headers: this.headers
        });
    }

    deleteWeek(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}weeks/${id}`, {
            headers: this.headers
        });
    }
}