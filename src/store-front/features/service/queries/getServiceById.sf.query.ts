import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import sfServiceApi from "@/core/api/service/store-front/service.sf.api";
import { GetByIdServiceResponseSf } from "../utils/types/service-response.sf.types";

export const useGetServiceByIdQuerySf = (id: string) => {
	return useQuery({
		queryKey: ["service-sf", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdServiceResponseSf> =
				await sfServiceApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
