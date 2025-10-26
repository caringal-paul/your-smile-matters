export type OverviewMetricsAmiResponse = {
	bookings: {
		total: number;
		thisMonth: number;
		today: number;
		pending: number;
		confirmed: number;
		ongoing: number;
		growth: number;
	};
	revenue: {
		total: number;
		thisMonth: number;
		average: number;
		growth: number;
		totalDiscounts: number;
		totalRefunds: number;
		netRevenue: number;
	};
};

export type BookingTrendAmiResponse = {
	_id: {
		year: number;
		month: number;
		day?: number;
	};
	totalBookings: number;
	revenue: number;
	refundedAmount: number;
	netRevenue: number;
	confirmedBookings: number;
	completedBookings: number;
	cancelledBookings: number;
};

export type StatusDistributionAmiResponse = {
	status: string;
	count: number;
	revenue: number;
	refundedAmount: number;
	netRevenue: number;
	percentage: number;
};

export type TopServiceAmiResponse = {
	_id: string;
	serviceName: string;
	category: string;
	totalBookings: number;
	totalQuantity: number;
	totalRevenue: number;
	averagePrice: number;
};

export type PhotographerPerformanceAmiResponse = {
	_id: string;
	photographerName: string;
	email: string;
	totalBookings: number;
	completedBookings: number;
	completionRate: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
	averageRating: number;
	totalRatings: number;
	profileImage: string | null;
};

export type TopCustomerAmiResponse = {
	_id: string;
	customerName: string;
	profileImage: string | null;
	email: string;
	totalBookings: number;
	totalSpent: number;
	refundedAmount: number;
	netSpent: number;
	averageBookingValue: number;
	lastBookingDate: Date;
};

export type CustomerSegmentAmiResponse = {
	_id: number;
	customers: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
};

export type CustomerInsightsAmiResponse = {
	topCustomers: TopCustomerAmiResponse[];
	customerSegments: CustomerSegmentAmiResponse[];
};

export type PackageStatsAmiResponse = {
	_id: string;
	packageName: string;
	packagePrice: number;
	totalBookings: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
	averageRating: number;
};

export type BookingTypeAmiResponse = {
	_id: string;
	count: number;
	revenue: number;
	refundedAmount: number;
	netRevenue: number;
};

export type PackagePerformanceAmiResponse = {
	packageStats: PackageStatsAmiResponse[];
	bookingTypes: BookingTypeAmiResponse[];
};

export type HeatmapDataAmiResponse = {
	_id: {
		date: string;
	};
	bookingCount: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
};

export type PeakHourAmiResponse = {
	_id: {
		hour: number;
		dayOfWeek: number;
	};
	bookingCount: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
};

export type CancellationAnalyticsAmiResponse = {
	cancellationRate: number;
	totalCancellations: number;
	cancellationReasons: {
		_id: string;
		count: number;
	}[];
};

export type PromoEffectivenessAmiResponse = {
	_id: string;
	promoCode: string;
	promoName: string;
	totalUsage: number;
	totalDiscount: number;
	totalRevenue: number;
	refundedAmount: number;
	netRevenue: number;
	averageDiscount: number;
	roi: number;
};

export type RevenueForecastAmiResponse = {
	historical: {
		_id: {
			year: number;
			month: number;
		};
		revenue: number;
		refundedAmount: number;
		netRevenue: number;
		bookings: number;
	}[];
	forecast: {
		nextMonthRevenue: number;
		expectedBookings: number;
		confidence: string;
	};
};
