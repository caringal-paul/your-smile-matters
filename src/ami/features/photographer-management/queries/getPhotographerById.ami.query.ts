import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/core/types/base.types";
import { GetByIdPhotographerResponseAmi } from "../utils/types/photographer-response.ami.types";
import amiPhotographerApi from "@/core/api/photographer/ami/photographer.ami.api";

// NOTE: DONT USE SELECT IF WILL USE ENABLED
export const useGetPhotographerByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["photographer", id],
		queryFn: async () => {
			const res: BaseResponseDto<GetByIdPhotographerResponseAmi> =
				await amiPhotographerApi.getById(id);

			return res.data;
		},
		enabled: !!id,
	});
};
