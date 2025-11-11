import { handleError } from "@/core/helpers/handleError";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";
import {
	RatingAnalytics,
	RatingResponse,
	RatingWithAnalyticsResponse,
} from "@/core/types/base-response.types";
import { BaseResponseDto } from "@/core/types/base.types";
import {
	RatingSchema,
	UpdateRatingSchema,
} from "@/store-front/features/profile/utils/schema/rating.schema";

const ENDPOINT = "/client/ratings";

const sfRatingApi = {
	async createRating(
		payload: RatingSchema
	): Promise<BaseResponseDto<RatingResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<RatingResponse>
			>(ENDPOINT, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async updateRating(
		ratingId: string,
		payload: UpdateRatingSchema
	): Promise<BaseResponseDto<RatingResponse>> {
		try {
			const response = await customerApiClient.put<
				BaseResponseDto<RatingResponse>
			>(`${ENDPOINT}/${ratingId}`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deleteRating(ratingId: string): Promise<BaseResponseDto<void>> {
		try {
			const response = await customerApiClient.delete<BaseResponseDto<void>>(
				`/ratings/${ratingId}`
			);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getMyRatings(): Promise<BaseResponseDto<RatingResponse[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<RatingResponse[]>
			>(`${ENDPOINT}/my-ratings`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getServiceRatings(
		serviceId: string
	): Promise<BaseResponseDto<RatingWithAnalyticsResponse>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<RatingWithAnalyticsResponse>
			>(`${ENDPOINT}/service/${serviceId}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getPackageRatings(
		serviceId: string
	): Promise<BaseResponseDto<RatingWithAnalyticsResponse>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<RatingWithAnalyticsResponse>
			>(`${ENDPOINT}/package/${serviceId}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getRatingsPerBooking(
		bookingId: string
	): Promise<BaseResponseDto<{ ratings: RatingResponse[] }>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<{ ratings: RatingResponse[] }>
			>(`${ENDPOINT}/booking/${bookingId}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfRatingApi;
