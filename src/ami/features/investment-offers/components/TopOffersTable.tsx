import DataTable from "@/ami/shared/components/custom/table/DataTable";

import top5InvestmentsArray from "../mock/top-5-offers.json";
import allInvestmentsArray from "../mock/top-offers-all-investments.json";

import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import { TopOffersInvestmentsTableType } from "../utils/types/top-offers-investments.types";
import { useTopOffersInvestmentsColumn } from "../utils/columns/top-offers-investments.columns";
import { useTop5OffersColumns } from "../utils/columns/top-5-offers.columns";
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useState } from "react";

const TopOffersTable = () => {
	return (
		<div className="grid grid-cols-2 gap-x-8 pb-10">
			<TopFiveInvestmentsTable />
			<InvestmentsTable />
		</div>
	);
};

const TopFiveInvestmentsTable = () => {
	const topInvestments = top5InvestmentsArray as unknown;

	const top5Investments = topInvestments as TopOffersInvestmentsTableType[];

	const [isRemoveToTopOffersModalOpen, setIsRemoveToTopOffersModalOpen] =
		useState(false);

	const top5InvestmentsColumns = useTop5OffersColumns({
		setConfirmModalOpen: setIsRemoveToTopOffersModalOpen,
	});

	return (
		<div className="col-span-2 lg:col-span-1 h-fit">
			<div className="mt-4 py-4 px-5 h-full w-full bg-white border-none rounded-lg">
				<FormCard.Title hasSeparator={false} className="mt-4">
					Add Top 5 Investment Offers
				</FormCard.Title>

				<Label className="text-xs my-6 flex leading-relaxed font-normal">
					Select investments from the available list to add them to the 'Top
					Offers' section. You can reorder the selected offers to set their
					display priority. A maximum of five (5) top offers can be shown to
					users.
				</Label>

				<DataTable
					data={top5Investments}
					columns={top5InvestmentsColumns}
					isHeadless={true}
					isDraggable={true}
					className="w-full max-w-full border-[1px] border-gray-200"
					hasPagination={false}
					isColumnsCompressed={true}
				/>

				<FormCard.Footer className="flex gap-2 mt-6 justify-end">
					<Button variant="secondary" className="" onClick={() => {}}>
						Cancel
					</Button>
					<Button className="sm:w-fit" type="submit">
						Save Changes
					</Button>
				</FormCard.Footer>
			</div>

			<ConfirmModal
				isConfirmModalOpen={isRemoveToTopOffersModalOpen}
				toggleConfirmModal={setIsRemoveToTopOffersModalOpen}
				confirmButtonLabel="Remove to Top Offers"
				dismissButtonLabel="Cancel"
				title="Confirm Removal to Top Offers"
				description="Are you sure you want to remove this investment to the Top Offers list?"
			/>
		</div>
	);
};

const InvestmentsTable = () => {
	const investments = allInvestmentsArray as unknown;

	const allInvestments = investments as TopOffersInvestmentsTableType[];

	const [isAddToTopOffersModalOpen, setIsAddToTopOffersModalOpen] =
		useState(false);

	const topInvestmentsColumn = useTopOffersInvestmentsColumn({
		setConfirmModalOpen: setIsAddToTopOffersModalOpen,
	});

	const { searchText, setSearchText, filteredData } =
		useFilteredTableData<TopOffersInvestmentsTableType>({
			data: allInvestments,
			keys: ["investment_offer"],
		});

	return (
		<div className="col-span-2 lg:col-span-1 mt-4 py-4 px-5 h-fit w-full bg-white border-none rounded-lg">
			<div className="pb-4 space-y-4 sm:space-y-0">
				<SectionHeader hasSeparator={true} className="bg-white">
					<div className="flex flex-col sm:flex-row gap-2 items-center justify-between h-9 w-full">
						<TableSearch
							value={searchText}
							onChange={setSearchText}
							className="sm:w-full md:w-full"
						/>
					</div>
				</SectionHeader>

				<DataTable
					data={filteredData}
					columns={topInvestmentsColumn}
					className="w-full max-w-full border-[1px] border-gray-200"
					isColumnsCompressed={true}
					isDraggable={true}
				/>
			</div>

			<ConfirmModal
				isConfirmModalOpen={isAddToTopOffersModalOpen}
				toggleConfirmModal={setIsAddToTopOffersModalOpen}
				confirmButtonLabel="Add to Top Offers"
				dismissButtonLabel="Cancel"
				title="Confirm Addition to Top Offers"
				description="Are you sure you want to add this investment to the Top Offers list? This will make it visible to users as one of the prioritized offers."
			/>
		</div>
	);
};

export default TopOffersTable;
