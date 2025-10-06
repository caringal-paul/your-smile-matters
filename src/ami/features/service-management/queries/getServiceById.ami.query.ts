import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { GetByIdServiceResponseAmi } from "../utils/types/service-response.ami.types";
import amiServiceApi from "@/core/api/service/ami/service.ami.api";

// NOTE: DONT USE SELECT IF WILL USE ENABLED
export const useGetServiceByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["service", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdServiceResponseAmi> =
				await amiServiceApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
