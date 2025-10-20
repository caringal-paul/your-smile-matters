import { useState, useMemo } from "react";
import { Button } from "@/core/components/base/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Column } from "@/core/types/column.types";

type SortOrder = "none" | "asc" | "desc";

type OrderTableProps<T> = {
	data: T[];
	columns: Column<T>[];
	onRowAction?: (item: T) => void;
	actionLabel?: string;
	rowsPerPageOptions?: number[];
	defaultRowsPerPage?: number;
};

const CustomerDataTable = <T extends Record<string, any>>({
	data,
	columns,
	onRowAction,
	actionLabel = "Details",
	rowsPerPageOptions = [5, 10, 20, 50],
	defaultRowsPerPage = 10,
}: OrderTableProps<T>) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
	const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("none");

	// Sort data
	const sortedData = useMemo(() => {
		if (!sortColumn || sortOrder === "none") {
			return [...data];
		}

		const columnConfig = columns.find((col) => col.key === sortColumn);
		if (!columnConfig) return [...data];

		return [...data].sort((a, b) => {
			if (columnConfig.sortFn) {
				return columnConfig.sortFn(a, b, sortOrder as "asc" | "desc");
			}

			const aValue = a[sortColumn];
			const bValue = b[sortColumn];

			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortOrder === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});
	}, [data, sortColumn, sortOrder, columns]);

	// Pagination
	const totalItems = sortedData.length;
	const totalPages = Math.ceil(totalItems / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
	const paginatedData = sortedData.slice(startIndex, endIndex);

	const handleSort = (column: keyof T) => {
		if (sortColumn !== column) {
			setSortColumn(column);
			setSortOrder("asc");
		} else {
			if (sortOrder === "asc") {
				setSortOrder("desc");
			} else if (sortOrder === "desc") {
				setSortOrder("none");
				setSortColumn(null);
			} else {
				setSortOrder("asc");
			}
		}
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="w-full">
			<div className="overflow-x-auto scrollbar-small bg-white rounded-lg border-none">
				<table className="w-full">
					<thead>
						<tr className="shadow-sm drop-shadow-sm">
							{columns.map(({ key, label, sortable }) => (
								<th
									key={String(key)}
									className={`px-4 py-4 text-left text-sm font-semibold text-foreground ${
										sortable ? "cursor-pointer hover:bg-gray-50" : ""
									}`}
									onClick={() => sortable && handleSort(key)}
								>
									<div className="flex items-center gap-2 whitespace-nowrap">
										{label}
										{sortable && sortColumn === key && (
											<span className="text-xs">
												{sortOrder === "asc"
													? "↑"
													: sortOrder === "desc"
													? "↓"
													: ""}
											</span>
										)}
									</div>
								</th>
							))}
							{onRowAction && (
								<th className="px-4 py-2 text-left text-sm font-semibold text-foreground">
									Action
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{paginatedData.length > 0 ? (
							paginatedData.map((item, index) => (
								<tr
									key={index}
									className="border-b border-gray-100 hover:bg-gray-50 transition-colors odd:bg-secondary/10"
								>
									{columns.map(({ key, render }) => (
										<td
											key={String(key)}
											className="px-4 py-2 text-xs text-foreground"
										>
											{render
												? render(item[key], item)
												: String(item[key] || "-")}
										</td>
									))}
									{onRowAction && (
										<td className="px-6 py-4">
											<Button
												onClick={() => onRowAction(item)}
												className="bg-primary hover:bg-red-600 text-white px-6 py-2 rounded text-sm font-medium"
											>
												{actionLabel}
											</Button>
										</td>
									)}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length + (onRowAction ? 1 : 0)}
									className="px-6 py-8 text-center text-gray-500"
								>
									No data available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-xs text-foreground">Rows per page:</span>
					<Select
						value={String(rowsPerPage)}
						onValueChange={(value) => {
							setRowsPerPage(Number(value));
							setCurrentPage(1);
						}}
					>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{rowsPerPageOptions.map((option) => (
									<SelectItem key={option} value={String(option)}>
										{option}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<span className="text-2xs text-foreground">
						{startIndex + 1}-{endIndex} of {totalItems}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</Button>

					{/* Page numbers */}
					<div className="flex gap-1">
						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							let pageNum;
							if (totalPages <= 5) {
								pageNum = i + 1;
							} else if (currentPage <= 3) {
								pageNum = i + 1;
							} else if (currentPage >= totalPages - 2) {
								pageNum = totalPages - 4 + i;
							} else {
								pageNum = currentPage - 2 + i;
							}

							return (
								<Button
									key={pageNum}
									variant={currentPage === pageNum ? "default" : "outline"}
									size="sm"
									onClick={() => handlePageChange(pageNum)}
									className={
										currentPage === pageNum
											? "bg-primary hover:bg-primary/80"
											: ""
									}
								>
									{pageNum}
								</Button>
							);
						})}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CustomerDataTable;
