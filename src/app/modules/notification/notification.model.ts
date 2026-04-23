export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'REMINDER' | 'INFO' | 'WARNING';
  createdAt: string;
  isRead: boolean;
  visibleOnLogin: boolean;
  scheduledDay?: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
}