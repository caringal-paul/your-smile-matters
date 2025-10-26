import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetTopServicesAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["top-services-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getTopServices(),
		select: (response) => response.data,
	});
};
