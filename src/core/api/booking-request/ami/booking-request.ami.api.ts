import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import {
	BookingRequestByIdResponse,
	BookingRequestResponse,
} from "@/core/types/base-response.types";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

const ENDPOINT = "/admin/booking-requests";

const amiBookingRequestsApi = {
	async getBookingRequests(): Promise<
		BaseResponseDto<BookingRequestResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<BookingRequestResponse[]>
			>(`${ENDPOINT}/requests`);

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
			const response = await adminApiClient.get<
				BaseResponseDto<BookingRequestByIdResponse>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async approveCancellation(
		id: string,
		payload: { admin_notes?: string }
	): Promise<BaseResponseDto<BookingRequestResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<BookingRequestResponse>
			>(`${ENDPOINT}/requests/${id}/approve-cancellation`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async approveReschedule(
		id: string,
		payload: { admin_notes?: string }
	): Promise<BaseResponseDto<BookingRequestResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<BookingRequestResponse>
			>(`${ENDPOINT}/requests/${id}/approve-reschedule`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reject(
		id: string,
		payload: { admin_notes?: string; rejection_reason?: string }
	): Promise<BaseResponseDto<BookingRequestResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<BookingRequestResponse>
			>(`${ENDPOINT}/requests/${id}/reject`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiBookingRequestsApi;
