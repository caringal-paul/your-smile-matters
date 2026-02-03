import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetPackagePerformanceAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["package-performance-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getPackagePerformance(dateFilter),
		select: (response) => response.data,
	});
};
