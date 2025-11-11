import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";
import {
	TransactionRequestByIdResponse,
	TransactionRequestResponse,
} from "@/core/types/base-response.types";
import { RequestRefundTransactionSchema } from "@/store-front/features/profile/utils/schema/request-refund.schema";

const ENDPOINT = "/client/transaction-requests";

const sfTransactionRequestsApi = {
	async getMyTransactionRequests(): Promise<
		BaseResponseDto<TransactionRequestResponse[]>
	> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<TransactionRequestResponse[]>
			>(`${ENDPOINT}/my-requests`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getRefundRequestById(
		id: string
	): Promise<BaseResponseDto<TransactionRequestByIdResponse>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<TransactionRequestByIdResponse>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async sendRefundRequestForApproval(
		payload: RequestRefundTransactionSchema
	): Promise<BaseResponseDto<TransactionRequestResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<TransactionRequestResponse>
			>(`${ENDPOINT}/request-refund`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfTransactionRequestsApi;
