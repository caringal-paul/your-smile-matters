import { useQuery } from "@tanstack/react-query";
import sfRatingApi from "@/core/api/rating/sf/rating.sf.api";

export const useGetPackageRatings = (id: string) => {
	return useQuery({
		queryKey: ["packages-ratings", id],
		queryFn: () => sfRatingApi.getPackageRatings(id),
	});
};
