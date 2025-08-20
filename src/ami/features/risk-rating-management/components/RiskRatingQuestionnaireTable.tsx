import DataTable from "@/ami/shared/components/custom/table/DataTable";

import riskRatingQuestionnaire from "../mock/temp-risk-rating-questionnaire.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { RISK_RATING_QUESTIONNAIRE_TABLE_SEARCH_KEYS } from "../constants/risk-rating-questionnaire.constants";
import { useState } from "react";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { RiskRatingQuestionnaireTableType } from "../utils/types/risk-rating-questionnaire.types";
import { useRiskRatingQuestionnaire } from "../utils/columns/risk-rating-questionnaire.columns";
import { Checkbox } from "@/core/components/base/checkbox";
import { Button } from "@/core/components/base/button";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import { useNavigate } from "react-router-dom";

const RiskRatingQuestionnaireTable = () => {
	const navigate = useNavigate();
	const riskRatings = riskRatingQuestionnaire as unknown;

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isMultipleDeleteModalOpen, setIsMultipleDeleteModalOpen] =
		useState(false);

	const customersDriskRatingsData =
		riskRatings as RiskRatingQuestionnaireTableType[];
	const { columns, selectedRows, handleSelectAll, isAllSelected } =
		useRiskRatingQuestionnaire(customersDriskRatingsData, setIsDeleteModalOpen);

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<RiskRatingQuestionnaireTableType>({
			data: customersDriskRatingsData,
			keys: RISK_RATING_QUESTIONNAIRE_TABLE_SEARCH_KEYS,
			dateFields: ["created_on"],
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
						onClick={() => navigate("add/risk-rating-question")}
					>
						<AddButtonIcon className="h-6 w-6" />
						Add New
					</Button>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />

			<ConfirmModal
				isConfirmModalOpen={isDeleteModalOpen}
				toggleConfirmModal={setIsDeleteModalOpen}
				confirmButtonLabel="Submit for Approval"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to delete this risk rating question?"
				description="This action will be submitted for admin approval. The question will
						remain active until the request is reviewed and approved."
			/>

			<ConfirmModal
				isConfirmModalOpen={isMultipleDeleteModalOpen}
				toggleConfirmModal={setIsMultipleDeleteModalOpen}
				confirmButtonLabel="Submit for Approval"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to delete this risk rating questions?"
				description="This action will be submitted for admin approval. These questions will
						remain active until the request is reviewed and approved."
			/>
		</div>
	);
};

export default RiskRatingQuestionnaireTable;
