// import CalendarIcon from "@/ami/shared/assets/icons/CalendarIcon";
// import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";
// import { Button } from "@/core/components/base/button";
// import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

// import { Suspense, useState } from "react";
// import { AssetClassPieChart } from "../components/AssetClassPieChart";

// type BasicCardProps = {
// 	value: string;
// 	description: string;
// 	title: string;
// 	className: string;
// };

// const BasicCard = ({
// 	className,
// 	description,
// 	title,
// 	value,
// }: BasicCardProps) => {
// 	return (
// 		<div
// 			className={`h-[120px] w-full shadow-md border-[1px] p-4 rounded-lg  space-y-2 flex flex-col justify-between ${className}`}
// 		>
// 			<div>
// 				<h3 className="text-sm font-semibold">{title}</h3>
// 				<p className="text-[10px] text-gray-400">{description}</p>
// 			</div>
// 			<h1 className="text-2xl font-bold">{value}</h1>
// 		</div>
// 	);
// };

// const DashboardPage = () => {
// 	const [selectedRange, setSelectedRange] = useState<string | null>(null);

// 	const options = ["YTD", "MTD", "Today", "Custom"];

// 	const handleClick = (option: string) => {
// 		setSelectedRange((prev) => (prev === option ? null : option));
// 	};

// 	const today = new Date();
// 	const year = today.getFullYear();
// 	const month = today.getMonth();

// 	// Get dynamic dates
// 	const jan1 = new Date(year, 0, 1);
// 	const monthStart = new Date(year, month, 1);

// 	const formatDate = (date: Date) =>
// 		new Intl.DateTimeFormat("en-US", {
// 			month: "short",
// 			day: "numeric",
// 			year: "numeric",
// 		}).format(date);

// 	const rangeMessageMap: Record<string, string> = {
// 		YTD: `Displaying data from ${formatDate(jan1)} – ${formatDate(today)}.`,
// 		MTD: `Displaying data from ${formatDate(monthStart)} – ${formatDate(
// 			today
// 		)}.`,
// 		Today: `Displaying data for ${formatDate(today)} only.`,
// 		Custom: "Displaying data from custom date range.",
// 	};

// 	const infoMessage = selectedRange
// 		? rangeMessageMap[selectedRange]
// 		: "Displaying all data.";

// 	return (
// 		<Suspense fallback={<div>Loading...</div>}>
// 			<div className="space-y-4">
// 				<div className="flex gap-0 sm:gap-1 overflow-x-scroll scrollbar-small">
// 					{options.map((option) => (
// 						<Button
// 							key={option}
// 							onClick={() => handleClick(option)}
// 							className={`flex text-sm gap-1 h-fit w-fit py-[4px] px-3 rounded-full border-2 [&_svg]:size-5
// 								${
// 									selectedRange === option
// 										? "border-[#201F1F] bg-accent"
// 										: "border-transparent bg-transparent"
// 								}
// 								text-foreground shadow-none hover:bg-accent`}
// 						>
// 							<CalendarIcon className="h-6 w-6" />
// 							{option}
// 						</Button>
// 					))}
// 				</div>

// 				<div className="flex bg-accent text-[10px] md:text-xs gap-2 my-4 md:mt-0 md:mb-4 p-3 items-center rounded-md">
// 					<InfoIcon fill={"#1C1B1F"} className="h-3 w-3 md:h-4 md:w-4" />
// 					{infoMessage}
// 				</div>

// 				<div className="grid grid-cols-6 gap-4 pb-4 h-fit">
// 					{/* CARD 1 - 4 */}
// 					{/* E CHANGE THIS TO LOOPING BASED ON DATA */}
// 					<BasicCard
// 						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-1"
// 						description="Total registered users in the app"
// 						title="Total Customers"
// 						value="2,200"
// 					/>
// 					<BasicCard
// 						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-1"
// 						description="Total investment brands available"
// 						title="Total Brands"
// 						value="85"
// 					/>
// 					<BasicCard
// 						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-2"
// 						description="Total investment of all customers"
// 						title="Total Investment Value"
// 						value={`${formatToPeso("250000000")}`}
// 					/>
// 					<BasicCard
// 						className="row-span-1 col-span-6 sm:col-span-3 lg:col-span-3 2xl:col-span-2"
// 						description="Total no. of investments across all customers"
// 						title="Total Investment Count"
// 						value={`14,892`}
// 					/>

// 					{/* CARD 5 */}
// 					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-3 col-span-6 lg:col-span-3  space-y-2 flex flex-col h-fit">
// 						<div>
// 							<h3 className="text-sm font-semibold">
// 								Asset Class Distribution
// 							</h3>
// 							<p className="text-[10px] text-gray-400">
// 								This chart represents the breakdown of investments by asset
// 								class
// 							</p>
// 						</div>
// 						<div className="max-h-[325px] h-full">
// 							<AssetClassPieChart />
// 						</div>
// 					</div>

// 					{/* CARD 6 */}
// 					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-6 col-span-6 lg:col-span-3 space-y-6 flex flex-col">
// 						<div>
// 							<h3 className="text-sm font-semibold">
// 								Top 10 Investments Brands
// 							</h3>
// 							<p className="text-[10px] text-gray-400">
// 								Top-performing brands based on customer investments
// 							</p>
// 						</div>
// 						<div className="flex flex-col overflow-scroll max-h-[630px] h-full">
// 							{Array.from({ length: 10 }, (_, index) => (
// 								<div
// 									key={index}
// 									className={`p-4 ${
// 										index % 2 === 0 ? "bg-accent" : "bg-transparent"
// 									}`}
// 								>
// 									<div className="flex gap-4 text-2xs items-center w-full font-semibold">
// 										<div>{index + 1}</div>

// 										<div className="flex flex-col gap-1 w-full">
// 											<div className="flex w-full justify-between">
// 												Apple (50%)
// 												<span>{formatToPeso("500000")}</span>
// 											</div>
// 											<div
// 												className={`h-[10px] w-[50%] bg-gradient rounded-xs`}
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>

// 					{/* CARD 7 */}
// 					<div className=" w-full shadow-md border-[1px] p-4 rounded-lg row-span-3 col-span-6 lg:col-span-3 space-y-2 flex flex-col">
// 						<div>
// 							<h3 className="text-sm font-semibold">Top 5 Customers</h3>
// 							<p className="text-[10px] text-gray-400">
// 								Top 5 customers with the highest total investment value
// 							</p>
// 						</div>
// 						<div className="flex flex-col overflow-scroll max-h-[300px] h-full">
// 							{Array.from({ length: 5 }, (_, index) => (
// 								<div
// 									key={index}
// 									className={`p-4 ${
// 										index % 2 === 0 ? "bg-accent" : "bg-transparent"
// 									}`}
// 								>
// 									<div className="flex gap-4 text-2xs items-center w-full font-semibold">
// 										<div className="">{index + 1}</div>

// 										<div className="flex w-full justify-between">
// 											Jamir Esteseun
// 											<span>{formatToPeso("500000")}</span>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</Suspense>
// 	);
// };

// export default DashboardPage;

import React, { useState } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
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
import {
	TrendingUp,
	TrendingDown,
	Users,
	DollarSign,
	Calendar,
	Package,
	Star,
	Award,
	AlertCircle,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/core/components/base/tabs";
import OverviewTab from "../components/OverviewTab";
import BookingTab from "../components/BookingTab";
import RevenueTab from "../components/RevenueTab";
import PerformanceTab from "../components/PerformanceTab";
import CustomerTab from "../components/CustomerTab";

// Dummy data matching API responses

const overviewData = {
	bookings: {
		total: 1248,
		thisMonth: 142,
		today: 8,
		pending: 23,
		confirmed: 45,
		ongoing: 12,
		growth: 15.4,
	},
	revenue: {
		total: 3456789,
		thisMonth: 456789,
		average: 2770,
		growth: 22.8,
		totalDiscounts: 45678,
		totalRefunds: 12340,
		netRevenue: 3398771,
	},
};

const trendsData = [
	{
		_id: { year: 2025, month: 5 },
		totalBookings: 98,
		revenue: 271460,
		refundedAmount: 5200,
		netRevenue: 266260,
		confirmedBookings: 85,
		completedBookings: 75,
		cancelledBookings: 8,
	},
	{
		_id: { year: 2025, month: 6 },
		totalBookings: 112,
		revenue: 310240,
		refundedAmount: 4800,
		netRevenue: 305440,
		confirmedBookings: 95,
		completedBookings: 88,
		cancelledBookings: 9,
	},
	{
		_id: { year: 2025, month: 7 },
		totalBookings: 125,
		revenue: 346875,
		refundedAmount: 6100,
		netRevenue: 340775,
		confirmedBookings: 108,
		completedBookings: 98,
		cancelledBookings: 7,
	},
	{
		_id: { year: 2025, month: 8 },
		totalBookings: 135,
		revenue: 374625,
		refundedAmount: 5500,
		netRevenue: 369125,
		confirmedBookings: 118,
		completedBookings: 110,
		cancelledBookings: 10,
	},
	{
		_id: { year: 2025, month: 9 },
		totalBookings: 128,
		revenue: 355200,
		refundedAmount: 4200,
		netRevenue: 351000,
		confirmedBookings: 110,
		completedBookings: 105,
		cancelledBookings: 8,
	},
	{
		_id: { year: 2025, month: 10 },
		totalBookings: 142,
		revenue: 394050,
		refundedAmount: 3800,
		netRevenue: 390250,
		confirmedBookings: 125,
		completedBookings: 118,
		cancelledBookings: 6,
	},
];

const statusDistribution = [
	{
		status: "Completed",
		count: 856,
		revenue: 2376800,
		refundedAmount: 8500,
		netRevenue: 2368300,
		percentage: 68.59,
	},
	{
		status: "Confirmed",
		count: 245,
		revenue: 679750,
		refundedAmount: 2100,
		netRevenue: 677650,
		percentage: 19.63,
	},
	{
		status: "Pending",
		count: 87,
		revenue: 241290,
		refundedAmount: 0,
		netRevenue: 241290,
		percentage: 6.97,
	},
	{
		status: "Cancelled",
		count: 45,
		revenue: 124875,
		refundedAmount: 1200,
		netRevenue: 123675,
		percentage: 3.61,
	},
	{
		status: "Ongoing",
		count: 15,
		revenue: 41625,
		refundedAmount: 540,
		netRevenue: 41085,
		percentage: 1.2,
	},
];

const topServices = [
	{
		_id: "1",
		serviceName: "Wedding Photography",
		category: "Wedding",
		totalBookings: 345,
		totalQuantity: 345,
		totalRevenue: 1207500,
		averagePrice: 3500,
	},
	{
		_id: "2",
		serviceName: "Portrait Session",
		category: "Portrait",
		totalBookings: 289,
		totalQuantity: 289,
		totalRevenue: 433500,
		averagePrice: 1500,
	},
	{
		_id: "3",
		serviceName: "Event Coverage",
		category: "Event",
		totalBookings: 198,
		totalQuantity: 198,
		totalRevenue: 544500,
		averagePrice: 2750,
	},
	{
		_id: "4",
		serviceName: "Product Photography",
		category: "Commercial",
		totalBookings: 156,
		totalQuantity: 234,
		totalRevenue: 351000,
		averagePrice: 2250,
	},
	{
		_id: "5",
		serviceName: "Engagement Shoot",
		category: "Wedding",
		totalBookings: 134,
		totalQuantity: 134,
		totalRevenue: 268000,
		averagePrice: 2000,
	},
];

const photographerPerformance = [
	{
		_id: "1",
		photographerName: "John Anderson",
		email: "john@example.com",
		totalBookings: 156,
		completedBookings: 148,
		completionRate: 94.87,
		totalRevenue: 546000,
		refundedAmount: 3200,
		netRevenue: 542800,
		averageRating: 4.8,
		totalRatings: 142,
	},
	{
		_id: "2",
		photographerName: "Sarah Chen",
		email: "sarah@example.com",
		totalBookings: 142,
		completedBookings: 138,
		completionRate: 97.18,
		totalRevenue: 497000,
		refundedAmount: 2100,
		netRevenue: 494900,
		averageRating: 4.9,
		totalRatings: 135,
	},
	{
		_id: "3",
		photographerName: "Michael Torres",
		email: "michael@example.com",
		totalBookings: 128,
		completedBookings: 121,
		completionRate: 94.53,
		totalRevenue: 448000,
		refundedAmount: 4500,
		netRevenue: 443500,
		averageRating: 4.7,
		totalRatings: 118,
	},
	{
		_id: "4",
		photographerName: "Emily Watson",
		email: "emily@example.com",
		totalBookings: 119,
		completedBookings: 115,
		completionRate: 96.64,
		totalRevenue: 416500,
		refundedAmount: 1800,
		netRevenue: 414700,
		averageRating: 4.85,
		totalRatings: 112,
	},
];

const packagePerformance = {
	packageStats: [
		{
			_id: "1",
			packageName: "Premium Wedding Package",
			packagePrice: 5000,
			totalBookings: 89,
			totalRevenue: 445000,
			refundedAmount: 3200,
			netRevenue: 441800,
			averageRating: 4.9,
		},
		{
			_id: "2",
			packageName: "Standard Event Package",
			packagePrice: 2500,
			totalBookings: 134,
			totalRevenue: 335000,
			refundedAmount: 2100,
			netRevenue: 332900,
			averageRating: 4.7,
		},
		{
			_id: "3",
			packageName: "Portrait Plus",
			packagePrice: 1800,
			totalBookings: 98,
			totalRevenue: 176400,
			refundedAmount: 1500,
			netRevenue: 174900,
			averageRating: 4.8,
		},
	],
	bookingTypes: [
		{
			_id: "Package",
			count: 756,
			revenue: 2095920,
			refundedAmount: 7800,
			netRevenue: 2088120,
		},
		{
			_id: "Custom",
			count: 492,
			revenue: 1360869,
			refundedAmount: 4540,
			netRevenue: 1356329,
		},
	],
};

const cancellationData = {
	cancellationRate: 3.61,
	totalCancellations: 45,
	cancellationReasons: [
		{ _id: "Schedule Conflict", count: 15 },
		{ _id: "Found Another Photographer", count: 12 },
		{ _id: "Budget Constraints", count: 8 },
		{ _id: "Event Cancelled", count: 7 },
		{ _id: "Other", count: 3 },
	],
};

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

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

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
