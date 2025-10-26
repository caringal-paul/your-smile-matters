import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { TabsContent } from "@/core/components/base/tabs";
import { useGetOverviewMetricsAnalyticsQuery } from "../queries/getOverviewMetricsAnalytics.query";
import { useGetBookingTrendsAnalyticsQuery } from "../queries/getBookingTrendsAnalytics.query";

const promoEffectiveness = [
	{
		_id: "1",
		promoCode: "WEDDING2025",
		promoName: "Wedding Special 2025",
		totalUsage: 67,
		totalDiscount: 20100,
		totalRevenue: 234500,
		refundedAmount: 1200,
		netRevenue: 233300,
		averageDiscount: 300,
		roi: 11.61,
	},
	{
		_id: "2",
		promoCode: "SPRING20",
		promoName: "Spring Discount",
		totalUsage: 89,
		totalDiscount: 17800,
		totalRevenue: 156700,
		refundedAmount: 800,
		netRevenue: 155900,
		averageDiscount: 200,
		roi: 8.76,
	},
	{
		_id: "3",
		promoCode: "NEWCLIENT",
		promoName: "New Client Offer",
		totalUsage: 112,
		totalDiscount: 16800,
		totalRevenue: 134400,
		refundedAmount: 600,
		netRevenue: 133800,
		averageDiscount: 150,
		roi: 7.96,
	},
];

const RevenueTab = () => {
	const { data: overviewData } = useGetOverviewMetricsAnalyticsQuery();
	const { data: trendsData } = useGetBookingTrendsAnalyticsQuery();

	return (
		<TabsContent value="revenue" className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Total Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₱{overviewData?.revenue.total.toLocaleString()}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Total Discounts</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-destructive">
							₱{overviewData?.revenue.totalDiscounts.toLocaleString()}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Total Refunds</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-destructive">
							₱{overviewData?.revenue.totalRefunds.toLocaleString()}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Revenue Trends</CardTitle>
					<CardDescription>Net revenue over time</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={350}>
						<LineChart data={trendsData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="_id.month"
								tickFormatter={(month) => {
									const months = [
										"Jan",
										"Feb",
										"Mar",
										"Apr",
										"May",
										"Jun",
										"Jul",
										"Aug",
										"Sep",
										"Oct",
										"Nov",
										"Dec",
									];
									return months[month - 1] || "";
								}}
								className="text-xs text-nowrap"
							/>
							<YAxis
								tickFormatter={(value) => `${value.toLocaleString()}₱`}
								tick={{ fill: "#846e62", fontSize: 12 }}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#f5f0ec",
									border: "1px solid #a7a29c",
									borderRadius: "8px",
									color: "#846e62",
									fontSize: "13px",
								}}
								itemStyle={{
									color: "#846e62",
									fontWeight: 500,
								}}
								labelStyle={{
									color: "#846e62",
									fontWeight: 600,
								}}
								formatter={(value: number, name: string) => [
									`₱${value.toLocaleString()}`,
									name,
								]}
								labelFormatter={(label: number) => {
									const monthNames = [
										"January",
										"February",
										"March",
										"April",
										"May",
										"June",
										"July",
										"August",
										"September",
										"October",
										"November",
										"December",
									];
									return monthNames[label - 1] || label;
								}}
							/>

							<Legend />
							<Line
								type="monotone"
								dataKey="revenue"
								stroke="#846e62"
								strokeWidth={2}
								name="Gross Revenue"
							/>
							<Line
								type="monotone"
								dataKey="netRevenue"
								stroke="#a7a29c"
								strokeWidth={2}
								name="Net Revenue"
							/>
							<Line
								type="monotone"
								dataKey="refundedAmount"
								stroke="#cd2028"
								strokeWidth={2}
								name="Refunds"
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Promo Code Effectiveness</CardTitle>
					<CardDescription>ROI and usage metrics</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{promoEffectiveness.map((promo, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
							>
								<div>
									<div className="font-semibold">{promo.promoCode}</div>
									<div className="text-sm text-gray-600">{promo.promoName}</div>
								</div>
								<div className="text-right">
									<div className="text-sm text-gray-600">
										Usage: {promo.totalUsage}
									</div>
									<div className="text-sm font-semibold text-green-600">
										ROI: {promo.roi.toFixed(2)}x
									</div>
								</div>
								<div className="text-right">
									<div className="text-sm text-gray-600">
										Revenue: ₱{promo.netRevenue.toLocaleString()}
									</div>
									<div className="text-sm text-orange-600">
										Discount: ₱{promo.totalDiscount.toLocaleString()}
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default RevenueTab;
