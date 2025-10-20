import { useQuery } from "@tanstack/react-query";
import sfServiceApi from "@/core/api/service/store-front/service.sf.api";
import { GetAllServiceResponseSf } from "../utils/types/service-response.sf.types";

export const useGetAllServicesQuerySf = () => {
	return useQuery({
		queryKey: ["services-sf"],
		queryFn: () => sfServiceApi.get(),
		select: (data): GetAllServiceResponseSf[] => {
			const serviceArray = data.data ?? [];

			return serviceArray;
		},
	});
};
