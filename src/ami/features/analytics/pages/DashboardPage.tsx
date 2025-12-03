import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/core/components/base/tabs";
import OverviewTab from "../components/OverviewTab";
import BookingTab from "../components/BookingTab";
import RevenueTab from "../components/RevenueTab";
import PerformanceTab from "../components/PerformanceTab";
import CustomerTab from "../components/CustomerTab";

export default function DashboardPage() {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="h-fit bg-background pb-8">
			<div className="max-w-full mx-auto">
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="space-y-6"
				>
					<TabsList className="p-1 shadow-sm bg-inherit">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="bookings">Bookings</TabsTrigger>
						<TabsTrigger value="revenue">Revenue</TabsTrigger>
						<TabsTrigger value="performance">Performance</TabsTrigger>
						<TabsTrigger value="customers">Customers</TabsTrigger>
					</TabsList>

					<OverviewTab />

					<BookingTab />

					<RevenueTab />

					<PerformanceTab />

					<CustomerTab />
				</Tabs>

				{/* Additional Insights Section */}
				{/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="border-l-4 border-l-blue-500">
						<CardContent className="pt-6">
							<div className="flex items-start gap-3">
								<Award className="w-8 h-8 text-blue-500" />
								<div>
									<div className="font-semibold">Best Performing Month</div>
									<div className="text-2xl font-bold text-blue-600">
										October 2025
									</div>
									<div className="text-sm text-gray-600">
										142 bookings, ₱390,250 net revenue
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-l-4 border-l-green-500">
						<CardContent className="pt-6">
							<div className="flex items-start gap-3">
								<TrendingUp className="w-8 h-8 text-green-500" />
								<div>
									<div className="font-semibold">Average Growth</div>
									<div className="text-2xl font-bold text-green-600">
										+18.5%
									</div>
									<div className="text-sm text-gray-600">
										Month over month increase
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-l-4 border-l-purple-500">
						<CardContent className="pt-6">
							<div className="flex items-start gap-3">
								<Users className="w-8 h-8 text-purple-500" />
								<div>
									<div className="font-semibold">Active Photographers</div>
									<div className="text-2xl font-bold text-purple-600">24</div>
									<div className="text-sm text-gray-600">
										96.2% avg completion rate
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div> */}
			</div>
		</div>
	);
}
