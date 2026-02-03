import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetStatusDistributionAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["status-distribution-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getStatusDistribution(dateFilter),
		select: (response) => response.data,
	});
};
