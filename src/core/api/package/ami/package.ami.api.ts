import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { apiClient } from "@/core/lib/axios/api-client";
import {
	CreatePackageResponseAmi,
	DeactivatePackageResponseAmi,
	GetAllPackageResponseAmi,
	GetByIdPackageResponseAmi,
	ReactivatePackageResponseAmi,
	ToggleAvailabilityResponseAmi,
	UpdatePackageResponseAmi,
} from "@/ami/features/package-management/utils/types/package-response.ami.types";
import {
	PackageAmiCreate,
	PackageAmiUpdate,
} from "@/ami/features/package-management/utils/schemas/package.schema";

const ENDPOINT = "/admin/packages";

const amiPackageApi = {
	async get(): Promise<BaseResponseDto<GetAllPackageResponseAmi[]>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetAllPackageResponseAmi[]>
			>(`${ENDPOINT}`);

			// ?sort_by=created_at&sort_order=desc
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(
		id: string
	): Promise<BaseResponseDto<GetByIdPackageResponseAmi>> {
		try {
			const response = await apiClient.get<
				BaseResponseDto<GetByIdPackageResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async update(
		id: string,
		data: PackageAmiUpdate
	): Promise<BaseResponseDto<UpdatePackageResponseAmi>> {
		try {
			const response = await apiClient.put<
				BaseResponseDto<UpdatePackageResponseAmi>
			>(`${ENDPOINT}/${id}`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async create(
		data: PackageAmiCreate
	): Promise<BaseResponseDto<CreatePackageResponseAmi>> {
		try {
			const response = await apiClient.post<
				BaseResponseDto<CreatePackageResponseAmi>
			>(ENDPOINT, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deactivate(
		id: string
	): Promise<BaseResponseDto<DeactivatePackageResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<DeactivatePackageResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reactivate(
		id: string
	): Promise<BaseResponseDto<ReactivatePackageResponseAmi>> {
		try {
			const response = await apiClient.patch<
				BaseResponseDto<ReactivatePackageResponseAmi>
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

export default amiPackageApi;
