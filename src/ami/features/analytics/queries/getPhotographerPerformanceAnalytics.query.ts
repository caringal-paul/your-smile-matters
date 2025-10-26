import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetPhotographerPerformanceAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["photographer-performance-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getPhotographerPerformances(),
		select: (response) => response.data,
	});
};
