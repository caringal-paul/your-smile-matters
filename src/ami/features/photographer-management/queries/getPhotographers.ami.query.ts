import amiUserApi from "@/core/api/user/ami/user.ami.api";
import { useQuery } from "@tanstack/react-query";
import { GetAllPhotographerResponseAmi } from "../utils/types/photographer-response.ami.types";
import amiPhotographerApi from "@/core/api/photographer/ami/photographer.ami.api";

export const useGetAllPhotographersQuery = () => {
	return useQuery({
		queryKey: ["photographers"],
		queryFn: () => amiPhotographerApi.get(),
		select: (data): GetAllPhotographerResponseAmi[] => {
			const photographersArray = data.data ?? [];

			return photographersArray;
		},
	});
};
