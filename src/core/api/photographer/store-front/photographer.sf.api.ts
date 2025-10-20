import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";

import { GetAvailablePhotographersByTimeRangeResponseSf } from "@/store-front/features/booking/utils/types/booking-response.sf.types";

const ENDPOINT = "/client/photographers";

const sfPhotographerApi = {
	async getTimeAvailability(payload: {
		date: string;
		session_duration_minutes: number;
	}): Promise<BaseResponseDto<string[]>> {
		try {
			const response = await customerApiClient.post<BaseResponseDto<string[]>>(
				`${ENDPOINT}/availability/by-date`,
				payload
			);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getPhotographersByTimeRange(payload: {
		date: string;
		start_time: string;
		end_time: string;
		session_duration_minutes: number;
	}): Promise<
		BaseResponseDto<GetAvailablePhotographersByTimeRangeResponseSf[]>
	> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<GetAvailablePhotographersByTimeRangeResponseSf[]>
			>(`${ENDPOINT}/availability/by-time-range`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfPhotographerApi;
