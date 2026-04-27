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
import { TokenService } from '../../core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
    private apiUrl = environment.urlBase;
    private token = '';
    private headers: HttpHeaders | undefined;

    constructor(private http: HttpClient, private tokenService: TokenService) {}

    getStudents(professorId: string): Observable<Student[]> {
            this.headers = this.createHeaders();

            return this.http.get<Student[]>(`${this.apiUrl}professors/${professorId}/students`, { headers: this.headers });
    }

    getCoursesByPerson(userId: string, professorId: string): Observable<Course[]> {
        this.headers = this.createHeaders();

        return this.http.get<Course[]>(`${this.apiUrl}professors/${professorId}/${userId}/courses`, { headers: this.headers });
    }

    getWeeks(): Observable<Weeks[]> {
        this.headers = this.createHeaders();
        
        return this.http.get<Weeks[]>(`${this.apiUrl}weeks`, { headers: this.headers });
    }

    getWeeklyDetail(userId: string): Observable<WeeklyDetail[]> {
        this.headers = this.createHeaders();

        return this.http.get<WeeklyDetail[]>(`${this.apiUrl}professors/user/${userId}/weeks`, { headers: this.headers });
    }

    getConsolidated(userId: string): Observable<PersonSummary[]> {
        this.headers = this.createHeaders();

        return this.http.get<PersonSummary[]>(`${this.apiUrl}professors/user/${userId}/consolidated-report`, { headers: this.headers });
    }

    getTasksByProfessor(weekId: string, professorId: string): Observable<ProfessorTaskView[]> {
        this.headers = this.createHeaders();

        return this.http.get<ProfessorTaskView[]>(`${this.apiUrl}professors/${professorId}/weeks/${weekId}/professor-tasks`, { headers: this.headers });
    }

    getReportedVsContracted(weekId: string, professorId: string): Observable<ReportedVsContracted[]> {
        this.headers = this.createHeaders();

        return this.http.get<ReportedVsContracted[]>(`${this.apiUrl}professors/${professorId}/weeks/${weekId}/time-comparison`, { headers: this.headers });
    }

    createHeaders(): HttpHeaders {
        this.token = this.tokenService.getToken() || '';
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        });
    }
}