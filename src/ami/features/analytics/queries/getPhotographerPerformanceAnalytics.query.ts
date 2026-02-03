import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetPhotographerPerformanceAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["photographer-performance-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getPhotographerPerformances(dateFilter),
		select: (response) => response.data,
	});
};
