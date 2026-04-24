import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppNotification } from './notification.model';
import { Weeks } from '../weeks/weeks.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.urlBase;
  private userId = 'e2fc579b-295a-4514-afd0-a4a36ea10cd4';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJmYzU3OWItMjk1YS00NTE0LWFmZDAtYTRhMzZlYTEwY2Q0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaXNzIjoidGFza3MtdHJhY2tpbmctYXBpIiwiZXhwIjoxNzc3MDg4NjEyLCJuYmYiOjE3NzcwMDIyMTIsImlhdCI6MTc3NzAwMjIxMn0.7FL1nCOauUk4WuaHUXRliffCgCdGSoFZPUE5e3Pk9jM';
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.apiUrl}notifications/${this.userId}`, { headers: this.headers });
  }

  markAsRead(notificationId: string): Observable<AppNotification> {
    return this.http.put<AppNotification>(`${this.apiUrl}notifications/${notificationId}/read`, {}, { headers: this.headers });
  }

  // getUnreadCount(): Observable<number> {
  //   const unread = this.notifications.filter(item => !item.is_read).length;
  //   return of(unread);
  // }

  // getLoginReminder(): Observable<AppNotification | null> {
  //   const isFriday = this.isFriday();

  //   if (!isFriday) {
  //     return of(null);
  //   }

  //   const reminder = this.notifications.find(
  //     item => item.type === 'REMINDER' && item.visibleOnLogin && !item.isRead
  //   ) || null;

  //   return of(reminder);
  // }

  // markAllAsRead(): Observable<boolean> {
  //   this.notifications = this.notifications.map(item => ({
  //     ...item,
  //     isRead: true
  //   }));

  //   return of(true);
  // }

  private isFriday(): boolean {
    const today = new Date();
    return today.getDay() === 5;
  }
}