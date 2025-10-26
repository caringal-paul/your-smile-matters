import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetCustomerInsightAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["customer-insight-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getCustomerInsights(),
		select: (response) => response.data,
	});
};
