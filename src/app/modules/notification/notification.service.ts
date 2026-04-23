import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppNotification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: AppNotification[] = [
    {
      id: 'n1',
      title: 'Recordatorio semanal',
      message: 'Recuerda registrar tus actividades de la semana antes de finalizar el día.',
      type: 'REMINDER',
      createdAt: '2026-04-21T08:00:00',
      isRead: false,
      visibleOnLogin: true,
      scheduledDay: 'FRIDAY'
    },
    {
      id: 'n2',
      title: 'Actualización de plataforma',
      message: 'La plataforma fue actualizada correctamente y ya se encuentra disponible.',
      type: 'INFO',
      createdAt: '2026-04-20T10:30:00',
      isRead: false,
      visibleOnLogin: false
    },
    {
      id: 'n3',
      title: 'Aviso importante',
      message: 'Revisa que todas tus tareas estén asociadas a la semana correspondiente.',
      type: 'WARNING',
      createdAt: '2026-04-18T14:00:00',
      isRead: true,
      visibleOnLogin: false
    }
  ];

  getNotifications(): Observable<AppNotification[]> {
    return of(this.notifications);
  }

  getUnreadCount(): Observable<number> {
    const unread = this.notifications.filter(item => !item.isRead).length;
    return of(unread);
  }

  getLoginReminder(): Observable<AppNotification | null> {
    const isFriday = this.isFriday();

    if (!isFriday) {
      return of(null);
    }

    const reminder = this.notifications.find(
      item => item.type === 'REMINDER' && item.visibleOnLogin && !item.isRead
    ) || null;

    return of(reminder);
  }

  markAsRead(notificationId: string): Observable<boolean> {
    this.notifications = this.notifications.map(item =>
      item.id === notificationId ? { ...item, isRead: true } : item
    );

    return of(true);
  }

  markAllAsRead(): Observable<boolean> {
    this.notifications = this.notifications.map(item => ({
      ...item,
      isRead: true
    }));

    return of(true);
  }

  private isFriday(): boolean {
    const today = new Date();
    return today.getDay() === 5;
  }
}