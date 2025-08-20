import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import ApproveIcon from "@/ami/shared/assets/icons/ApproveIcon";
import DisapproveIcon from "@/ami/shared/assets/icons/DisapproveIcon";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { PortfolioForApprovalTableType } from "../../types/all-portfolios/portfolio-for-approval.types";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { ForApprovalStatus } from "@/ami/shared/types/status.types";
import { FOR_APPROVAL_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";

type PortfolioForApprovalProps = {
	setIsRejectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsApproveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePortfolioForApprovalColumns = ({
	setIsRejectModalOpen,
	setIsApproveModalOpen,
}: PortfolioForApprovalProps): Column<PortfolioForApprovalTableType>[] => {
	const columns: Column<PortfolioForApprovalTableType>[] = [
		{
			key: "date_requested",
			label: "Date Requested",
			sortable: true,
			priority: 1,
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
			label: "Customer Name",
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
						disabled={row.status != "For Approval"}
						className="hover:bg-transparent w-6"
						onClick={() => setIsApproveModalOpen(true)}
					>
						<ApproveIcon className="h-5 w-5" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						disabled={row.status != "For Approval"}
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
