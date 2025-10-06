import { useQuery } from "@tanstack/react-query";
import { GetAllPackageResponseAmi } from "../utils/types/package-response.ami.types";
import amiPackageApi from "@/core/api/package/ami/package.ami.api";

export const useGetAllPackagesQuery = () => {
	return useQuery({
		queryKey: ["packages"],
		queryFn: () => amiPackageApi.get(),
		select: (data): GetAllPackageResponseAmi[] => {
			const packageArray = data.data ?? [];

			return packageArray;
		},
	});
};
