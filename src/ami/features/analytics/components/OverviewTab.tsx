import {
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { TabsContent } from "@/core/components/base/tabs";
import MetricCard from "./MetricCard";
import { useGetOverviewMetricsAnalyticsQuery } from "../queries/getOverviewMetricsAnalytics.query";
import { useGetBookingTrendsAnalyticsQuery } from "../queries/getBookingTrendsAnalytics.query";
import { useGetStatusDistributionAnalyticsQuery } from "../queries/getStatusDistributionAnalytics.query";

const COLORS = ["#846e62", "#9c7c6a", "#bfa89b", "#6b5a4f", "#d1b6a1"];

const OverviewTab = () => {
	const { data: overviewData } = useGetOverviewMetricsAnalyticsQuery();

	const { data: trendsData } = useGetBookingTrendsAnalyticsQuery();
	const { data: statusDistribution } = useGetStatusDistributionAnalyticsQuery();

	return (
		<TabsContent value="overview" className="space-y-6">
			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<MetricCard
					title="Total Bookings"
					value={overviewData?.bookings.total}
					change={overviewData?.bookings.growth}
					icon={Calendar}
				/>
				<MetricCard
					title="Total Revenue"
					value={overviewData?.revenue.total}
					change={overviewData?.revenue.growth}
					icon={DollarSign}
					prefix="₱"
				/>
				<MetricCard
					title="This Month"
					change={overviewData?.bookings.growth}
					value={overviewData?.bookings.thisMonth}
					icon={TrendingUp}
				/>
				<MetricCard
					title="Net Revenue"
					change={overviewData?.bookings.growth}
					value={overviewData?.revenue.netRevenue}
					icon={DollarSign}
					prefix="₱"
				/>
			</div>

			{/* Booking Status Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-[#bfa89b]/20 border-[#bfa89b]/40">
					<CardContent className="pt-6">
						<div className="text-2xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.pending} bookings
						</div>
						<div className="text-sm text-[#6b5a4f]/80">Pending</div>
					</CardContent>
				</Card>

				<Card className="bg-[#9c7c6a]/20 border-[#9c7c6a]/40">
					<CardContent className="pt-6">
						<div className="text-2xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.confirmed} bookings
						</div>
						<div className="text-sm text-[#6b5a4f]/80">Confirmed</div>
					</CardContent>
				</Card>

				<Card className="bg-[#d1b6a1]/20 border-[#d1b6a1]/40">
					<CardContent className="pt-6">
						<div className="text-2xl font-bold text-[#846e62]">
							{overviewData?.bookings.ongoing} bookings
						</div>
						<div className="text-sm text-[#846e62]/80">Ongoing</div>
					</CardContent>
				</Card>

				<Card className="bg-[#a7a29c]/20 border-[#a7a29c]/40">
					<CardContent className="pt-6">
						<div className="text-2xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.today} bookings
						</div>
						<div className="text-sm text-[#6b5a4f]/80">Today</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Booking Trends (Last 6 Months)</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<AreaChart data={trendsData!}>
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
									tickFormatter={(value) => `${value} bkgs`}
									className="text-2xs text-nowrap"
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
									labelFormatter={(month) => {
										const months = [
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
										return months[month - 1] || "";
									}}
								/>
								<Legend />
								<Area
									type="monotone"
									dataKey="Total Bookings"
									stroke="#846e62"
									fill="#846e62"
									fillOpacity={0.6}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Status Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={statusDistribution!}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ status, percentage }) =>
										`${status}: ${percentage}%`
									}
									outerRadius={80}
									fill="#8884d8"
									dataKey="count"
								>
									{statusDistribution?.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
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
									formatter={(value, name, props) => [
										`${value} bookings`, // value text
										props.payload.status, // label text
									]}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</TabsContent>
	);
};

export default OverviewTab;
