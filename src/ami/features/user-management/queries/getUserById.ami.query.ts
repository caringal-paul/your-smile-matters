import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { useQuery } from "@tanstack/react-query";
import { GetByIdUserResponseAmi } from "../utils/types/user-response.ami.types";
import { BaseResponseDto } from "@/core/types/base.types";

// NOTE: DONT USE SELECT IF WILL USE ENABLED
export const useGetUserByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdUserResponseAmi> =
				await amiUserApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
