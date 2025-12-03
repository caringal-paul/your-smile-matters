import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	GetAllTransactionsResponseAmi,
	GetByIdTransactionResponseAmi,
	RefundTransactionResponseAmi,
} from "@/ami/features/transaction-history/utils/types/transaction-response.ami.types";
import { TransactionResponse } from "@/core/types/base-response.types";
import { RefundTransactionSchema } from "@/ami/features/transaction-history/utils/schema/refund.schema";

const ENDPOINT = "/admin/transactions";

const amiTransactionApi = {
	async get(): Promise<BaseResponseDto<GetAllTransactionsResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllTransactionsResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdTransactionResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdTransactionResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async approve(id: string): Promise<BaseResponseDto<TransactionResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<TransactionResponse>
			>(`${ENDPOINT}/${id}/approve`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reject(id: string): Promise<BaseResponseDto<TransactionResponse>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<TransactionResponse>
			>(`${ENDPOINT}/${id}/reject`, {
				reason: "Invalid receipt! Please resubmit.",
			});
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async refund(
		id: string,
		payload: RefundTransactionSchema
	): Promise<BaseResponseDto<RefundTransactionResponseAmi>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<RefundTransactionResponseAmi>
			>(`${ENDPOINT}/${id}/refund`, payload);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiTransactionApi;
