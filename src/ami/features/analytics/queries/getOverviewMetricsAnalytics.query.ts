import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetOverviewMetricsAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useSuspenseQuery({
		queryKey: ["overview-metrics-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getOverview(dateFilter),
		select: (response) => response.data,
	});
};
