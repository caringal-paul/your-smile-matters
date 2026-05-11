import amiNotificationApi from "@/core/api/notification/ami/notification.ami.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMarkAsReadNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => amiNotificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-ami"] });
    },
  });
};
