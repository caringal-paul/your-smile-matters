import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import { Button } from "../../../../../core/components/base/button";
import { formatDisplayDate } from "@/ami/shared/helpers/formatDate";

interface DateInputProps {
	onChange?: (date: string) => void;
	placeholder?: string;
	initialDate?: string;
	isButtonDisabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
	onChange,
	placeholder = "Select date...",
	initialDate = "",
	isButtonDisabled = true,
}) => {
	const [date, setDate] = useState<string>(initialDate);
	const [month, setMonth] = useState<number>(
		initialDate
			? parseInt(initialDate.split("-")[1]) - 1
			: new Date().getMonth()
	);
	const [year, setYear] = useState<number>(
		initialDate ? parseInt(initialDate.split("-")[0]) : new Date().getFullYear()
	);
	const [open, setOpen] = useState<boolean>(false);
	const [showMonthSelect, setShowMonthSelect] = useState<boolean>(false);
	const [showYearSelect, setShowYearSelect] = useState<boolean>(false);

	const months: string[] = [
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

	const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	// Generate list of years (20 years before and after current year)
	const currentYear: number = new Date().getFullYear();
	const years: number[] = Array.from(
		{ length: 41 },
		(_, i) => currentYear - 20 + i
	);

	const getDaysInMonth = (month: number, year: number): number => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (month: number, year: number): number => {
		return new Date(year, month, 1).getDay();
	};

	const handlePrevMonth = (): void => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}
	};

	const handleNextMonth = (): void => {
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}
	};

	const handleDateSelect = (day: number): void => {
		const selectedDate = new Date(year, month, day);
		const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD format
		setDate(formattedDate);
		if (onChange) {
			onChange(formattedDate);
		}
		setOpen(false);
	};

	// Generate calendar days
	const renderCalendarDays = (): React.ReactNode[] => {
		const daysInMonth = getDaysInMonth(month, year);
		const firstDay = getFirstDayOfMonth(month, year);
		const days: React.ReactNode[] = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
		}

		// Add cells for each day of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const isCurrentDate =
				date ===
				`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
					2,
					"0"
				)}`;
			days.push(
				<button
					key={day}
					onClick={() => handleDateSelect(day)}
					className={`w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-accent ${
						isCurrentDate
							? "bg-primary text-white hover:bg-primary"
							: "hover:bg-accent"
					}`}
				>
					{day}
				</button>
			);
		}

		return days;
	};

	return (
		<div className="w-full max-w-md">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						className="w-auto text-xs font-normal text-foreground hover:bg-accent bg-transparent border-text border-[1px] shadow-none rounded-sm disabled:bg-disabled-disable"
						disabled={isButtonDisabled}
					>
						<span className={`${!date ? "text-gray-400" : "text-gray-900"}`}>
							{date ? formatDisplayDate(date) : placeholder}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 bg-white" side="bottom">
					<div className="p-6">
						{/* Calendar header with dropdowns */}
						<div className="flex items-center justify-between mb-2 relative">
							<button
								onClick={handlePrevMonth}
								className="p-1 rounded-full hover:bg-accent"
							>
								<ChevronLeft className="h-5 w-5" />
							</button>

							<div className="flex space-x-1">
								{/* Month selector */}
								<div className="relative">
									<button
										onClick={() => {
											setShowMonthSelect(!showMonthSelect);
											setShowYearSelect(false);
										}}
										className="font-medium flex items-center hover:bg-accent px-2 py-1 rounded"
									>
										{months[month]}
										<ChevronDown className="h-4 w-4 ml-1" />
									</button>

									{showMonthSelect && (
										<div className="absolute z-10 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
											<div className="py-1">
												{months.map((monthName, idx) => (
													<button
														key={monthName}
														className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent ${
															idx === month
																? "bg-accent text-primary font-medium"
																: ""
														}`}
														onClick={() => {
															setMonth(idx);
															setShowMonthSelect(false);
														}}
													>
														{monthName}
													</button>
												))}
											</div>
										</div>
									)}
								</div>

								{/* Year selector */}
								<div className="relative">
									<button
										onClick={() => {
											setShowYearSelect(!showYearSelect);
											setShowMonthSelect(false);
										}}
										className="font-medium flex items-center hover:bg-accent px-2 py-1 rounded"
									>
										{year}
										<ChevronDown className="h-4 w-4 ml-1" />
									</button>

									{showYearSelect && (
										<div className="absolute z-10 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
											<div className="py-1">
												{years.map((yearNum) => (
													<button
														key={yearNum}
														className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent ${
															yearNum === year
																? "bg-accent text-primary font-medium"
																: ""
														}`}
														onClick={() => {
															setYear(yearNum);
															setShowYearSelect(false);
														}}
													>
														{yearNum}
													</button>
												))}
											</div>
										</div>
									)}
								</div>
							</div>

							<button
								onClick={handleNextMonth}
								className="p-1 rounded-full hover:bg-accent"
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>

						<div className="grid grid-cols-7 gap-1 mb-1">
							{weekDays.map((day) => (
								<div
									key={day}
									className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
								>
									{day}
								</div>
							))}
						</div>

						<div className="grid grid-cols-7 gap-x-[0px] gap-y-2">
							{renderCalendarDays()}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateInput;
