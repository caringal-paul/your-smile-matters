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
import { CrownIcon, Star } from "lucide-react";
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
import { useState } from "react";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import { AnalyticsDateFilter } from "@/core/components/custom/AnalyticsDateFilter";

const ITEMS_PER_PAGE = 5;

const PerformanceTab = () => {
	const { data: topServices } = useGetTopServicesAnalyticsQuery();
	const { data: packagePerformance } = useGetPackagePerformanceAnalyticsQuery();
	const { data: photographerPerformance } =
		useGetPhotographerPerformanceAnalyticsQuery();

	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(
		(photographerPerformance?.length || 0) / ITEMS_PER_PAGE
	);

	const paginatedPhotographers = photographerPerformance?.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	return (
		<TabsContent value="performance" className="space-y-6">
			<AnalyticsDateFilter />

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
							<XAxis
								dataKey="serviceName"
								stroke="#846e62"
								tick={false} // Hide the X-axis labels
							/>
							<YAxis
								tickFormatter={(value) => `${value.toLocaleString()}₱`}
								stroke="#846e62"
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
									marginBottom: "4px", // Optional: add spacing
								}}
								formatter={(value: number, name: string) => [
									`₱${value.toLocaleString()}`,
									name,
								]}
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
					<CardDescription>
						Top performers by <span className="font-semibold">Net Revenue</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{paginatedPhotographers?.map((photographer, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
							>
								<div className="flex items-center gap-3">
									<div
										className={`flex items-center justify-center p-3 py-2 rounded-full relative`}
									>
										<Label className={`text-2xs relative text-foreground`}>
											{idx < 3 && (
												<CrownIcon
													className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 `}
													fill={
														idx === 0
															? "#FFD700"
															: idx === 1
															? "#C0C0C0"
															: "#CD7F32"
													}
													strokeWidth={1}
												/>
											)}
											<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
												{idx + 1 + (currentPage - 1) * ITEMS_PER_PAGE}.{" "}
											</span>
										</Label>
									</div>
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

					<div className="flex justify-between items-center pt-4">
						<div className="text-sm text-muted-foreground">
							Page {currentPage} of {totalPages}
						</div>

						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							>
								Previous
							</Button>

							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === totalPages}
								onClick={() =>
									setCurrentPage((p) => Math.min(totalPages, p + 1))
								}
							>
								Next
							</Button>
						</div>
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
								tick={false} // Hide the X-axis labels
								className="text-xs text-nowrap text-red-500"
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
									display: "block", // Change this from "none" to "block"
									color: "#846e62",
									fontWeight: 600,
									marginBottom: "4px",
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
