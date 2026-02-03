import React from "react";
import { Calendar, X } from "lucide-react";
import { useAnalyticsFilterStore } from "@/ami/features/analytics/stores/useAnalyticsFilterStore";

export const AnalyticsDateFilter: React.FC = () => {
	const { dateFilter, setYear, setMonth, setDateRange, clearDateFilter } =
		useAnalyticsFilterStore();

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 3 }, (_, i) => currentYear - i);
	const months = [
		{ value: 1, label: "January" },
		{ value: 2, label: "February" },
		{ value: 3, label: "March" },
		{ value: 4, label: "April" },
		{ value: 5, label: "May" },
		{ value: 6, label: "June" },
		{ value: 7, label: "July" },
		{ value: 8, label: "August" },
		{ value: 9, label: "September" },
		{ value: 10, label: "October" },
		{ value: 11, label: "November" },
		{ value: 12, label: "December" },
	];

	const hasFilters =
		dateFilter.year ||
		dateFilter.month ||
		dateFilter.startDate ||
		dateFilter.endDate;

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
			<div className="flex items-center gap-3 mb-3">
				<Calendar className="h-5 w-5 text-[#846e62]" />
				<h3 className="font-semibold text-[#6b5a4f]">Date Filter</h3>
			</div>

			<div className="flex flex-wrap gap-3 items-end">
				{/* Year Filter */}
				<div className="flex-1 min-w-[140px]">
					<label className="block text-xs font-medium text-gray-600 mb-1">
						Year
					</label>
					<select
						value={dateFilter.year || ""}
						onChange={(e) =>
							setYear(e.target.value ? Number(e.target.value) : undefined)
						}
						className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#846e62] focus:border-transparent"
					>
						<option value="">All Years</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				{/* Month Filter */}
				<div className="flex-1 min-w-[140px]">
					<label className="block text-xs font-medium text-gray-600 mb-1">
						Month
					</label>
					<select
						value={dateFilter.month || ""}
						onChange={(e) =>
							setMonth(e.target.value ? Number(e.target.value) : undefined)
						}
						className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#846e62] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
						disabled={!dateFilter.year}
					>
						<option value="">All Months</option>
						{months.map((month) => (
							<option key={month.value} value={month.value}>
								{month.label}
							</option>
						))}
					</select>
				</div>

				<div className="hidden sm:block border-l border-gray-300 h-10 mx-2" />

				{/* Start Date */}
				<div className="flex-1 min-w-[140px]">
					<label className="block text-xs font-medium text-gray-600 mb-1">
						Start Date
					</label>
					<input
						type="date"
						value={dateFilter.startDate || ""}
						onChange={(e) =>
							setDateRange(e.target.value || undefined, dateFilter.endDate)
						}
						className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#846e62] focus:border-transparent"
					/>
				</div>

				{/* End Date */}
				<div className="flex-1 min-w-[140px]">
					<label className="block text-xs font-medium text-gray-600 mb-1">
						End Date
					</label>
					<input
						type="date"
						value={dateFilter.endDate || ""}
						onChange={(e) =>
							setDateRange(dateFilter.startDate, e.target.value || undefined)
						}
						className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#846e62] focus:border-transparent"
					/>
				</div>

				{/* Clear Button */}
				{hasFilters && (
					<button
						onClick={clearDateFilter}
						className="flex items-center gap-2 px-4 py-2 bg-[#846e62] text-white text-sm rounded-md hover:bg-[#6b5a4f] transition-colors"
					>
						<X className="h-4 w-4" />
						Clear
					</button>
				)}
			</div>

			{/* Active Filter Display */}
			{hasFilters && (
				<div className="mt-3 pt-3 border-t border-gray-200">
					<p className="text-xs text-gray-600">
						<span className="font-medium">Active filter:</span>{" "}
						{dateFilter.year && `Year ${dateFilter.year}`}
						{dateFilter.month &&
							` - ${months.find((m) => m.value === dateFilter.month)?.label}`}
						{dateFilter.startDate && ` from ${dateFilter.startDate}`}
						{dateFilter.endDate && ` to ${dateFilter.endDate}`}
					</p>
				</div>
			)}
		</div>
	);
};
