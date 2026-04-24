import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotification } from '../notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: AppNotification[] = [];
  unreadCount = 0;
  loginReminder: AppNotification | null = null;

  showNotificationPanel = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUnreadCount();
    // this.loadLoginReminder();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = [...data].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  loadUnreadCount(): void {   
    this.notificationService.getNotifications().subscribe(data => {
        this.unreadCount = this.notifications.filter(item => !item.is_read).length;;
    }); 
  }

  // loadLoginReminder(): void {
  //   this.notificationService.getLoginReminder().subscribe(data => {
  //     this.loginReminder = data;
  //   });
  // }

  toggleNotificationPanel(): void {
    this.showNotificationPanel = !this.showNotificationPanel;
  }

  closeReminder(): void {
    this.loginReminder = null;
  }

  markAsRead(notification: AppNotification): void {
    if (notification.is_read) return;

    this.notificationService.markAsRead(notification.id).subscribe(() => {
      this.loadNotifications();
      this.loadUnreadCount();

      if (this.loginReminder?.id === notification.id) {
        this.loginReminder = null;
      }
    });
  }

  // markAllAsRead(): void {
  //   this.notificationService.markAllAsRead().subscribe(() => {
  //     this.loadNotifications();
  //     this.loadUnreadCount();
  //     this.loginReminder = null;
  //   });
  // }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'REMINDER':
        return 'Recordatorio';
      case 'WARNING':
        return 'Aviso';
      default:
        return 'Información';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'REMINDER':
        return 'type-reminder';
      case 'WARNING':
        return 'type-warning';
      default:
        return 'type-info';
    }
  }
}