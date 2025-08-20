import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { TopOffersInvestmentsTableType } from "../types/top-offers-investments.types";
import CircleMinusButtonIcon from "@/ami/shared/assets/icons/CircleMinusButtonIcon";
import DragHandleIcon from "@/ami/shared/assets/icons/DragHandleIcon";

export const useTop5OffersColumns = ({
	setConfirmModalOpen,
}: {
	setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): Column<TopOffersInvestmentsTableType>[] => {
	const columns: Column<TopOffersInvestmentsTableType>[] = [
		{
			key: "order",
			priority: 1,
			render: (value) => (
				<DataTableRow
					value={value}
					className="max-w-[3em] text-start sm:text-center xl:text-end 2xl:text-center pl-2 sm:pl-0 lg:pl-5 xl:pl-2"
				/>
			),
		},
		{
			key: "investment_offer",
			priority: 1,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "action",
			render: (_, row) => (
				<div className="flex items-end justify-end lg:mr-5 xl:mr-3">
					<button
						className="hover:cursor-grab active:cursor-grabbing mb-1"
						onClick={() => console.log("Drag!")}
					>
						<DragHandleIcon className="h-6 w-6" />
					</button>
					<Button
						size="icon"
						variant="icon"
						className="hover:bg-transparent"
						onClick={() => setConfirmModalOpen(true)}
					>
						<CircleMinusButtonIcon className="mt-1" />
					</Button>
				</div>
			),
		},
	];

	return columns;
};
