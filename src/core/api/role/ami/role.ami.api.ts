import { BaseResponseDto } from "@/core/types/base.types";
import { handleError } from "@/core/helpers/handleError";
import { adminApiClient } from "@/core/lib/axios/api-client.ami";

import { GetAllRolesResponseAmi } from "@/ami/features/role-and-permission/utils/types/role-response.ami.types";

const ENDPOINT = "/admin/roles";

const amiRoleApi = {
	async get(): Promise<BaseResponseDto<GetAllRolesResponseAmi[]>> {
		try {
			const response = await adminApiClient.get<
				BaseResponseDto<GetAllRolesResponseAmi[]>
			>(ENDPOINT);

			return response;
		} catch (error) {
			const parsedError = handleError(error);

			throw parsedError;
		}
	},
};

export default amiRoleApi;
