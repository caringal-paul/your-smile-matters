import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { NotificationResponse } from "@/ami/features/notification/utils/types/notification-response.ami.types";
import { useGetAllNotificationsQuery } from "@/ami/features/notification/queries/getAllNotifications.ami.query";
import { useMarkAsReadNotificationMutation } from "@/ami/features/notification/queries/markAsReadNotification.ami.mutation";
import { useMarkAllAsReadNotificationMutation } from "@/ami/features/notification/queries/markAllAsReadNotification.ami.mutation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/base/popover";

const getNavigationRoute = (
  notification: NotificationResponse,
): string | null => {
  const bookingTypes = [
    "BOOKING_CREATED",
    "BOOKING_CONFIRMED",
    "BOOKING_CANCELLED",
    "BOOKING_COMPLETED",
    "BOOKING_RESCHEDULED",
    "BOOKING_REQUEST_CREATED",
    "BOOKING_REQUEST_APPROVED",
    "BOOKING_REQUEST_REJECTED",
  ];
  const transactionTypes = [
    "TRANSACTION_CREATED",
    "TRANSACTION_COMPLETED",
    "TRANSACTION_FAILED",
    "TRANSACTION_REFUND_REQUESTED",
    "TRANSACTION_REFUND_APPROVED",
    "TRANSACTION_REFUND_REJECTED",
  ];

  if (bookingTypes.includes(notification.type))
    return "/admin/ami/booking-management/bookings";
  if (transactionTypes.includes(notification.type))
    return "/admin/ami/transaction-history/transactions";
  return null;
};

const getTypeColor = (type: string): string => {
  if (
    type.includes("CANCELLED") ||
    type.includes("FAILED") ||
    type.includes("REJECTED")
  )
    return "bg-red-500";
  if (
    type.includes("CONFIRMED") ||
    type.includes("COMPLETED") ||
    type.includes("APPROVED")
  )
    return "bg-emerald-500";
  if (type.includes("CREATED") || type.includes("REQUESTED"))
    return "bg-blue-500";
  return "bg-gray-400";
};

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

export const NotificationBell = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllNotificationsQuery();
  const { mutateAsync: markAsRead } = useMarkAsReadNotificationMutation();
  const { mutateAsync: markAllAsRead } = useMarkAllAsReadNotificationMutation();

  const notifications: NotificationResponse[] = [
    ...(data?.notifications ?? []),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  const unreadCount = data?.unread_count ?? 0;

  const handleNotificationClick = async (
    notification: NotificationResponse,
  ) => {
    if (!notification.is_read) await markAsRead(notification._id);
    const route = getNavigationRoute(notification);
    if (route) navigate(route);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-5 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="z-50 p-0 w-[360px] mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-white bg-red-500 rounded-full px-2 py-0.5">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-gray-400">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Bell className="size-8 text-gray-300" />
              <span className="text-sm text-gray-400">
                No notifications yet
              </span>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n._id}
                onClick={() => handleNotificationClick(n)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
                  !n.is_read && "bg-blue-50 hover:bg-blue-100/70",
                )}
              >
                {/* Color dot */}
                <div className="mt-1.5 flex-shrink-0">
                  <div
                    className={cn("size-2 rounded-full", getTypeColor(n.type))}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-xs text-foreground leading-snug",
                      !n.is_read ? "font-semibold" : "font-medium",
                    )}
                  >
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {timeAgo(n.created_at)}
                  </p>
                </div>

                {/* Unread indicator */}
                {!n.is_read && (
                  <div className="mt-1.5 flex-shrink-0 size-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
