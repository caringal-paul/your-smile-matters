import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { RiskRatingQuestionnaireTableType } from "../types/risk-rating-questionnaire.types";
import { cn } from "@/core/lib/utils";
import DragHandleIcon from "@/ami/shared/assets/icons/DragHandleIcon";
import { Checkbox } from "@/core/components/base/checkbox";
import { useNavigate } from "react-router-dom";
import { useRowSelection } from "@/ami/shared/hooks/useRowSelection";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import TrashIcon from "@/ami/shared/assets/icons/TrashIcon";

export const useRiskRatingQuestionnaire = (
	data: RiskRatingQuestionnaireTableType[],
	setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const navigate = useNavigate();

	const { selectedRows, isAllSelected, handleSelectAll, handleSelectRow } =
		useRowSelection<RiskRatingQuestionnaireTableType>(data);

	const columns: Column<RiskRatingQuestionnaireTableType>[] = [
		{
			key: "id",
			label: (
				<div className="flex items-center justify-center">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={(checked) => handleSelectAll(!!checked)}
						className="h-[14px] w-[14px] border-border-table shadow-none xl:block hidden"
					/>
				</div>
			),
			sortable: false,
			render: (_, row) => (
				<div className={`flex xl:items-center xl:justify-center mb-2 xl:mb-0`}>
					<Checkbox
						checked={selectedRows.includes(row.id)}
						onCheckedChange={(checked) => handleSelectRow(row.id, !!checked)}
						className="h-[14px] w-[14px] border-border-table shadow-none xl:block"
					/>

					<span className="text-xs text-gray-500 font-medium ml-2 xl:hidden">
						{String(row.question)}
					</span>
				</div>
			),
		},
		{
			key: "id",
			label: "No.",
			sortable: true,
			render: (value) => (
				// <DataTableRow value={formatToTableDate(String(value))} />
				<div className={cn("font-normal text-xs flex items-center gap-6")}>
					{String(value)}{" "}
					<button
						className="hover:cursor-grab active:cursor-grabbing"
						onClick={() => console.log("Drag!")}
					>
						<DragHandleIcon />
					</button>
				</div>
			),
		},
		{
			key: "question",
			label: "Question",
			priority: 1,
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "answer",
			label: "Answer Format",
			priority: 2,
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "submitted_by",
			label: "Submitted By",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "created_on",
			label: "Created On",
			sortable: true,
			render: (value) => (
				<DataTableRow value={formatToTableDate(String(value))} />
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
						onClick={() => navigate(`view/risk-rating-question/${row.id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>

					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/risk-rating-question/${row.id}`)}
					>
						<EditIcon fill="#1C1B1F" className="ml-[5px] mt-[3px]" />
					</Button>
					<Button
						size="icon"
						variant="icon"
						onClick={() => setIsDeleteModalOpen(true)}
					>
						<TrashIcon fill="#1C1B1F" />
					</Button>
				</div>
			),
		},
	];

	return { columns, selectedRows, handleSelectAll, isAllSelected };
};
