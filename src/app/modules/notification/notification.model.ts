export interface AppNotification {
  id: string;
  user_id: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}