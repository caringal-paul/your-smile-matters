// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Button } from "@/core/components/base/button";
import { cn } from "@/core/lib/utils";
import { Label } from "@/core/components/base/label";
import { Fragment, useState } from "react";
import ExportIcon from "@/ami/shared/assets/icons/ExportIcon";
import { Separator } from "@/core/components/base/separator";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { PaginationControls } from "@/ami/shared/components/custom/table/PaginationControls";
import { ActivityLog } from "@/ami/shared/types/logs.types";

type ActivityLogTableProps = {
	data: ActivityLog[];
};

export const ActivityLogTable = ({ data }: ActivityLogTableProps) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);

	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

	const paginatedData = data.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<FormCard className={cn("mt-0")}>
			<FormCard.Body className="my-2">
				<FormCard.Title className="flex items-center">
					Activity Log
					<div className="ml-auto">
						<Button className="bg-primary w-full sm:w-fit border-none [&_svg]:size-5 [&_svg]:shrink-0">
							Export Log <ExportIcon className="h-5 w-5" />
						</Button>
					</div>
				</FormCard.Title>

				{paginatedData.length > 0 ? (
					<div className="flex flex-col gap-4 pt-4">
						{paginatedData.map((item, index) => (
							<Fragment key={startIndex + index}>
								<FormCard.Field className="flex justify-between items-start">
									<div className="flex flex-col gap-1">
										{/* <FormCard.Label className="text-sm font-normal">
											{String(item["description_log"])}
										</FormCard.Label> */}

										<FormCard.Label className="text-xs font-light line-clamp-3 pr-6">
											{String(item["description_log"])}
										</FormCard.Label>
									</div>
									<div className="flex flex-col items-end gap-2">
										<Label className="text-[11px] text-disabled-disable whitespace-nowrap">
											{formatToTableDate(String(item["date"]))}
										</Label>

										{/* {actionButton && (
											<Button
												onClick={() => actionButton.onClick(item)}
												variant={actionButton.variant || "outline"}
												size="sm"
												className="shrink-0"
											>
												{actionButton.label}
											</Button>
										)} */}
									</div>
								</FormCard.Field>
								{index < paginatedData.length - 1 && (
									<Separator className="mt-4" />
								)}
							</Fragment>
						))}
					</div>
				) : (
					<div className="text-center py-12 text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
						No results found.
					</div>
				)}

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
				/>
			</FormCard.Body>
		</FormCard>
	);
};
