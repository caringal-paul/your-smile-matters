import { useQuery } from "@tanstack/react-query";
import sfServiceApi from "@/core/api/service/store-front/service.sf.api";
import { GetAllRecommendedServicesResponse } from "../utils/types/home-response.sf.types";

export const useGetRecommendedServicesQuery = () => {
	return useQuery({
		queryKey: ["recommended-services-sf"],
		queryFn: () => sfServiceApi.getRecommendations(),
		select: (data): GetAllRecommendedServicesResponse[] => {
			const serviceArray = data.data ?? [];

			return serviceArray;
		},
	});
};
