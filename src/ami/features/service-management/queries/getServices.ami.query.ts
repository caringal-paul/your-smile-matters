import { useQuery } from "@tanstack/react-query";
import { GetAllServiceResponseAmi } from "../utils/types/service-response.ami.types";
import amiServiceApi from "@/core/api/service/ami/service.ami.api";

export const useGetAllServicesQuery = () => {
	return useQuery({
		queryKey: ["services"],
		queryFn: () => amiServiceApi.get(),
		select: (data): GetAllServiceResponseAmi[] => {
			const ServiceArray = data.data ?? [];

			return ServiceArray;
		},
	});
};
