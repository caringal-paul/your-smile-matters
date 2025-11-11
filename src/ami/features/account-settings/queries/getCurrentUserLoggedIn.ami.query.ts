import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import amiAuthApi from "@/core/api/auth/ami/auth.ami.api";
import { CurrentUserLoggedInResponse } from "../utils/types/settings-response.ami.types";

export const useGetCurrentUserLoggedInQuery = () => {
	return useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const res: BaseResponseDto<CurrentUserLoggedInResponse> =
				await amiAuthApi.me();

			return res.data;
		},
	});
};
