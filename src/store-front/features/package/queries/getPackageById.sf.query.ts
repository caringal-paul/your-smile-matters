import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { GetByIdPackageResponseSf } from "../utils/types/package-response.sf.types";
import sfPackageApi from "@/core/api/package/store-front/package.sf.api";

export const useGetPackageByIdQuerySf = (id: string) => {
	return useQuery({
		queryKey: ["package-sf", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdPackageResponseSf> =
				await sfPackageApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
