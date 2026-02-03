import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	TrendingUp,
	Users,
	DollarSign,
	Calendar,
	Clock,
	CrownIcon,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { TabsContent } from "@/core/components/base/tabs";
import { useGetCustomerInsightAnalyticsQuery } from "../queries/getCustomerInsightAnalytics.query";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useGetBookingHeatmapAnalyticsQuery } from "../queries/getBookingHeatmapAnalytics.query";
import { useGetPeakHoursAnalyticsQuery } from "../queries/getPeakHoursAnalytics.query";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import { useState } from "react";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import { AnalyticsDateFilter } from "@/core/components/custom/AnalyticsDateFilter";

const CUSTOMERS_PER_PAGE = 5;

const CustomerTab = () => {
	const { data: customersInsights } = useGetCustomerInsightAnalyticsQuery();
	const { data: bookingHeatmapData } = useGetBookingHeatmapAnalyticsQuery();
	const { data: peakHoursData } = useGetPeakHoursAnalyticsQuery();

	const [customersPage, setCustomersPage] = useState(1);

	const totalCustomerPages = Math.ceil(
		(customersInsights?.topCustomers?.length || 0) / CUSTOMERS_PER_PAGE
	);

	const paginatedCustomers = customersInsights?.topCustomers?.slice(
		(customersPage - 1) * CUSTOMERS_PER_PAGE,
		customersPage * CUSTOMERS_PER_PAGE
	);

	const totalBookings =
		bookingHeatmapData?.reduce((sum, day) => sum + day.bookingCount, 0) || 0;

	const totalRevenue =
		bookingHeatmapData?.reduce((sum, day) => sum + day.netRevenue, 0) || 0;

	const avgBookingsPerDay = bookingHeatmapData?.length
		? (totalBookings / bookingHeatmapData.length).toFixed(1)
		: "0.0";

	const maxBookingDay = bookingHeatmapData?.length
		? bookingHeatmapData.reduce(
				(max, day) => (day.bookingCount > max.bookingCount ? day : max),
				bookingHeatmapData[0]
		  )
		: null;

	const maxBookings = bookingHeatmapData?.length
		? Math.max(...bookingHeatmapData.map((d) => d.bookingCount))
		: 0;

	// Peak hours calculations
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const peakHoursDataMap = new Map();
	peakHoursData?.forEach((item) => {
		const key = `${item._id.dayOfWeek}-${item._id.hour}`;
		peakHoursDataMap.set(key, item);
	});
	const maxPeakBookings = peakHoursData?.length
		? Math.max(...peakHoursData.map((d) => d.bookingCount))
		: 0;
	const totalPeakBookings =
		peakHoursData?.reduce((sum, d) => sum + d.bookingCount, 0) || 0;
	const totalPeakRevenue =
		peakHoursData?.reduce((sum, d) => sum + d.netRevenue, 0) || 0;
	const peakHour = peakHoursData?.length
		? peakHoursData.reduce(
				(max, d) => (d.bookingCount > max.bookingCount ? d : max),
				peakHoursData[0]
		  )
		: null;

	const formatHour = (hour: number) => {
		if (hour === 0) return "12AM";
		if (hour < 12) return `${hour}AM`;
		if (hour === 12) return "12PM";
		return `${hour - 12}PM`;
	};

	const getIntensityColor = (count: number) => {
		if (!count) return "bg-gray-50 hover:bg-gray-100";
		const intensity = count / maxPeakBookings;
		if (intensity < 0.25) return "bg-secondary/40 hover:bg-secondary/50";
		if (intensity < 0.5) return "bg-secondary hover:bg-secondary/90";
		if (intensity < 0.75) return "bg-[#584941] hover:bg-[#584941]/90";
		return "bg-primary hover:bg-primary/90";
	};

	const getTextColor = (count: number) => {
		if (!count) return "text-gray-400";
		const intensity = count / maxPeakBookings;
		return intensity >= 0.5 ? "text-white" : "text-gray-700";
	};

	return (
		<TabsContent value="customers" className="space-y-6">
			<AnalyticsDateFilter />

			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Top Customers</CardTitle>
					<CardDescription>Highest spending customers</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{paginatedCustomers?.map((customer, idx) => {
							const rank = idx + 1 + (customersPage - 1) * CUSTOMERS_PER_PAGE;

							return (
								<div
									key={idx}
									className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
								>
									{" "}
									<div className="flex items-center gap-3">
										<div className="flex items-center justify-center p-3 py-2 rounded-full relative">
											<Label className="text-2xs relative text-foreground">
												{rank <= 3 && (
													<CrownIcon
														className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10"
														fill={
															rank === 1
																? "#FFD700"
																: rank === 2
																? "#C0C0C0"
																: "#CD7F32"
														}
														strokeWidth={1}
													/>
												)}
												<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
													{rank}.
												</span>
											</Label>
										</div>
										<div className="flex items-center gap-3">
											<Avatar className="ml-4">
												<AvatarImage
													src={customer.profileImage}
													alt="@shadcn"
													className="size-10 "
												/>
												<AvatarFallback>
													{getInitials(customer.customerName)}
												</AvatarFallback>
											</Avatar>

											<div>
												<div className="font-semibold">
													{customer.customerName}
												</div>
												<div className="text-sm text-gray-600">
													{customer.email}
												</div>
											</div>
										</div>
									</div>
									<div className="flex justify-evenly items-center gap-6">
										<div className="text-right">
											<div className="text-sm text-gray-600">
												Total no. of Bookings
											</div>
											<div className="font-semibold">
												{customer.totalBookings}
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">Total Spent</div>
											<div className="font-semibold">
												{formatToPeso(String(customer.totalSpent ?? 0))}
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm text-gray-600">Net Value</div>
											<div className="font-semibold text-green-500 ">
												{formatToPeso(String(customer.netSpent ?? 0))}
											</div>
										</div>
									</div>
								</div>
							);
						})}

						<div className="flex justify-between items-center pt-4">
							<div className="text-sm text-muted-foreground">
								Page {customersPage} of {totalCustomerPages}
							</div>

							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									disabled={customersPage === 1}
									onClick={() => setCustomersPage((p) => Math.max(1, p - 1))}
								>
									Previous
								</Button>

								<Button
									variant="outline"
									size="sm"
									disabled={customersPage === totalCustomerPages}
									onClick={() =>
										setCustomersPage((p) => Math.min(totalCustomerPages, p + 1))
									}
								>
									Next
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Revenue by Customer Booking Frequency</CardTitle>
						<CardDescription>
							How much revenue comes from one-time vs. repeat customers
						</CardDescription>
					</CardHeader>

					<CardContent>
						{/* Chart */}
						<ResponsiveContainer width="100%" height={350}>
							<BarChart
								data={customersInsights?.customerSegments?.map((segment) => ({
									segment: `${segment._id} Booking${
										segment._id > 1 ? "s" : ""
									}`,
									customers: segment.customers,
									totalRevenue: segment.totalRevenue,
									refundedAmount: segment.refundedAmount,
									netRevenue: segment.netRevenue,
								}))}
								margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis
									dataKey="segment"
									tick={{ fill: "#6b7280", fontSize: 12 }}
								/>
								<YAxis
									tick={{ fill: "#6b7280", fontSize: 12 }}
									tickFormatter={(value) => `₱${value.toLocaleString()}`}
									label={{
										angle: -90,
										position: "insideLeft",
										fill: "#6b7280",
									}}
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
									content={({ active, payload, label }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload;
											return (
												<div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
													<p className="font-semibold text-gray-900 mb-2">
														{label}
													</p>
													<p className="text-sm text-gray-600 mb-2">
														<Users className="inline w-4 h-4 mr-1" />
														{data.customers} customer
														{data.customers !== 1 ? "s" : ""}
													</p>
													<div className="space-y-1 text-sm">
														<p className="text-primary">
															Total Revenue: {formatToPeso(data.totalRevenue)}
														</p>
														<p className="text-[#584941]">
															Refunded: {formatToPeso(data.refundedAmount)}
														</p>
														<p className="text-secondary font-semibold">
															Net Revenue: {formatToPeso(data.netRevenue)}
														</p>
													</div>
												</div>
											);
										}
										return null;
									}}
								/>
								<Legend
									wrapperStyle={{ paddingTop: "20px", fontSize: 11 }}
									iconType="square"
								/>

								<Bar
									dataKey="totalRevenue"
									fill="#846e62"
									name="Total Revenue"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="netRevenue"
									fill="#a7a29c"
									name="Net Revenue"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="refundedAmount"
									fill="#584941"
									name="Refunded Amount"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>

						{/* Key Insights */}
						<div className="mt-6 p-4 bg-primary/20 border border-primary/60 rounded-lg">
							<h4 className="font-semibold text-gray-700 text-sm mb-2">
								💡 Key Insight
							</h4>
							<p className="text-sm text-gray-700/90">
								{(() => {
									const segments = customersInsights?.customerSegments || [];

									// Separate one-time and repeat customers
									const oneTime = segments.find((s) => s._id === 1);
									const repeat = segments.filter((s) => s._id > 1);

									// Compute totals
									const oneTimeRevenue = oneTime?.netRevenue || 0;
									const repeatRevenue = repeat.reduce(
										(sum, s) => sum + (s.netRevenue || 0),
										0
									);

									// Compute difference and direction
									const diff = repeatRevenue - oneTimeRevenue;
									const percentage =
										oneTimeRevenue > 0
											? (Math.abs(diff) / oneTimeRevenue) * 100
											: 0;
									const trend = diff >= 0 ? "more" : "less";

									return (
										<>
											Your customers who book multiple times generate{" "}
											<span className="font-medium">
												{formatToPeso(String(repeatRevenue))} in net revenue
											</span>
											, which is{" "}
											<span className="font-medium">
												{percentage.toFixed(1)}% {trend}
											</span>{" "}
											than all one-time customers combined.{" "}
											{trend === "more"
												? "Focus on converting first-time bookers into repeat customers to maximize revenue."
												: "Consider strategies to increase repeat customer spending or retention."}
										</>
									);
								})()}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-0">
						<CardTitle>Booking Activity Heatmap</CardTitle>
						<CardDescription>
							Booking volume and revenue trends for the last 3 months
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col">
						{/* Summary Stats */}
						<div className="grid grid-cols-3 gap-4">
							<div className="bg-secondary/20 border-secondary/60 border-[1px] p-3 rounded-lg">
								<div className="flex items-center gap-2 text-secondary  text-xs font-medium mb-1">
									<Calendar className="w-4 h-4" />
									Total Bookings
								</div>
								<div className="text-2xl font-bold text-secondary ">
									{totalBookings}
								</div>
								<div className="text-xs text-secondary  mt-1">
									Avg: {avgBookingsPerDay}/day
								</div>
							</div>

							<div className=" flex flex-col justify-between bg-primary/40 border-secondary/80 border-[1px] p-3 rounded-lg">
								<div className="flex items-center gap-2 text-primary  text-xs font-medium mb-1">
									<DollarSign className="w-4 h-4" />
									Net Revenue
								</div>
								<div className="text-xl font-bold text-primary">
									{new Intl.NumberFormat("en-PH", {
										style: "currency",
										currency: "PHP",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(totalRevenue)}
								</div>
							</div>

							<div className="bg-[#a7a29c]/70 border-[#a7a29c]/90 border-[1px] p-3 rounded-lg">
								<div className="flex items-center gap-2 text-gray-700 text-xs font-medium mb-1">
									<TrendingUp className="w-4 h-4" />
									Peak Day
								</div>
								<div className="text-xl font-bold text-gray-700">
									{maxBookingDay?.bookingCount || 0}
								</div>
								<div className="text-xs text-gray-700 mt-1">
									{maxBookingDay &&
										new Date(maxBookingDay._id.date).toLocaleDateString(
											"en-US",
											{ month: "short", day: "numeric" }
										)}
								</div>
							</div>
						</div>

						{/* Heatmap Grid */}
						<div className="h-auto mt-8">
							{bookingHeatmapData && bookingHeatmapData.length > 0 ? (
								<div className="space-y-2">
									<div className="flex items-center gap-4 mb-2">
										<h4 className="text-sm font-semibold text-foreground">
											Booking Activities
										</h4>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<span>Less</span>
											<div className="flex gap-1">
												<div className="w-3 h-3 bg-gray-100 rounded border border-gray-300"></div>
												<div className="w-3 h-3 bg-secondary/40 rounded"></div>
												<div className="w-3 h-3 bg-secondary rounded"></div>
												<div className="w-3 h-3 bg-[#584941] rounded"></div>
												<div className="w-3 h-3 bg-primary rounded"></div>
											</div>
											<span>More</span>
										</div>
									</div>

									<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
										{bookingHeatmapData.map((day, index) => {
											const intensity = day.bookingCount / maxBookings;
											const bgColor =
												intensity === 0
													? "bg-gray-100"
													: intensity < 0.25
													? "bg-secondary/40"
													: intensity < 0.5
													? "bg-secondary"
													: intensity < 0.75
													? "bg-[#584941]"
													: "bg-primary";
											const textColor =
												intensity >= 0.5 ? "text-[#f2f2f2]" : "text-gray-700";

											return (
												<div
													key={index}
													className={`${bgColor} p-4 rounded-lg transition-all hover:scale-105 hover:shadow-lg cursor-pointer`}
												>
													<div
														className={`${textColor} text-xs font-medium mb-1`}
													>
														{new Date(day._id.date).toLocaleDateString(
															"en-US",
															{
																weekday: "short",
															}
														)}
													</div>
													<div
														className={`${textColor} text-lg font-bold mb-1`}
													>
														{new Date(day._id.date).toLocaleDateString(
															"en-US",
															{
																month: "short",
																day: "numeric",
															}
														)}
													</div>
													<div
														className={`${textColor} text-sm font-semibold mb-2`}
													>
														{day.bookingCount} booking
														{day.bookingCount !== 1 ? "s" : ""}
													</div>
													<div className={`${textColor} text-xs opacity-90`}>
														{new Intl.NumberFormat("en-PH", {
															style: "currency",
															currency: "PHP",
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														}).format(day.netRevenue)}
													</div>
													{day.refundedAmount > 0 && (
														<div
															className={`${textColor} text-xs opacity-75 mt-1`}
														>
															⚠️{" "}
															{new Intl.NumberFormat("en-PH", {
																style: "currency",
																currency: "PHP",
																minimumFractionDigits: 0,
																maximumFractionDigits: 0,
															}).format(day.refundedAmount)}{" "}
															refunded
														</div>
													)}
												</div>
											);
										})}
									</div>
								</div>
							) : (
								<div className="text-center py-8 text-gray-500">
									No booking data available
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Peak Hours Heatmap */}
			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Peak Booking Hours</CardTitle>
					<CardDescription>
						Booking activity by day and time of day
					</CardDescription>
				</CardHeader>

				<CardContent>
					{/* Summary Stats */}
					<div className="grid grid-cols-3 gap-4 mb-6">
						<div className="flex flex-col bg-secondary/20 border-secondary/60 border-[1px] p-3 rounded-lg">
							<div className="flex items-center gap-2 text-secondary text-xs font-medium mb-1">
								<Calendar className="w-4 h-4" />
								Total Bookings
							</div>
							<div className="text-2xl font-bold text-secondary mt-auto">
								{totalPeakBookings}
							</div>
						</div>

						<div className="flex flex-col justify-between bg-primary/40 border-secondary/80 border-[1px] p-3 rounded-lg">
							<div className="flex items-center gap-2 text-primary text-xs font-medium mb-1">
								<TrendingUp className="w-4 h-4" />
								Net Revenue
							</div>
							<div className="text-xl font-bold text-primary">
								{new Intl.NumberFormat("en-PH", {
									style: "currency",
									currency: "PHP",
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								}).format(totalPeakRevenue)}
							</div>
						</div>

						<div className="bg-[#a7a29c]/70 border-[#a7a29c]/90 border-[1px] p-3 rounded-lg">
							<div className="flex items-center gap-2 text-gray-700 text-xs font-medium mb-1">
								<Clock className="w-4 h-4" />
								Peak Hour
							</div>
							<div className="text-xl font-bold text-gray-700">
								{peakHour && formatHour(peakHour._id.hour)}
							</div>
							<div className="text-xs text-gray-700 mt-1">
								{peakHour && daysOfWeek[peakHour._id.dayOfWeek]}
							</div>
						</div>
					</div>

					{/* Heatmap */}
					{peakHoursData && peakHoursData.length > 0 ? (
						<div className="space-y-2">
							<div className="flex items-center gap-4 mb-2">
								<h4 className="text-sm font-semibold text-foreground">
									Hour × Day Heatmap
								</h4>
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<span>Less</span>
									<div className="flex gap-1">
										<div className="w-3 h-3 bg-gray-50 rounded border border-gray-300"></div>
										<div className="w-3 h-3 bg-secondary/40 rounded"></div>
										<div className="w-3 h-3 bg-secondary rounded"></div>
										<div className="w-3 h-3 bg-[#584941] rounded"></div>
										<div className="w-3 h-3 bg-primary rounded"></div>
									</div>
									<span>More</span>
								</div>
							</div>

							{/* Scrollable container for the heatmap */}
							<div className="overflow-visible">
								<div className="inline-block min-w-full">
									{/* Day headers */}
									<div className="flex mb-1">
										<div className="w-16 flex-shrink-0"></div>
										{daysOfWeek.map((day, index) => (
											<div
												key={index}
												className="w-20 text-center text-xs font-semibold text-foreground"
											>
												{day}
											</div>
										))}
									</div>

									{/* Hour rows - only show hours with data */}
									{hours
										.filter((hour) =>
											peakHoursData.some((d) => d._id.hour === hour)
										)
										.map((hour) => (
											<div key={hour} className="flex mb-1">
												<div className="w-16 flex-shrink-0 text-xs text-foreground flex items-center">
													{formatHour(hour)}
												</div>
												{daysOfWeek.map((_, dayIndex) => {
													const key = `${dayIndex}-${hour}`;
													const data = peakHoursDataMap.get(key);
													const count = data?.bookingCount || 0;

													return (
														<div
															key={dayIndex}
															className={`w-20 h-12 ${getIntensityColor(
																count
															)} rounded transition-all cursor-pointer relative group mx-0.5`}
														>
															{count > 0 && (
																<>
																	<div
																		className={`${getTextColor(
																			count
																		)} text-xs font-bold absolute inset-0 flex items-center justify-center`}
																	>
																		{count}
																	</div>
																	{/* Tooltip */}
																	<div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-[9999]">
																		<div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
																			<div className="font-semibold mb-1">
																				{daysOfWeek[dayIndex]}{" "}
																				{formatHour(hour)}
																			</div>
																			<div>
																				{count} booking{count !== 1 ? "s" : ""}
																			</div>
																			<div className="text-green-300">
																				{new Intl.NumberFormat("en-PH", {
																					style: "currency",
																					currency: "PHP",
																					minimumFractionDigits: 0,
																					maximumFractionDigits: 0,
																				}).format(data.netRevenue)}
																			</div>
																			{data.refundedAmount > 0 && (
																				<div className="text-red-300 text-[10px]">
																					⚠️{" "}
																					{new Intl.NumberFormat("en-PH", {
																						style: "currency",
																						currency: "PHP",
																						minimumFractionDigits: 0,
																						maximumFractionDigits: 0,
																					}).format(data.refundedAmount)}{" "}
																					refunded
																				</div>
																			)}
																		</div>
																	</div>
																</>
															)}
														</div>
													);
												})}
											</div>
										))}
								</div>
							</div>
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							No peak hours data available
						</div>
					)}

					{/* Insights */}
					{peakHour && (
						<div className="mt-6 p-4 bg-primary/20 border border-primary/60 rounded-lg">
							<h4 className="font-semibold text-gray-700 text-sm mb-2">
								💡 Key Insights
							</h4>
							<div className="text-sm text-gray-700/90 space-y-1">
								<p>
									• <strong>Busiest time:</strong>{" "}
									{daysOfWeek[peakHour._id.dayOfWeek]} at{" "}
									{formatHour(peakHour._id.hour)} with {peakHour.bookingCount}{" "}
									booking{peakHour.bookingCount !== 1 ? "s" : ""}
								</p>
								<p>
									• <strong>Revenue hotspot:</strong>{" "}
									{new Intl.NumberFormat("en-PH", {
										style: "currency",
										currency: "PHP",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(peakHour.netRevenue)}{" "}
									generated during peak hour
								</p>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default CustomerTab;
