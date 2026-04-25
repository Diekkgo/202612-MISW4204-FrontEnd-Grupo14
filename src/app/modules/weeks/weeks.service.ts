import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periods, Weeks } from './weeks.model';
import { environment } from '../../../environments/environment';
import { TokenService } from '../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class WeeksService {
    private apiUrl = environment.urlBase;
    private token = '';
    private headers: HttpHeaders | undefined;

    constructor(private http: HttpClient, private tokenService: TokenService) {}

    getWeeks(): Observable<Weeks[]> {
        this.headers = this.createHeaders();

        return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
    }

    getPeriods(): Observable<Periods[]> {
        this.headers = this.createHeaders();

        return this.http.get<Periods[]>(`${this.apiUrl}academic-period`, { headers: this.headers });
    }

    getWeekById(id: string): Observable<Weeks> {
        this.headers = this.createHeaders();

        return this.http.get<Weeks>(`${this.apiUrl}weeks/${id}`, {
            headers: this.headers
        });
    }

    activateWeek(id: string): Observable<Weeks> {
        this.headers = this.createHeaders();

        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}/activate`, {}, {
            headers: this.headers
        });
    }

    closeWeek(id: string): Observable<Weeks> {
        this.headers = this.createHeaders();

        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}/close`, {}, {
            headers: this.headers
        });
    }

    createWeek(payload: any): Observable<Weeks> {
        this.headers = this.createHeaders();

        return this.http.post<Weeks>(`${this.apiUrl}weeks`, payload, {
            headers: this.headers
        });
    }

    updateWeek(id: string, payload: any): Observable<Weeks> {
        this.headers = this.createHeaders();

        return this.http.put<Weeks>(`${this.apiUrl}weeks/${id}`, payload, {
            headers: this.headers
        });
    }

    deleteWeek(id: string): Observable<void> {
        this.headers = this.createHeaders();

        return this.http.delete<void>(`${this.apiUrl}weeks/${id}`, {
            headers: this.headers
        });
    }

    createHeaders(): HttpHeaders {
        this.token = this.tokenService.getToken() || '';
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }
}