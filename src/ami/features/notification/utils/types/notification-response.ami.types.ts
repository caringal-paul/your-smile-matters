export type NotificationResponse = {
  _id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  booking_id?: string | null;
  transaction_id?: string | null;
  customer_id?: string | null;
  request_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type GetAllNotificationsResponse = {
  notifications: NotificationResponse[];
  total: number;
  unread_count: number;
  page: number;
  limit: number;
};
