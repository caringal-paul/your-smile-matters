import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import { Checkbox } from "@/core/components/base/checkbox";
import { Button } from "@/core/components/base/button";
import FilterIcon from "@/ami/shared/assets/icons/FilterIcon";
import { Label } from "@/core/components/base/label";
import { Fragment } from "react/jsx-runtime";
import { FilterOptions } from "@/ami/shared/types/filter.types";
import { Separator } from "../../../../core/components/base/separator";
import {
	RadioGroup,
	RadioGroupItem,
} from "../../../../core/components/base/radio-group";
import DateInput from "../input/DateInput";
import { getFormattedToday } from "@/ami/shared/helpers/formatDate";
import { useState } from "react";

type TableFilterProps<T> = {
	filters: T;
	setFilters: React.Dispatch<React.SetStateAction<T>>;
	filterOptions?: FilterOptions<T>;
	hasDateFilter?: boolean;
	dateFilter?: {
		type: "Today" | "Last 7 days" | "Last 30 days" | "Custom" | null;
		startDate?: string;
		endDate?: string;
	};
	setDateFilter?: React.Dispatch<
		React.SetStateAction<{
			type: "Today" | "Last 7 days" | "Last 30 days" | "Custom" | null;
			startDate?: string;
			endDate?: string;
		}>
	>;
	onApply: () => void;
};

const TableFilter = <T extends Record<string, string[]>>({
	filters,
	setFilters,
	filterOptions,
	hasDateFilter = false,
	dateFilter,
	setDateFilter,
	onApply,
}: TableFilterProps<T>) => {
	const [startDate, setStartDate] = useState<string>(
		new Date().toISOString().split("T")[0]
	);
	const [endDate, setEndDate] = useState<string>(
		new Date().toISOString().split("T")[0]
	);

	return (
		<Popover>
			<PopoverTrigger className="h-fit">
				<Button
					variant="ghost"
					className="hover:bg-none hover:text-foreground disabled:bg-red-500"
				>
					<FilterIcon fill="#2D2F2F" className="w-4 h-4" />
					<span className="hidden sm:inline">Filter</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="flex flex-col gap-4 bg-white w-fit right-10"
			>
				{!filterOptions ? null : (
					<>
						{Object.entries(filterOptions).map(
							([key, values], index, array) => {
								const isLast = index === array.length - 1;

								return (
									<Fragment key={key}>
										<div className="space-y-2">
											<Label className="text-base font-semibold">
												{key
													.replace(/_/g, " ")
													.replace(
														/\w\S*/g,
														(txt) =>
															txt.charAt(0).toUpperCase() +
															txt.slice(1).toLowerCase()
													)}
											</Label>

											{values.map((value, idx) => (
												<div
													key={`${value}-${idx}`}
													className="flex justify-between items-center min-w-[238px]"
												>
													<Label className="text-xs font-normal">{value}</Label>

													<Checkbox
														checked={filters[key as keyof T]?.includes(value)}
														onCheckedChange={(checked) => {
															setFilters((prev) => {
																const prevValues = prev[key as keyof T] || [];

																const updatedValues = checked
																	? [...prevValues, value]
																	: prevValues.filter((v) => v !== value);

																return {
																	...prev,
																	[key]: updatedValues,
																};
															});
														}}
													/>
												</div>
											))}
										</div>

										{!isLast && <Separator />}
									</Fragment>
								);
							}
						)}
					</>
				)}

				{hasDateFilter && dateFilter && setDateFilter && (
					<>
						{filterOptions && <Separator />}
						<div className="space-y-2">
							<Label className="text-base font-semibold">Date</Label>

							<RadioGroup
								value={dateFilter.type ?? ""}
								onValueChange={(value) => {
									setDateFilter({
										type: dateFilter.type === value ? null : (value as any),
									});
								}}
							>
								{["Today", "Last 7 days", "Last 30 days", "Custom"].map(
									(option) => {
										return (
											<div
												key={option}
												className="flex items-center justify-between"
											>
												<Label className="text-xs font-normal">{option}</Label>
												<RadioGroupItem
													value={option}
													checked={dateFilter.type === option}
													onClick={() => {
														if (dateFilter.type === option) {
															setDateFilter((prev) => ({
																...prev,
																type: null,
															}));
														}
													}}
												/>
											</div>
										);
									}
								)}
							</RadioGroup>

							<div className="flex justify-between w-full max-w-full gap-2">
								<DateInput
									onChange={(date) => {
										setStartDate(date);
									}}
									placeholder="Choose event date"
									initialDate={getFormattedToday()}
									isButtonDisabled={dateFilter.type !== "Custom"}
								/>

								<DateInput
									onChange={(date) => {
										setEndDate(date);
									}}
									placeholder="Choose event date"
									initialDate={getFormattedToday()}
									isButtonDisabled={dateFilter.type !== "Custom"}
								/>
							</div>
						</div>
					</>
				)}

				<Button
					className="w-full"
					onClick={() => {
						if (hasDateFilter && dateFilter && setDateFilter) {
							setDateFilter({
								...dateFilter,
								startDate: startDate,
								endDate: endDate,
							});
						}
						onApply();
					}}
				>
					Apply Filter
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default TableFilter;
