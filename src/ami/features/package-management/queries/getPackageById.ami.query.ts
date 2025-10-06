import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import amiPackageApi from "@/core/api/package/ami/package.ami.api";
import { GetByIdPackageResponseAmi } from "../utils/types/package-response.ami.types";

// NOTE: DONT USE SELECT IF WILL USE ENABLED
export const useGetPackageByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["package", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdPackageResponseAmi> =
				await amiPackageApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
