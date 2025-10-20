import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";

import {
	GetAllCustomerResponseAmi,
	GetByIdCustomerResponseAmi,
} from "@/ami/features/customer-management/utils/types/customer-response.ami.types";
import { CustomerLoginResponse } from "@/store-front/features/auth/utils/types/auth-response.sf.types";
import { customerApiClient } from "@/core/lib/axios/api-client.sf";
import { CustomerAmiCreateWithConfirm } from "@/ami/features/customer-management/utils/schemas/customer.schema";
import { CustomerModel } from "@/core/models/customer.model";

const ENDPOINT = "/client/auth";

export type LoginPayloadSf = {
	email: string;
	password: string;
};

export type LogoutPayloadSf = {
	refreshToken: string;
};

const sfAuthApi = {
	async me(): Promise<BaseResponseDto<GetAllCustomerResponseAmi[]>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetAllCustomerResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async login(
		payload: LoginPayloadSf
	): Promise<BaseResponseDto<CustomerLoginResponse>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<CustomerLoginResponse>
			>(`${ENDPOINT}/login`, payload);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async register(
		payload: CustomerAmiCreateWithConfirm
	): Promise<BaseResponseDto<CustomerModel>> {
		try {
			const response = await customerApiClient.post<
				BaseResponseDto<CustomerModel>
			>(`${ENDPOINT}/register`, payload);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async refresh(
		id: string
	): Promise<BaseResponseDto<GetByIdCustomerResponseAmi>> {
		try {
			const response = await customerApiClient.get<
				BaseResponseDto<GetByIdCustomerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async logout(payload: LogoutPayloadSf): Promise<BaseResponseDto<null>> {
		try {
			const response = await customerApiClient.post<BaseResponseDto<null>>(
				`${ENDPOINT}/logout`,
				payload
			);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default sfAuthApi;
