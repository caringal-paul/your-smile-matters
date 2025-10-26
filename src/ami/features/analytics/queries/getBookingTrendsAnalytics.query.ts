import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";

export const useGetBookingTrendsAnalyticsQuery = () => {
	return useQuery({
		queryKey: ["booking-trends-analytics-ami"],
		queryFn: () => amiAnalyticsApi.getBookingTrends(),
		select: (response) => {
			const formattedData = response?.data?.map((trend) => ({
				...trend,
				"Total Bookings": trend.totalBookings,
			}));

			return formattedData;
		},
	});
};
