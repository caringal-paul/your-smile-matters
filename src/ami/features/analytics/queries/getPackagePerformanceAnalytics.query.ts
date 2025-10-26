import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetPackagePerformanceAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["package-performance-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getPackagePerformance(),
		select: (response) => response.data,
	});
};
