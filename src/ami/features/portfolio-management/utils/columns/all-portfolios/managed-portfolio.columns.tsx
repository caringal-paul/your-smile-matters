import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { useNavigate } from "react-router-dom";
import { Button } from "@/core/components/base/button";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { CustomerManagedPortfolioTableType } from "../../types/all-portfolios/managed-portfolio.types";
import RolloverIcon from "@/ami/shared/assets/icons/RolloverIcon";
import DisapproveIcon from "@/ami/shared/assets/icons/DisapproveIcon";
import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";
import { FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";

type ManagedPortfolioTableColumnProps = {
	setIsRolloverModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsTerminateInvestmentModalOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

export const useManagedPortfolioColumns = ({
	setIsRolloverModalOpen,
	setIsTerminateInvestmentModalOpen,
}: ManagedPortfolioTableColumnProps) => {
	const navigate = useNavigate();

	const columns: Column<CustomerManagedPortfolioTableType>[] = [
		{
			key: "plan_name",
			label: "Plan Name",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "investment_risk_type",
			label: "Investment Risk Type",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},

		{
			key: "investment_duration",
			label: "Investment Duration",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "investment_amount",
			label: "Investment Amount",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToPeso(value)} className="text-center" />
			),
		},
		{
			key: "target_date",
			label: "Target Date",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToTableDate(String(value))}
					className="whitespace-nowrap"
				/>
			),
		},
		{
			key: "rollover_enabled",
			label: "Rollover Enabled",
			sortable: true,
			render: (value) => <DataTableRow value={!value ? "No" : "Yes"} />,
		},
		{
			key: "status",
			label: "Status",
			sortable: true,
			render: (value) => (
				<StatusWithIndicator
					value={value as FixedIncomeAndManagedPortfolioInvestmentStatus}
					colorMap={FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS}
				/>
			),
		},
		{
			key: "funded_date",
			label: "Funded Date",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={formatToTableDate(String(value))}
					className="whitespace-nowrap"
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
						onClick={() =>
							navigate(`risk-profile-answers-summary/?name=${row.plan_name}`)
						}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						disabled={Boolean(row.rollover_enabled) == false}
						onClick={() => setIsRolloverModalOpen(true)}
					>
						<RolloverIcon className="mt-[1px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => setIsTerminateInvestmentModalOpen(true)}
					>
						<DisapproveIcon className="mt-[1px]" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
