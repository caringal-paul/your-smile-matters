import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { apiClient } from "@/core/lib/axios/api-client";

import {
	CreateServiceResponseAmi,
	DeactivateServiceResponseAmi,
	GetAllServiceResponseAmi,
	GetByIdServiceResponseAmi,
	ReactivateServiceResponseAmi,
	ToggleAvailabilityResponseAmi,
	UpdateServiceResponseAmi,
} from "@/ami/features/service-management/utils/types/service-response.ami.types";
import {
	ServiceAmiCreate,
	ServiceAmiUpdate,
} from "@/ami/features/service-management/utils/schemas/service.schema";

const ENDPOINT = "/admin/services";

const amiServiceApi = {
	async get(): Promise<BaseResponseDto<GetAllServiceResponseAmi[]>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetAllServiceResponseAmi[]>
			>(`${ENDPOINT}?sort_by=created_at&sort_order=desc`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdServiceResponseAmi>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetByIdServiceResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async update(
		id: string,
		data: ServiceAmiUpdate
	): Promise<BaseResponseDto<UpdateServiceResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<UpdateServiceResponseAmi>
			>(`${ENDPOINT}/${id}`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async create(
		data: ServiceAmiCreate
	): Promise<BaseResponseDto<CreateServiceResponseAmi>> {
		try {
			const response = await apiClient.post<
				BaseResponseDto<CreateServiceResponseAmi>
			>(ENDPOINT, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deactivate(
		id: string
	): Promise<BaseResponseDto<DeactivateServiceResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<DeactivateServiceResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reactivate(
		id: string
	): Promise<BaseResponseDto<ReactivateServiceResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<ReactivateServiceResponseAmi>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async toggleAvailability(
		id: string
	): Promise<BaseResponseDto<ToggleAvailabilityResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<ToggleAvailabilityResponseAmi>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiServiceApi;
