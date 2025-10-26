import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useRevenueForecastAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["revenue-forecast-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getRevenueForecast(),
	});
};
