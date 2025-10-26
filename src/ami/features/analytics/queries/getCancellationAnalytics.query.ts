import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetCancellationAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["cancellation-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getCancellationAnalytics(),
		select: (response) => response.data,
	});
};
