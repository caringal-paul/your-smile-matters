import { Column } from "@/ami/shared/types/column.types";

import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import { Button } from "@/core/components/base/button";
import { FixedIncomeInvestmentTableType } from "../../types/all-portfolios/portfolio-fixed-income.types";
import DisapproveIcon from "@/ami/shared/assets/icons/DisapproveIcon";
import RolloverIcon from "@/ami/shared/assets/icons/RolloverIcon";
import StatusWithIndicator from "@/ami/shared/components/custom/indicator/StatusWithIndicator";
import { FixedIncomeAndManagedPortfolioInvestmentStatus } from "@/ami/shared/types/status.types";
import { FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS } from "@/ami/shared/constants/status-colors.constants";

type PortfolioFixedIncomeTableColumnProps = {
	setIsRolloverModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsTerminateInvestmentModalOpen: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

export const usePortfolioFixedIncomeColumns = ({
	setIsRolloverModalOpen,
	setIsTerminateInvestmentModalOpen,
}: PortfolioFixedIncomeTableColumnProps) => {
	const columns: Column<FixedIncomeInvestmentTableType>[] = [
		{
			key: "investment_offer",
			label: "Investment Offer",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "tenor",
			label: "Tenor",
			render: (value) => (
				<DataTableRow value={value} className="whitespace-nowrap" />
			),
		},

		{
			key: "principal_amount",
			label: "Principal Amout",
			sortable: true,
			render: (value) => <DataTableRow value={formatToPeso(value)} />,
		},
		{
			key: "alt_bank_used",
			label: "AltBank Used",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
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
			render: (value, row) => (
				<StatusWithIndicator
					value={value as FixedIncomeAndManagedPortfolioInvestmentStatus}
					colorMap={FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUS_COLORS}
					reason={row.reason_for_termination}
				/>
			),
		},
		{
			key: "investment_date",
			label: "Investment Date",
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
