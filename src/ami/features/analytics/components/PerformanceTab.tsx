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
import { Star } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { TabsContent } from "@/core/components/base/tabs";
import { useGetPackagePerformanceAnalyticsQuery } from "../queries/getPackagePerformanceAnalytics.query";
import { useGetPhotographerPerformanceAnalyticsQuery } from "../queries/getPhotographerPerformanceAnalytics.query";
import { useGetTopServicesAnalyticsQuery } from "../queries/getTopServicesAnalytics.query";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";

const PerformanceTab = () => {
	const { data: topServices } = useGetTopServicesAnalyticsQuery();
	const { data: photographerPerformance } =
		useGetPhotographerPerformanceAnalyticsQuery();
	const { data: packagePerformance } = useGetPackagePerformanceAnalyticsQuery();

	return (
		<TabsContent value="performance" className="space-y-6">
			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Top Services</CardTitle>
					<CardDescription>
						Best performing photography services
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={350}>
						<BarChart data={topServices!}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="serviceName" />
							<YAxis />
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
							/>
							<Legend />
							<Bar dataKey="totalRevenue" fill="#846e62" name="Revenue" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Photographer Performance</CardTitle>
					<CardDescription>Top performers by net revenue</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{photographerPerformance?.map((photographer, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
							>
								<div className="flex items-center gap-3">
									<Avatar className="ml-4">
										<AvatarImage
											src={
												photographer.profileImage ||
												"/sf/ysm-profile-fallback.jpg"
											}
											alt="@shadcn"
											className="size-10 "
										/>
										<AvatarFallback>
											{getInitials(photographer.photographerName)}
										</AvatarFallback>
									</Avatar>

									<div>
										<div className="font-semibold">
											{photographer.photographerName}
										</div>
										<div className="text-sm text-gray-600">
											{photographer.email}
										</div>
									</div>
								</div>

								<div className="flex items-center gap-6">
									<div className="text-right">
										<div className="text-sm text-gray-600">Bookings</div>
										<div className="font-semibold">
											{photographer.totalBookings}
										</div>
									</div>
									<div className="text-right">
										<div className="text-sm text-gray-600">Completion Rate</div>
										<div className="font-semibold text-green-600">
											{photographer.completionRate.toFixed(1)}%
										</div>
									</div>
									<div className="text-right">
										<div className="text-sm text-gray-600">Net Revenue</div>
										<div className="font-semibold">
											₱{photographer.netRevenue.toLocaleString()}
										</div>
									</div>
									<div className="flex items-center gap-1">
										<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
										<span className="font-semibold">
											{photographer.averageRating}
										</span>
										<span className="text-sm text-gray-500">
											({photographer.totalRatings})
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Package Performance</CardTitle>
					<CardDescription>Revenue by photography packages</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={packagePerformance?.packageStats}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="packageName"
								className="text-xs text-nowrap text-primary"
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
							/>
							<Legend />
							<Bar dataKey="netRevenue" fill="#a7a29c" name="Net Revenue" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

export default PerformanceTab;
