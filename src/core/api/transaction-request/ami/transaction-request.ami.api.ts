import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import {
	TransactionRequestByIdResponse,
	TransactionRequestResponse,
} from "@/core/types/base-response.types";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

const ENDPOINT = "/admin/transaction-requests";

const amiTransactionRequestsApi = {
	async getTransactionRequests(): Promise<
		BaseResponseDto<TransactionRequestResponse[]>
	> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<TransactionRequestResponse[]>
			>(`${ENDPOINT}/requests`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getTransactionRequestById(
		id: string
	): Promise<BaseResponseDto<TransactionRequestByIdResponse>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<TransactionRequestByIdResponse>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async approve(
		id: string,
		payload: { admin_notes?: string }
	): Promise<BaseResponseDto<TransactionRequestResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<TransactionRequestResponse>
			>(`${ENDPOINT}/requests/${id}/approve-refund`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reject(
		id: string,
		payload: { admin_notes?: string; rejection_reason?: string }
	): Promise<BaseResponseDto<TransactionRequestResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<TransactionRequestResponse>
			>(`${ENDPOINT}/requests/${id}/reject`, payload);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiTransactionRequestsApi;
