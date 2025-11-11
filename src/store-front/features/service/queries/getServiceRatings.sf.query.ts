import { useQuery } from "@tanstack/react-query";
import sfRatingApi from "@/core/api/rating/sf/rating.sf.api";

export const useGetServiceRatings = (id: string) => {
	return useQuery({
		queryKey: ["services-ratings", id],
		queryFn: () => sfRatingApi.getServiceRatings(id),
	});
};
