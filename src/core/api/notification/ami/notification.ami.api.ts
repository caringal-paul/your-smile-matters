import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";
import { GetAllNotificationsResponse } from "@/ami/features/notification/utils/types/notification-response.ami.types";

const ENDPOINT = "/notifications";

const amiNotificationApi = {
  async getAll(
    page: number = 1,
    limit: number = 20,
    unread_only: boolean = false,
  ): Promise<BaseResponseDto<GetAllNotificationsResponse>> {
    try {
      const response = await adminApiClient.get<
        BaseResponseDto<GetAllNotificationsResponse>
      >(`${ENDPOINT}?page=${page}&limit=${limit}&unread_only=${unread_only}`);
      return response;
    } catch (error) {
      const parsedError = handleError(error);
      throw parsedError;
    }
  },

  async markAsRead(id: string): Promise<BaseResponseDto<null>> {
    try {
      const response = await adminApiClient.patch<BaseResponseDto<null>>(
        `${ENDPOINT}/${id}/read`,
      );
      return response;
    } catch (error) {
      const parsedError = handleError(error);
      throw parsedError;
    }
  },

  async markAllAsRead(): Promise<BaseResponseDto<null>> {
    try {
      const response = await adminApiClient.patch<BaseResponseDto<null>>(
        `${ENDPOINT}/read-all`,
      );
      return response;
    } catch (error) {
      const parsedError = handleError(error);
      throw parsedError;
    }
  },
};

export default amiNotificationApi;
