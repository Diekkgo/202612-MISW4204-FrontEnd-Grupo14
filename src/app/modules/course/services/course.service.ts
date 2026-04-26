import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicPeriod, CourseReponse } from '../models/http/courses.interface';
import { environment } from '../../../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly http = inject(HttpClient);

  getCourses(): Observable<CourseReponse> {
    return this.http.get<CourseReponse>(`${environment.urlBase}courses/`);
  }

  getCourse(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${environment.urlBase}courses/${courseId}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.urlBase}courses/`, course);
  }

  closeCourse(courseId: string): Observable<Course> {
    return this.http.patch<Course>(`${environment.urlBase}courses/${courseId}/close`, {});
  }

  // Temporal mientras se integran demás servicios
  getAcademicPeriods(): Observable<AcademicPeriod[]> {
    return this.http.get<AcademicPeriod[]>(`${environment.urlBase}academic-period`);
  }
}
