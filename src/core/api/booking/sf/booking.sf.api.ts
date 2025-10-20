import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import {
	BookingSfCreate,
	BookingResponseSf,
} from "@/store-front/features/booking/utils/types/booking-response.sf.types";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";

const ENDPOINT = "/client/bookings";

const sfBookingApi = {
	async getMyBookings(): Promise<BaseResponseDto<BookingResponseSf[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<BookingResponseSf[]>
			>(`${ENDPOINT}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getMyBookingDetails(
		id: string
	): Promise<BaseResponseDto<BookingResponseSf>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<BookingResponseSf>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async sendBookingForApproval(
		payload: BookingSfCreate
	): Promise<BaseResponseDto<BookingResponseSf>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<BookingResponseSf>
			>(`${ENDPOINT}`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfBookingApi;
