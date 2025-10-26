import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetStatusDistributionAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["status-distribution-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getStatusDistribution(),
		select: (response) => response.data,
	});
};
