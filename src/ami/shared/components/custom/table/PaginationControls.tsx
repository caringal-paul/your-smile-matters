import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationControlsProps = {
	currentPage: number;
	totalPages: number;
	startIndex: number;
	endIndex: number;
	totalItems: number;
	rowsPerPage: number;
	onRowsPerPageChange: (value: number) => void;
	onPageChange: (page: number) => void;
	className?: string;
	dataRowLimit?: number;
	show?: boolean;
};

export const PaginationControls = ({
	currentPage,
	totalPages,
	startIndex,
	endIndex,
	totalItems,
	rowsPerPage,
	onRowsPerPageChange,
	onPageChange,
	className = "",
	dataRowLimit,
	show = true,
}: PaginationControlsProps) => {
	const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onRowsPerPageChange(Number(e.target.value));
	};

	const renderPageNumbers = () => {
		return Array.from({ length: Math.min(totalPages, 3) }).map((_, idx) => {
			let pageNum: number;
			if (totalPages <= 3) {
				pageNum = idx + 1;
			} else if (currentPage === 1) {
				pageNum = idx + 1;
			} else if (currentPage === totalPages) {
				pageNum = totalPages - 2 + idx;
			} else {
				pageNum = currentPage - 1 + idx;
			}

			return (
				<button
					key={pageNum}
					onClick={() => onPageChange(pageNum)}
					className={`w-6 h-6 flex items-center justify-center rounded mx-1 ${
						currentPage === pageNum
							? "bg-transparent text-foreground font-bold text-sm"
							: "text-foreground hover:bg-gray-100 text-xs"
					}`}
				>
					{pageNum}
				</button>
			);
		});
	};

	if (!show) return null;

	return (
		<div
			className={`flex items-center justify-center sm:justify-end py-4 px-2 mt-6 ${className}`}
		>
			<div className="flex items-center gap-2 md:gap-6 text-sm text-gray-700 flex-wrap">
				{/* Rows per page */}
				<div className="flex items-center w-full justify-center sm:justify-normal sm:w-fit">
					<span className="mr-2 text-xs">Rows per page:</span>
					<select
						value={rowsPerPage}
						disabled={dataRowLimit != undefined}
						onChange={handleRowsChange}
						className="appearance-none bg-transparent border-0 px-1 py-0 pr-6 text-xs rounded cursor-pointer relative disabled:hover:cursor-not-allowed"
						style={{
							backgroundImage:
								"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "right 0.2rem center",
							backgroundSize: "0.65em auto",
						}}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
				</div>

				{/* Page Navigation */}
				<div className="flex flex-row gap-2 items-center justify-center w-full sm:w-fit sm:justify-normal">
					<div className="text-xs">
						{startIndex + 1}-{endIndex} of {totalItems}
					</div>

					<div className="flex items-center">
						<button
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className={`p-1 rounded focus:outline-none ${
								currentPage === 1
									? "text-gray-300 cursor-not-allowed"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</button>

						<div className="hidden sm:flex">{renderPageNumbers()}</div>

						<div className="sm:hidden text-xs mx-1">
							{currentPage}/{totalPages}
						</div>

						<button
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages || totalPages === 0}
							className={`p-1 rounded focus:outline-none ${
								currentPage === totalPages || totalPages === 0
									? "text-gray-300 cursor-not-allowed"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<ChevronRightIcon className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
