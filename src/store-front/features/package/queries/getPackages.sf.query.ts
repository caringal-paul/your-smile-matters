import { useQuery } from "@tanstack/react-query";
import sfPackageApi from "@/core/api/package/store-front/package.sf.api";
import { GetAllPackageResponseSf } from "../utils/types/package-response.sf.types";

export const useGetAllPackagesQuerySf = () => {
	return useQuery({
		queryKey: ["packages-sf"],
		queryFn: () => sfPackageApi.get(),
		select: (data): GetAllPackageResponseSf[] => {
			const packageArray = data.data ?? [];

			return packageArray;
		},
	});
};
