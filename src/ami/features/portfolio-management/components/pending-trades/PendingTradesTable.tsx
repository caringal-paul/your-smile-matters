import DataTable from "@/ami/shared/components/custom/table/DataTable";

import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";

import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useState } from "react";
import { PORTFOLIO_PENDING_TRADES_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";

import pendingTrades from "../../mock/pending-trades/temp-portfolio-pending-trades.json";
import { PortfolioPendingTradeTableType } from "../../utils/types/pending-trades/portfolio-pending-trades.types";
import { usePortfolioPendingTradeColumns } from "../../utils/columns/pending-trades/portfolio-pending-trades.columns";
import { ASSET_CLASSES_FILTER_OPTIONS } from "@/ami/shared/constants/asset-classes.constants";

const PendingTradesTable = () => {
	const pendingTradesData = pendingTrades as unknown;

	const pendingTradesDataData =
		pendingTradesData as PortfolioPendingTradeTableType[];

	const [isCancelTradeModalOpen, setIsCancelTradeModalOpen] = useState(false);

	const columns = usePortfolioPendingTradeColumns(setIsCancelTradeModalOpen);

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		dateFilterDraft,
		setDateFilterDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<PortfolioPendingTradeTableType>({
		data: pendingTradesDataData,
		keys: PORTFOLIO_PENDING_TRADES_TABLE_SEARCH_KEYS,
		dateFields: ["transaction_date"],
	});

	return (
		<div className="relative pb-4">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						hasDateFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={ASSET_CLASSES_FILTER_OPTIONS}
						dateFilter={dateFilterDraft}
						setDateFilter={setDateFilterDraft}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />

			<ConfirmModal
				isConfirmModalOpen={isCancelTradeModalOpen}
				toggleConfirmModal={setIsCancelTradeModalOpen}
				confirmButtonLabel="Yes, Cancel Trade"
				dismissButtonLabel="Cancel"
				title="Are you sure you want to cancel this trade?"
				description="Cancelling this trade will remove it from the market and prevent it from being processed. This action may require admin approval before being finalized."
			/>
		</div>
	);
};

export default PendingTradesTable;
