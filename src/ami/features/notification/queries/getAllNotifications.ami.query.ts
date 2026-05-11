import { useQuery } from "@tanstack/react-query";
import { GetAllNotificationsResponse } from "../utils/types/notification-response.ami.types";
import amiNotificationApi from "@/core/api/notification/ami/notification.ami.api";

export const useGetAllNotificationsQuery = (
  page: number = 1,
  limit: number = 20,
  unread_only: boolean = false,
) => {
  return useQuery({
    queryKey: ["notifications-ami", page, limit, unread_only],
    queryFn: () => amiNotificationApi.getAll(page, limit, unread_only),
    refetchInterval: 30000,
    select: (response): GetAllNotificationsResponse =>
      response?.data ?? {
        notifications: [],
        total: 0,
        unread_count: 0,
        page: 1,
        limit: 20,
      }, // 👈 explicit return type
  });
};
