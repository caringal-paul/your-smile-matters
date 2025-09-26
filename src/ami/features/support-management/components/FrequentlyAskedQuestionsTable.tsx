import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { useState } from "react";
import DataTable from "@/ami/shared/components/table/DataTable";
import questionsArray from "../mock/temp-questions.json";
import { useQuestionsColumns } from "../utils/columns/question.columns";
import { Button } from "@/core/components/base/button";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import { Checkbox } from "@/core/components/base/checkbox";
import ConfirmModal from "@/ami/shared/components/modal/ConfirmModal";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/filter/TableSearch";
import FormModal from "@/ami/shared/components/modal/FormModal";
import FrequentlyAskedQuestionsForm from "./FrequentlyAskedQuestionsForm";
import { FAQTableType } from "../utils/types/support-table.types";

const SUPPORT_TABLE_SEARCH_KEYS: (keyof FAQTableType)[] = [
	"question",
	"answer",
	"created_by",
	"created_on",
];

const FrequentlyAskedQuestionsTable = () => {
	const questions = questionsArray as unknown;
	const questionsData = questions as FAQTableType[];

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isMultipleDeleteModalOpen, setIsMultipleDeleteModalOpen] =
		useState(false);

	const [isAddFaqModalOpen, setIsAddFaqModalOpen] = useState(false);

	const { columns, selectedRows, handleSelectAll, isAllSelected } =
		useQuestionsColumns(questionsData, setIsDeleteModalOpen);

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<FAQTableType>({
			data: questionsData,
			keys: SUPPORT_TABLE_SEARCH_KEYS,
		});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={false} className="my-4 sm:mb-4">
				<div className="flex gap-2 items-center justify-between h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
				</div>
				<div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2 justify-end">
					<div className="w-full sm:w-fit flex gap-2">
						<div className="border-[1px] border-border-table py-4 px-2 items-center justify-center flex w-fit h-8 rounded-[13px] gap-2 xl:hidden">
							<Checkbox
								checked={isAllSelected}
								onCheckedChange={(checked) => handleSelectAll(!!checked)}
								className="h-[14px] w-[14px] border-border-table shadow-none xl:block"
							/>{" "}
							<span className="text-[10px] text-text-secondary whitespace-nowrap">
								Select All
							</span>{" "}
						</div>
						<Button
							variant="secondary"
							className="w-full sm:w-fit"
							disabled={selectedRows.length < 2}
							onClick={() => setIsMultipleDeleteModalOpen(true)}
						>
							Delete
						</Button>
					</div>

					<Button
						className="w-full sm:w-fit [&_svg]:size-5 [&_svg]:shrink-0"
						onClick={() => setIsAddFaqModalOpen(true)}
					>
						<AddButtonIcon className="h-6 w-6" />
						Add New
					</Button>
				</div>
			</SectionHeader>
			<DataTable
				data={filteredData}
				columns={columns}
				descriptionPriorityKey="answer"
			/>

			<ConfirmModal
				isConfirmModalOpen={isDeleteModalOpen}
				toggleConfirmModal={setIsDeleteModalOpen}
				confirmButtonLabel="Submit for Approval"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to delete this frequently asked question?"
				description="This action will be submitted for admin approval. The question will
						remain active until the request is reviewed and approved."
			/>

			<ConfirmModal
				isConfirmModalOpen={isMultipleDeleteModalOpen}
				toggleConfirmModal={setIsMultipleDeleteModalOpen}
				confirmButtonLabel="Submit for Approval"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to delete this frequently asked questions?"
				description="This action will be submitted for admin approval. These questions will
						remain active until the request is reviewed and approved."
			/>

			<FormModal
				isFormModalOpen={isAddFaqModalOpen}
				toggleFormModal={setIsAddFaqModalOpen}
				submitButtonLabel={"Create FAQ"}
				cancelButtonLabel={"Cancel"}
			>
				<FrequentlyAskedQuestionsForm
					className="border-none rounded-none"
					cancelButtonLabel="Cancel"
					submitButtonLabel="Create FAQ"
					closeModal={() => setIsAddFaqModalOpen(false)}
				/>
			</FormModal>
		</div>
	);
};

export default FrequentlyAskedQuestionsTable;
