import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";
import {
	BookingRequestByIdResponse,
	BookingRequestResponse,
} from "@/core/types/base-response.types";
import { RequestRescheduleBookingSchema } from "@/store-front/features/profile/utils/schema/request-reschedule.schema";
import { RequestCancelBookingSchema } from "@/store-front/features/profile/utils/schema/request-cancel.schema";

const ENDPOINT = "/client/booking-requests";

const sfBookingRequestsApi = {
	async getMyBookingRequests(): Promise<
		BaseResponseDto<BookingRequestResponse[]>
	> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<BookingRequestResponse[]>
			>(`${ENDPOINT}/my-requests`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getBookingRequestById(
		id: string
	): Promise<BaseResponseDto<BookingRequestByIdResponse>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<BookingRequestByIdResponse>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async sendRescheduleRequestForApproval(
		id: string,
		payload: RequestRescheduleBookingSchema
	): Promise<BaseResponseDto<BookingRequestResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<BookingRequestResponse>
			>(`${ENDPOINT}/${id}/request-reschedule`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async sendCancellationRequestForApproval(
		id: string,
		payload: RequestCancelBookingSchema
	): Promise<BaseResponseDto<BookingRequestResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<BookingRequestResponse>
			>(`${ENDPOINT}/${id}/request-cancellation`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfBookingRequestsApi;
