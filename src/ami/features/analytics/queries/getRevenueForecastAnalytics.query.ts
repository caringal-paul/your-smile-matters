import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetRevenueForecastAnalyticsQuery = (
	historicalMonths: number = 6
) => {
	return useQuery({
		queryKey: ["revenue-forecast-analytics-ami", historicalMonths],
		queryFn: () => amiAnalyticsApi.getRevenueForecast(historicalMonths),
		select: (response) => response.data,
	});
};
