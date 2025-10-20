import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";
import {
	CreateUserResponseAmi,
	DeactivateUserResponseAmi,
	GetAllUserResponseAmi,
	GetByIdUserResponseAmi,
	ReactivateUserResponseAmi,
	UpdateUserResponseAmi,
} from "@/ami/features/user-management/utils/types/user-response.ami.types";
import {
	UserAmiCreate,
	UserAmiUpdate,
} from "@/ami/features/user-management/utils/schemas/user.schema";

const ENDPOINT = "/admin/users";

const amiUserApi = {
	async get(): Promise<BaseResponseDto<GetAllUserResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllUserResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async getById(id: string): Promise<BaseResponseDto<GetByIdUserResponseAmi>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetByIdUserResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async update(
		id: string,
		data: UserAmiUpdate
	): Promise<BaseResponseDto<UpdateUserResponseAmi>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<UpdateUserResponseAmi>
			>(`${ENDPOINT}/${id}`, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async create(
		data: UserAmiCreate
	): Promise<BaseResponseDto<CreateUserResponseAmi>> {
		try {
			const response = await adminApiClient.post<
				BaseResponseDto<CreateUserResponseAmi>
			>(ENDPOINT, data);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async deactivate(
		id: string
	): Promise<BaseResponseDto<DeactivateUserResponseAmi>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<DeactivateUserResponseAmi>
			>(`${ENDPOINT}/${id}`);
			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},

	async reactivate(
		id: string
	): Promise<BaseResponseDto<ReactivateUserResponseAmi>> {
		try {
			const response = await adminApiClient.patch<
				BaseResponseDto<ReactivateUserResponseAmi>
			>(`${ENDPOINT}/${id}`);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiUserApi;
