import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Button } from "@/core/components/base/button";
import ApproveIcon from "@/ami/shared/assets/icons/ApproveIcon";
import DisapproveIcon from "@/ami/shared/assets/icons/DisapproveIcon";
import { PortfolioPendingTradeForApprovalTableType } from "../../types/pending-trades/portfolio-pending-trades-for-approval.types";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { ForApprovalStatus } from "@/ami/shared/types/status.types";
import { FOR_APPROVAL_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";

export const usePortfolioPendingTradeForApprovalColumns = (
	setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setIsRejectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const columns: Column<PortfolioPendingTradeForApprovalTableType>[] = [
		{
			key: "date_requested",
			label: "Date Requested",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
			),
		},
		{
			key: "requested_by",
			label: "Requested By",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "customer_name",
			label: "Cstomer Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "investment_name",
			label: "Investment Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "change_request",
			label: "Change Request",
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "status",
			label: "Status",
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
			render: (_) => (
				<div className="flex">
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent w-6"
						onClick={() => setIsApproveModalOpen(true)}
					>
						<ApproveIcon className="h-5 w-5" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent w-6"
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
