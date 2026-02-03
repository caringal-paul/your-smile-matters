import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetCustomerInsightAnalyticsQuery = () => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["customer-insight-analytics-ami", dateFilter],
		queryFn: () => amiAnalyticsApi.getCustomerInsights(dateFilter),
		select: (response) => response.data,
	});
};
