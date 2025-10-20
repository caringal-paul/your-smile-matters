import { SupportsApprovalTableType } from "../types/support-table.types";
import { Column } from "@/core/types/column.types";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import ApproveIcon from "@/ami/shared/assets/icons/ApproveIcon";
import DisapproveIcon from "@/ami/shared/assets/icons/DisapproveIcon";
import parse from "html-react-parser";
import StatusWithIndicator from "@/ami/shared/components/indicator/StatusWithIndicator";
import { ForApprovalStatus } from "@/ami/shared/types/status.types";
import { FOR_APPROVAL_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";

export const useSupportsForApprovalColumn = (
	setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setIsRejectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const columns: Column<SupportsApprovalTableType>[] = [
		{
			key: "date_requested",
			label: "Date Requested",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToTableDate(String(value))}
					className="whitespace-nowrap"
				/>
			),
		},
		{
			key: "requested_by",
			label: "Requested By",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={value}
					className="line-clamp-1 overflow-hidden text-ellipsis"
				/>
			),
		},
		{
			key: "change_request",
			label: "Change Request",
			render: (value) => (
				<div className="rich-text font-normal text-xs line-clamp-1 text-ellipsis overflow-hidden">
					{parse(String(value))}
				</div>
			),
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={value as ForApprovalStatus}
					colorMap={FOR_APPROVAL_STATUS_COLORS}
				/>
			),
		},
		{
			key: "action",
			label: "Actions",
			render: (_, row) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent w-6"
						disabled={row.status != "For Approval"}
						onClick={() => setIsApproveModalOpen(true)}
					>
						<ApproveIcon className="h-5 w-5" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent w-6"
						disabled={row.status != "For Approval"}
						onClick={() => setIsRejectModalOpen(true)}
					>
						<DisapproveIcon className="h-5 w-5" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
