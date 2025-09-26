import { Checkbox } from "@/core/components/base/checkbox";
import { FAQTableType } from "../types/support-table.types";
import { Column } from "@/ami/shared/types/column.types";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { DataTableRow } from "@/ami/shared/components/table/DataTableRow";
import TrashIcon from "@/ami/shared/assets/icons/TrashIcon";
import parse from "html-react-parser";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import { useRowSelection } from "@/ami/shared/hooks/useRowSelection";

export const useQuestionsColumns = (
	data: FAQTableType[],
	setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const navigate = useNavigate();

	const { selectedRows, isAllSelected, handleSelectAll, handleSelectRow } =
		useRowSelection<FAQTableType>(data);

	const columns: Column<FAQTableType>[] = [
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
			priority: 2,
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
			key: "question",
			label: "Question",
			sortable: true,
			render: (value) => (
				<DataTableRow
					value={value}
					// className="line-clamp-4 text-ellipsis overflow-hidden max-w-[25em]"
				/>
			),
		},
		{
			key: "answer",
			label: "Answer",
			sortable: true,
			render: (value) => (
				<div className="rich-text font-normal text-xs line-clamp-1 text-ellipsis overflow-hidden max-w-[30em]">
					{parse(String(value))}
				</div>
			),
		},
		{
			key: "created_by",
			label: "Created by",
			sortable: true,
			render: (value) => <DataTableRow value={value} />,
		},
		{
			key: "created_on",
			label: "Created On",
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
						onClick={() => navigate(`view/question/${row.id}`)}
					>
						<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
					</Button>

					<Button
						size="icon"
						variant="icon"
						onClick={() => navigate(`edit/question/${row.id}`)}
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
