import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	GetAllBookingsResponseAmi,
	GetByIdBookingResponseAmi,
} from "@/ami/features/booking-management/utils/types/booking-response.ami.types";

const ENDPOINT = "/admin/bookings";

const amiBookingApi = {
	async get(): Promise<BaseResponseDto<GetAllBookingsResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllBookingsResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdBookingResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdBookingResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async confirm(id: string): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.patch<BaseResponseDto<null>>(
				`${ENDPOINT}/${id}/confirm`
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async start(id: string): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.patch<BaseResponseDto<null>>(
				`${ENDPOINT}/${id}/start`
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async cancel(
		id: string,
		cancelled_reason: string
	): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.patch<BaseResponseDto<null>>(
				`${ENDPOINT}/${id}/cancel`,
				{ cancelled_reason }
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reschedule(
		id: string,
		payload: {
			new_booking_date: Date;
			new_start_time: string;
			new_end_time: string;
			new_photographer_id: string;
		}
	): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.patch<BaseResponseDto<null>>(
				`${ENDPOINT}/${id}/reschedule`,
				payload
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async complete(id: string): Promise<BaseResponseDto<null>> {
		try {
			const response = await adminApiClient.patch<BaseResponseDto<null>>(
				`${ENDPOINT}/${id}/complete`
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiBookingApi;
