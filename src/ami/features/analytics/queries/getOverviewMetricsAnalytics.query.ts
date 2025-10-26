import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetOverviewMetricsAnalyticsQuery = () => {
	return useSuspenseQuery({
		queryKey: ["overview-metrics-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getOverview(),
		select: (response) => response.data,
	});
};
