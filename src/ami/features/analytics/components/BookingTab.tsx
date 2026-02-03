import {
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
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
import { useGetStatusDistributionAnalyticsQuery } from "../queries/getStatusDistributionAnalytics.query";
import { useGetPackagePerformanceAnalyticsQuery } from "../queries/getPackagePerformanceAnalytics.query";
import { useGetCancellationAnalyticsQuery } from "../queries/getCancellationAnalytics.query";
import { AnalyticsDateFilter } from "@/core/components/custom/AnalyticsDateFilter";

const COLORS = ["#846e62", "#9c7c6a", "#bfa89b", "#846e62", "#d1b6a1"];

const BookingTab = () => {
	const { data: cancellationData } = useGetCancellationAnalyticsQuery();
	const { data: packagePerformance } = useGetPackagePerformanceAnalyticsQuery();
	const { data: statusDistribution } = useGetStatusDistributionAnalyticsQuery();

	return (
		<TabsContent value="bookings" className="space-y-6">
			<AnalyticsDateFilter />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Booking Status Breakdown</CardTitle>
						<CardDescription>Revenue by booking status</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={350}>
							<BarChart data={statusDistribution!}>
								<CartesianGrid strokeDasharray="3 3" stroke="#846e62" />{" "}
								{/* subtle warm line */}
								<XAxis
									dataKey="status"
									stroke="#846e62" // axis label color
									tick={{ fill: "#846e62", fontSize: 12 }}
								/>
								<YAxis
									stroke="#846e62"
									tick={{ fill: "#846e62", fontSize: 12 }}
									tickFormatter={(value) => `${value.toLocaleString()}₱`}
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
								/>
								<Legend
									verticalAlign="top"
									align="right"
									wrapperStyle={{ color: "#846e62", fontSize: 13 }}
								/>
								<Bar
									dataKey="netRevenue"
									fill="#846e62"
									name="Net Revenue"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="refundedAmount"
									fill="#a7a29c"
									name="Refunds"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Package vs Custom Bookings</CardTitle>
						<CardDescription>Booking type distribution</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={350}>
							<PieChart>
								<Pie
									data={packagePerformance?.bookingTypes}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ cx, cy, midAngle, outerRadius, _id, count }) => {
										const RADIAN = Math.PI / 180;
										const radius = outerRadius + 15; // 👈 distance from pie
										const x = cx + radius * Math.cos(-midAngle * RADIAN);
										const y = cy + radius * Math.sin(-midAngle * RADIAN);

										return (
											<text
												x={x}
												y={y}
												fill="#846e62"
												textAnchor={x > cx ? "start" : "end"}
												dominantBaseline="central"
												fontSize={12} // 👈 smaller text
												className="text-[12px]" // optional Tailwind style
											>
												{`${_id}: ${count}`}
											</text>
										);
									}}
									outerRadius={100}
									fill="#846e62"
									dataKey="count"
								>
									{packagePerformance?.bookingTypes?.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												[
													"#846e62", // primary
													"#a7a29c", // secondary
													"#b9b1a9",
													"#c7beb7",
													"#d9d1ca", // lightest
												][index % 5]
											}
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
										props.payload._id, // label text
									]}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Cancellation Analysis</CardTitle>
					<CardDescription>
						Cancellation rate: {cancellationData?.cancellationRate}%
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={cancellationData?.cancellationReasons}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="_id"
								tick={false} // Hide the X-axis labels
							/>
							<YAxis
								tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
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
									marginBottom: "4px", // Optional: add spacing
								}}
							/>

							<Bar
								dataKey="count" // the key in your data that holds number of cancellations
								fill="#584941"
								name="Number of Cancellations" // This appears in tooltip & legend
							/>
							<Legend
								verticalAlign="bottom"
								height={36}
								wrapperStyle={{
									fontSize: 12,
									fontWeight: 500,
									color: "#6b7280",
								}}
							/>
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default BookingTab;
