import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetPeakHoursAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["peak-hours-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getPeakHours(),
		select: (response) => response.data,
	});
};
