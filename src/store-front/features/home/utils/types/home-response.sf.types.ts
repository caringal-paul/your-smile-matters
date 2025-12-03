import { ServiceModel } from "@/core/models/service.model";

export type GetAllRecommendedServicesResponse = ServiceModel & {
	metrics: {
		popularity_score: number;
		total_revenue: number;
		booking_count: number;
		recent_bookings: number;
		avg_booking_value: number;
	};
};
