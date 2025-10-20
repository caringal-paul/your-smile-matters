import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import {
	CreatePhotographerResponseAmi,
	DeactivatePhotographerResponseAmi,
	GetAllPhotographerResponseAmi,
	GetByIdPhotographerResponseAmi,
	ReactivatePhotographerResponseAmi,
	UpdatePhotographerResponseAmi,
} from "@/ami/features/photographer-management/utils/types/photographer-response.ami.types";
import {
	PhotographerAmiCreate,
	PhotographerAmiUpdate,
} from "@/ami/features/photographer-management/utils/schemas/photographer.schema";

const ENDPOINT = "/admin/photographers";

const amiPhotographerApi = {
	async get(): Promise<BaseResponseDto<GetAllPhotographerResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllPhotographerResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdPhotographerResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdPhotographerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async update(
		id: string,
		data: PhotographerAmiUpdate
	): Promise<BaseResponseDto<UpdatePhotographerResponseAmi>> {
		try {
			const response = await adminApiClient.put<
				BaseResponseDto<UpdatePhotographerResponseAmi>
			>(`${ENDPOINT}/${id}`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async create(
		data: PhotographerAmiCreate
	): Promise<BaseResponseDto<CreatePhotographerResponseAmi>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<CreatePhotographerResponseAmi>
			>(ENDPOINT, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deactivate(
		id: string
	): Promise<BaseResponseDto<DeactivatePhotographerResponseAmi>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<DeactivatePhotographerResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reactivate(
		id: string
	): Promise<BaseResponseDto<ReactivatePhotographerResponseAmi>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<ReactivatePhotographerResponseAmi>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiPhotographerApi;
