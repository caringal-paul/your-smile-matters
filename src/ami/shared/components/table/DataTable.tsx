import { useState, useMemo } from "react";
import SortIcon from "@/ami/shared/assets/icons/SortIcon";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/core/components/base/accordion";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Column } from "@/core/types/column.types";

import { SortOrder } from "@/ami/shared/types/sort.types";
import { Button } from "../../../../core/components/base/button";
import SortAscending from "@/ami/shared/assets/icons/SortAscending";
import SortDescending from "@/ami/shared/assets/icons/SortDescending";
import ArrowUpDown from "@/ami/shared/assets/icons/ArrowUpDown";
import { formatToProperText } from "@/ami/shared/helpers/formatToProperText";
import parse from "html-react-parser";
import { PaginationControls } from "./PaginationControls";
import { cn } from "@/core/lib/utils";

type TableProps<T> = {
	data: T[];
	columns: Column<T>[];
	descriptionPriorityKey?: Extract<keyof T, string>;
	dataRowLimit?: number;
	hasPagination?: boolean;
	isHeadless?: boolean;
	isDraggable?: boolean;
	className?: string;
	isColumnsCompressed?: boolean;
};

const DataTable = <T extends Record<string, any>>({
	data,
	columns,
	descriptionPriorityKey,
	dataRowLimit,
	hasPagination = true,
	isHeadless = false,
	isDraggable = false,
	className,
	isColumnsCompressed = false,
}: TableProps<T>) => {
	// Pagination states
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(
		dataRowLimit ? dataRowLimit : 10
	);

	const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("none");

	// Get displayed data with sorting applied
	// Using useMemo to only recompute this when dependencies change
	const displayData = useMemo(() => {
		if (!sortColumn || sortOrder === "none") {
			// Return indexes in original order if no sorting
			return data.map((_, index) => index);
		}

		// Find the column configuration for sorting
		const columnConfig = columns.find((col) => col.key === sortColumn);
		if (!columnConfig) return data.map((_, index) => index);

		// Create array of indexes and sort it based on the data
		return [...data.keys()].sort((aIndex, bIndex) => {
			const a = data[aIndex];
			const b = data[bIndex];

			// If custom sort function is provided, use it
			if (columnConfig.sortFn) {
				return columnConfig.sortFn(a, b, sortOrder);
			}

			// Default sorting logic
			const aValue = a[sortColumn];
			const bValue = b[sortColumn];

			// Handle different data types
			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortOrder === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			// For numbers and other types
			if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});
	}, [data, sortColumn, sortOrder, columns]);

	// Pagination calculations
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

	// Get paginated data indexes
	const paginatedIndexes = displayData.slice(startIndex, endIndex);

	// Map back to actual data items
	const paginatedData = paginatedIndexes.map((index) => data[index]);

	const handleSort = (column: keyof T | null) => {
		// Cycle through sort states: none -> asc -> desc -> none
		if (sortColumn !== column) {
			setSortColumn(column);
			setSortOrder("asc");
		} else {
			if (sortOrder === "none") {
				setSortOrder("asc");
			} else if (sortOrder === "asc") {
				setSortOrder("desc");
			} else {
				// Reset to no sorting
				setSortOrder("none");
				setSortColumn(null);
			}
		}

		// Reset to first page when sorting changes
		setCurrentPage(1);
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	// Find the highest priority column to use as the main display in accordion header
	const getPriorityColumn = (columns: Column<T>[]) => {
		const priorityColumn = columns.reduce(
			(prev, current) =>
				(current.priority || 0) > (prev.priority || 0) ? current : prev,
			columns[0]
		);
		return priorityColumn;
	};

	const priorityColumn = getPriorityColumn(columns);
	const priority1Column =
		columns.find((col) => col.priority === 1) ?? columns[0];

	const priority2Column =
		columns.find((col) => col.priority === 2) ??
		(columns.length > 1 ? columns[1] : undefined);

	const SortIconWithState = ({
		isActive,
		order,
	}: {
		isActive: boolean;
		order: SortOrder;
	}) => {
		if (!isActive || order === "none") {
			return <SortIcon fill="#2D2F2F" className="h-5 w-5" />;
		}

		return (
			<div className="relative h-5 w-5">
				<SortIcon
					fill="#2D2F2F"
					className={`h-5 w-5 absolute top-0 left-0 ${
						order === "asc" ? "" : "rotate-180"
					}`}
				/>
				<div className="absolute inset-0 bg-gray-400 opacity-20 rounded-full"></div>
			</div>
		);
	};

	return (
		<div>
			<div
				className={cn(
					`${
						!isDraggable && "hidden"
					} xl:block w-[calc(100vw-340px)] max-w-[calc(100vw-260px)] rounded-xl border-[1.5px] border-table overflow-scroll scrollbar-small`,
					className
				)}
			>
				<table className="w-full rounded-xl">
					{!isHeadless && (
						<thead className="border-b-[1.5px] border-table">
							<tr className="bg-accent">
								{columns.map(({ key, label, sortable }) => (
									<th
										key={String(key)}
										className={`border-none  py-2 text-left ${
											sortable ? "cursor-pointer" : ""
										} ${
											key == "id"
												? "pl-8 pr-0"
												: `${isColumnsCompressed ? "px-4" : "px-8"} `
										}`}
										onClick={() => sortable && handleSort(key)}
									>
										<div className="flex flex-row gap-1 items-center">
											<div className="font-semibold text-xs whitespace-nowrap">
												{label}
											</div>
											{sortable && (
												<SortIconWithState
													isActive={sortColumn === key}
													order={sortColumn === key ? sortOrder : "none"}
												/>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
					)}
					<tbody>
						{paginatedData.length > 0 ? (
							paginatedData.map((item, index) => (
								<tr
									key={paginatedIndexes[index]} // Use the actual index from original data for stable keys
									className="odd:bg-white even:bg-accent-foreground"
								>
									{columns.map(({ key, render }) => (
										<td
											key={String(key)}
											className={`border-b-[.5px] border-table py-4 ${
												key == "id"
													? "pl-8 pr-0"
													: `${isColumnsCompressed ? "px-4" : "px-8"} `
											} `}
										>
											{render ? render(item[key], item) : String(item[key])}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className="text-center py-4 text-gray-500"
								>
									No results found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className={`${!isDraggable ? "xl:hidden" : "hidden"}  w-full`}>
				<div className="flex gap-4 items-center p-1">
					<Select
						onValueChange={(value) => {
							if (value == sortColumn) {
								setSortColumn(null);
								setSortOrder("none");
							} else {
								setSortColumn(value);
								setSortOrder("none");
							}
						}}
					>
						<SelectTrigger className="w-fit my-4 md:mt-0">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{columns
									.filter((col) => col.key != "action")
									.map((column) => {
										return (
											<SelectItem
												key={String(column.key)}
												value={String(column.key)}
											>
												Sort by {column.label}
											</SelectItem>
										);
									})}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Button
						className={`px-4 my-4 md:mt-0 hover:bg-accent disabled:text-foreground disabled:bg-transparent bg-transparent text-foreground shadow-sm active:shadow-inner ${
							sortOrder == "none"
								? "bg-transparent border-[1px] border-border"
								: "bg-accent border-[1px] border-gray-200/75"
						}`}
						disabled={sortColumn == null}
						onClick={() => {
							handleSort(sortColumn);
							setSortColumn(sortColumn);
						}}
					>
						{sortOrder == "none" && <ArrowUpDown />}
						{sortOrder == "desc" && <SortDescending />}
						{sortOrder == "asc" && <SortAscending />}
					</Button>
				</div>

				{paginatedData.length > 0 ? (
					<Accordion type="single" collapsible className="w-full">
						{paginatedData.map((item, index) => (
							<AccordionItem
								key={paginatedIndexes[index]} // Use the actual index from original data for stable keys
								value={`item-${paginatedIndexes[index]}`}
								className={`border border-table rounded-md mb-2 ${
									index % 2 === 0 ? "bg-white" : "bg-accent-foreground"
								}`}
							>
								<AccordionTrigger className="px-4 py-3 hover:no-underline">
									<div className="flex justify-between w-full items-center">
										<div className="flex flex-col text-left">
											{/* First line (priority 1 or fallback to columns[0]) */}
											{priority1Column && (
												<span className="font-medium">
													{priority1Column.render
														? priority1Column.render(
																item[priority1Column.key],
																item
														  )
														: String(item[priority1Column.key])}
												</span>
											)}

											{/* Second line (priority 2 or fallback to columns[1]), ensure it's not a duplicate */}
											{priority2Column &&
												priority2Column.key !== priority1Column?.key && (
													<div className="text-xs flex gap-1 text-gray-500 max-w-[22em] sm:max-w-full">
														<span>{priority2Column.label}:</span>
														<span className="truncate rich-text">
															{priority2Column.render
																? priority2Column.render(
																		item[priority2Column.key],
																		item
																  )
																: parse(String(item[priority2Column.key]))}
														</span>
													</div>
												)}
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-4 pb-3">
									<div className="space-y-2">
										{columns.map(({ key, label, render }) => (
											<>
												{key == "id" ? null : (
													<div
														key={String(key)}
														className={`grid grid-cols-3 gap-2 ${
															key == "id" && "absolute top-2 left-2"
														}`}
													>
														<div className="font-medium text-xs">{label}:</div>
														<div className="col-span-2">
															{render
																? render(item[key], item)
																: String(item[key])}
														</div>
													</div>
												)}
											</>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				) : (
					<div className="text-center py-4 text-gray-500 border border-table rounded-md">
						No results found.
					</div>
				)}
			</div>

			<PaginationControls
				currentPage={currentPage}
				totalPages={totalPages}
				startIndex={startIndex}
				endIndex={endIndex}
				totalItems={totalItems}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={(value) => {
					setRowsPerPage(value);
					setCurrentPage(1);
				}}
				onPageChange={handlePageChange}
				dataRowLimit={dataRowLimit}
				show={hasPagination}
			/>
		</div>
	);
};

export default DataTable;
