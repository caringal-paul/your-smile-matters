import { useQuery } from "@tanstack/react-query";
import amiAnalyticsApi from "@/core/api/analytics/ami/analytics.ami.api";
import { useAnalyticsFilterStore } from "../stores/useAnalyticsFilterStore";

export const useGetBookingTrendsAnalyticsQuery = (
	period: "day" | "month" = "month",
	months: number = 6
) => {
	const dateFilter = useAnalyticsFilterStore((state) => state.dateFilter);

	return useQuery({
		queryKey: ["booking-trends-analytics-ami", dateFilter, period, months],
		queryFn: () => amiAnalyticsApi.getBookingTrends(dateFilter, period, months),
		select: (response) => {
			const formattedData = response?.data?.map((trend) => ({
				...trend,
				"Total Bookings": trend.totalBookings,
			}));
			return formattedData;
		},
	});
};
