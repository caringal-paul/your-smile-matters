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
import { JSX, useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Spinner } from "@/core/components/base/spinner";

const COLORS = ["#846e62", "#9c7c6a", "#bfa89b", "#6b5a4f", "#d1b6a1"];

type WeatherData = {
	temperature_2m: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	precipitation: number;
	weather_code: number;
	wind_speed_10m: number;
	rain_probability?: number;
};

const OverviewTab = () => {
	const { data: overviewData } = useGetOverviewMetricsAnalyticsQuery();
	const { data: trendsData } = useGetBookingTrendsAnalyticsQuery();
	const { data: statusDistribution } = useGetStatusDistributionAnalyticsQuery();

	// Clock state
	const [currentTime, setCurrentTime] = useState(new Date());
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		// Fetch weather data for Manila, Philippines
		const fetchWeather = async () => {
			try {
				// Added precipitation_probability_max to the API call
				const response = await fetch(
					"https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&timezone=Asia%2FSingapore"
				);
				const data = await response.json();

				// Get current hour's rain probability
				const currentHour = new Date().getHours();
				const rainProbability =
					data.hourly.precipitation_probability[currentHour];

				setWeather({
					...data.current,
					rain_probability: rainProbability,
				});
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch weather:", error);
				setLoading(false);
			}
		};

		fetchWeather();
		// Refresh weather every 30 minutes
		const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);
		return () => clearInterval(weatherInterval);
	}, []);

	const getWeatherIcon = (code: number): JSX.Element => {
		if (code === 0) return <Sun className="h-8 w-8 text-yellow-500" />;
		if (code <= 3) return <Cloud className="h-8 w-8 text-gray-400" />;
		if (code <= 67) return <CloudRain className="h-8 w-8 text-blue-500" />;
		return <Wind className="h-8 w-8 text-gray-500" />;
	};

	const getWeatherDescription = (code: number): string => {
		if (code === 0) return "Clear sky";
		if (code <= 3) return "Partly cloudy";
		if (code <= 67) return "Rainy";
		if (code <= 77) return "Snowy";
		return "Stormy";
	};
	return (
		<TabsContent value="overview" className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="flex flex-col justify-center p-6 md:col-span-2 ">
					{loading ? (
						<div className="flex flex-row gap-2 items-center mx-auto text-center text-gray-400">
							<Spinner />
							Loading weather...
						</div>
					) : weather ? (
						<>
							<div className="flex items-center justify-center gap-4 mb-3">
								{getWeatherIcon(weather.weather_code)}
								<div className="text-4xl font-bold">
									{Math.round(weather.temperature_2m)}°C
								</div>
							</div>

							<div className="text-center text-gray-600 text-sm mb-4">
								{getWeatherDescription(weather.weather_code)}
							</div>

							<div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-200">
								<div className="text-center">
									<Droplets className="h-4 w-4 text-blue-500 mx-auto mb-1" />
									<div className="text-xs text-gray-600">Humidity</div>
									<div className="text-sm font-semibold">
										{weather.relative_humidity_2m}%
									</div>
								</div>
								<div className="text-center">
									<Wind className="h-4 w-4 text-sky-500 mx-auto mb-1" />
									<div className="text-xs text-gray-600">Wind</div>
									<div className="text-sm font-semibold">
										{Math.round(weather.wind_speed_10m)} km/h
									</div>
								</div>
								<div className="text-center">
									<Eye className="h-4 w-4 text-sky-300 mx-auto mb-1" />
									<div className="text-xs text-gray-600">Feels Like</div>
									<div className="text-sm font-semibold">
										{Math.round(weather.apparent_temperature)}°C
									</div>
								</div>
								<div className="text-center">
									<CloudRain className="h-4 w-4 text-blue-600 mx-auto mb-1" />
									<div className="text-xs text-gray-600">Rain</div>
									<div className="text-sm font-semibold">
										{weather.rain_probability ?? 0}%
									</div>
								</div>
							</div>

							<div className="text-center text-gray-400 text-[10px] mt-3">
								Manila, Philippines
							</div>
						</>
					) : (
						<div className="text-center text-gray-400">Weather unavailable</div>
					)}
				</Card>

				<Card className="flex flex-col justify-center p-6">
					<div className="text-3xl font-bold text-center">
						{currentTime.toLocaleTimeString()}
					</div>
					<div className="text-gray-400 mt-1 text-center text-sm">
						{currentTime.toLocaleDateString(undefined, {
							weekday: "long",
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</div>

					<div className="mt-4 text-center pt-4 border-t border-gray-200">
						<div className="text-gray-600 text-xs">
							Comparing last 30 days vs previous 30 days
						</div>
						<div className="text-gray-500 text-[10px] mt-1">
							Rolling period for accurate metrics
						</div>
					</div>
				</Card>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<MetricCard
					title="Total Bookings"
					value={overviewData?.bookings.total}
					description="bookings"
					icon={Calendar}
					subTitle="All time"
				/>

				<MetricCard
					title="Last 30 Days"
					value={overviewData?.bookings.last30Days}
					description="bookings for the last 30 days"
					icon={TrendingUp}
					subTitle="Rolling period"
				/>
				<MetricCard
					title="Net Revenue"
					value={overviewData?.revenue.netRevenue}
					description="revenue generated"
					icon={DollarSign}
					prefix="₱"
					subTitle="All time"
				/>
				<MetricCard
					title="Net Revenue (30d)"
					value={overviewData?.revenue.last30Days}
					change={overviewData?.revenue.growth}
					icon={DollarSign}
					prefix="₱"
					subTitle="Last 30 days"
				/>
			</div>

			{/* Secondary Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Card className="bg-gradient-to-br from-[#bfa89b]/10 to-[#bfa89b]/5 border-[#bfa89b]/20">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80">This Month</div>
							<Calendar className="h-4 w-4 text-[#6b5a4f]/60" />
						</div>
						<div className="text-2xl font-bold text-[#6b5a4f] my-auto">
							{overviewData?.bookings.thisMonth}
						</div>
						<div className="text-xs text-[#6b5a4f]/60 mt-1">bookings</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-[#9c7c6a]/10 to-[#9c7c6a]/5 border-[#9c7c6a]/20">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80">Average Value</div>
							<DollarSign className="h-4 w-4 text-[#6b5a4f]/60" />
						</div>
						<div className="text-2xl font-bold text-[#6b5a4f] my-auto">
							{formatToPeso(String(overviewData?.revenue.average))}
						</div>
						<div className="text-xs text-[#6b5a4f]/60 mt-1">per booking</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-[#a7a29c]/10 to-[#a7a29c]/5 border-[#a7a29c]/20">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80">Total Refunds</div>
							<DollarSign className="h-4 w-4 text-[#6b5a4f]/60" />
						</div>
						<div className="text-2xl font-bold text-[#6b5a4f] my-auto">
							{formatToPeso(String(overviewData?.revenue.totalRefunds))}
						</div>
						<div className="text-xs text-[#6b5a4f]/60 mt-1">refunded</div>
					</CardContent>
				</Card>
			</div>

			{/* Booking Status Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-[#bfa89b]/20 border-[#bfa89b]/40 hover:bg-[#bfa89b]/30 transition-colors">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80 font-medium">
								Pending
							</div>
							<div className="h-2 w-2 rounded-full bg-[#bfa89b] animate-pulse" />
						</div>
						<div className="text-3xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.pending}
							<span className="text-xs ml-1 lg:text-sm">bookings</span>
						</div>
						<div className="text-xs text-[#6b5a4f]/70 mt-1">
							awaiting confirmation
						</div>
					</CardContent>
				</Card>

				<Card className="bg-[#9c7c6a]/20 border-[#9c7c6a]/40 hover:bg-[#9c7c6a]/30 transition-colors">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80 font-medium">
								Confirmed
							</div>
							<div className="h-2 w-2 rounded-full bg-[#9c7c6a]" />
						</div>
						<div className="text-3xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.confirmed}{" "}
							<span className="text-xs ml-1 lg:text-sm">bookings</span>
						</div>
						<div className="text-xs text-[#6b5a4f]/70 mt-1">ready to go</div>
					</CardContent>
				</Card>

				<Card className="bg-[#d1b6a1]/20 border-[#d1b6a1]/40 hover:bg-[#d1b6a1]/30 transition-colors">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#846e62]/80 font-medium">
								Ongoing
							</div>
							<div className="h-2 w-2 rounded-full bg-[#d1b6a1] animate-pulse" />
						</div>
						<div className="text-3xl font-bold text-[#846e62]">
							{overviewData?.bookings.ongoing}
							<span className="text-xs ml-1 lg:text-sm">bookings</span>
						</div>
						<div className="text-xs text-[#846e62]/70 mt-1">in progress</div>
					</CardContent>
				</Card>

				<Card className="bg-[#a7a29c]/20 border-[#a7a29c]/40 hover:bg-[#a7a29c]/30 transition-colors">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-[#6b5a4f]/80 font-medium">Today</div>
							<div className="h-2 w-2 rounded-full bg-[#a7a29c]" />
						</div>
						<div className="text-3xl font-bold text-[#6b5a4f]">
							{overviewData?.bookings.today}
							<span className="text-xs ml-1 lg:text-sm">bookings</span>
						</div>
						<div className="text-xs text-[#6b5a4f]/70 mt-1">scheduled</div>
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
									label={({
										cx,
										cy,
										midAngle,
										outerRadius,
										status,
										percentage,
									}) => {
										const RADIAN = Math.PI / 180;
										const radius = outerRadius + 15; // 👈 offset label outside
										const x = cx + radius * Math.cos(-midAngle * RADIAN);
										const y = cy + radius * Math.sin(-midAngle * RADIAN);

										return (
											<text
												x={x}
												y={y}
												fill="#333"
												textAnchor={x > cx ? "start" : "end"}
												dominantBaseline="central"
												fontSize={10} // 👈 make it smaller
												className="text-[10px]" // optional Tailwind fallback
											>
												{`${status}: ${percentage}%`}
											</text>
										);
									}}
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
