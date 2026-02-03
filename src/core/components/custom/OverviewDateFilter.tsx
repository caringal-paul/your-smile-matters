// components/OverviewDateFilter.tsx

import React from "react";
import { Calendar, X, TrendingUp } from "lucide-react";
import { subDays, format } from "date-fns";
import { useAnalyticsFilterStore } from "@/ami/features/analytics/stores/useAnalyticsFilterStore";

export const OverviewDateFilter: React.FC = () => {
	const { dateFilter, setDateRange, clearDateFilter } =
		useAnalyticsFilterStore();

	const hasFilters = dateFilter.startDate || dateFilter.endDate;

	// Predefined 30-day periods
	const periods = [
		{
			label: "Last 30 Days",
			getValue: () => {
				const endDate = new Date();
				const startDate = subDays(endDate, 29);
				return {
					startDate: format(startDate, "yyyy-MM-dd"),
					endDate: format(endDate, "yyyy-MM-dd"),
				};
			},
		},
		{
			label: "Previous 30 Days",
			getValue: () => {
				const endDate = subDays(new Date(), 30);
				const startDate = subDays(endDate, 29);
				return {
					startDate: format(startDate, "yyyy-MM-dd"),
					endDate: format(endDate, "yyyy-MM-dd"),
				};
			},
		},
		{
			label: "30 Days Ago",
			getValue: () => {
				const endDate = subDays(new Date(), 60);
				const startDate = subDays(endDate, 29);
				return {
					startDate: format(startDate, "yyyy-MM-dd"),
					endDate: format(endDate, "yyyy-MM-dd"),
				};
			},
		},
		{
			label: "90 Days Ago",
			getValue: () => {
				const endDate = subDays(new Date(), 90);
				const startDate = subDays(endDate, 29);
				return {
					startDate: format(startDate, "yyyy-MM-dd"),
					endDate: format(endDate, "yyyy-MM-dd"),
				};
			},
		},
	];

	const handlePeriodSelect = (period: (typeof periods)[0]) => {
		const { startDate, endDate } = period.getValue();
		setDateRange(startDate, endDate);
	};

	const isActivePeriod = (period: (typeof periods)[0]) => {
		if (!dateFilter.startDate || !dateFilter.endDate) return false;
		const { startDate, endDate } = period.getValue();
		return dateFilter.startDate === startDate && dateFilter.endDate === endDate;
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-3">
					<TrendingUp className="h-5 w-5 text-[#846e62]" />
					<h3 className="font-semibold text-[#6b5a4f]">
						30-Day Period Comparison
					</h3>
				</div>

				{hasFilters && (
					<button
						onClick={clearDateFilter}
						className="flex items-center gap-2 px-3 py-1.5 bg-[#846e62] text-white text-xs rounded-md hover:bg-[#6b5a4f] transition-colors"
					>
						<X className="h-3 w-3" />
						Clear
					</button>
				)}
			</div>

			{/* Period Buttons */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{periods.map((period) => {
					const isActive = isActivePeriod(period);
					const { startDate, endDate } = period.getValue();

					return (
						<button
							key={period.label}
							onClick={() => handlePeriodSelect(period)}
							className={`
                p-3 rounded-lg border-2 transition-all text-left
                ${
									isActive
										? "border-[#846e62] bg-[#846e62]/10 shadow-sm"
										: "border-gray-200 hover:border-[#846e62]/50 hover:bg-gray-50"
								}
              `}
						>
							<div className="flex items-center gap-2 mb-1">
								<Calendar
									className={`h-4 w-4 ${
										isActive ? "text-[#846e62]" : "text-gray-400"
									}`}
								/>
								<div
									className={`text-xs font-semibold ${
										isActive ? "text-[#846e62]" : "text-gray-700"
									}`}
								>
									{period.label}
								</div>
							</div>
							<div className="text-[10px] text-gray-500">
								{format(new Date(startDate), "MMM d")} -{" "}
								{format(new Date(endDate), "MMM d, yyyy")}
							</div>
						</button>
					);
				})}
			</div>

			{/* Custom Date Range */}
			<div className="mt-4 pt-4 border-t border-gray-200">
				<div className="text-xs font-medium text-gray-600 mb-2">
					Or select custom 30-day period:
				</div>
				<div className="flex flex-wrap gap-3 items-end">
					<div className="flex-1 min-w-[180px]">
						<label className="block text-xs font-medium text-gray-600 mb-1">
							Start Date
						</label>
						<input
							type="date"
							value={dateFilter.startDate || ""}
							onChange={(e) => {
								if (e.target.value) {
									const start = new Date(e.target.value);
									const end = subDays(start, -29); // 30 days after start
									setDateRange(
										format(start, "yyyy-MM-dd"),
										format(end, "yyyy-MM-dd")
									);
								}
							}}
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#846e62] focus:border-transparent"
						/>
					</div>

					<div className="flex-1 min-w-[180px]">
						<label className="block text-xs font-medium text-gray-600 mb-1">
							End Date (30 days after start)
						</label>
						<input
							type="date"
							value={dateFilter.endDate || ""}
							disabled
							className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
						/>
					</div>
				</div>

				<div className="mt-2 text-[10px] text-gray-500">
					💡 Select a start date to automatically set a 30-day period
				</div>
			</div>

			{/* Active Filter Display */}
			{hasFilters && (
				<div className="mt-3 pt-3 border-t border-gray-200">
					<p className="text-xs text-gray-600">
						<span className="font-medium text-[#846e62]">Active period:</span>{" "}
						{format(new Date(dateFilter.startDate!), "MMM dd, yyyy")} to{" "}
						{format(new Date(dateFilter.endDate!), "MMM dd, yyyy")}
						<span className="text-gray-400 ml-2">(30 days)</span>
					</p>
				</div>
			)}
		</div>
	);
};
