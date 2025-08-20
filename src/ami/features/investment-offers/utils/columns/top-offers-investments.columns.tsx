import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { TopOffersInvestmentsTableType } from "../types/top-offers-investments.types";
import CircleAddButtonIcon from "@/ami/shared/assets/icons/CircleAddButtonIcon";

export const useTopOffersInvestmentsColumn = ({
	setConfirmModalOpen,
}: {
	setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): Column<TopOffersInvestmentsTableType>[] => {
	const columns: Column<TopOffersInvestmentsTableType>[] = [
		{
			key: "investment_offer",
			label: "Investment Offer",
			sortable: true,
			priority: 1,
			render: (value) => (
				<DataTableRow value={value} className="pl-3 lg:pl-6" />
			),
		},
		{
			key: "action",
			render: (_, row) => (
				<div className="flex items-end justify-end mr-2 lg:mr-5 ">
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent"
						onClick={() => setConfirmModalOpen(true)}
					>
						<CircleAddButtonIcon />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
