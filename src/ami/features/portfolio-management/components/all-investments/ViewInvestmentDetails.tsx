import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Label } from "@/core/components/base/label";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

import investmentsArray from "../../mock/all-investments/temp-view-investments.json";
import { ViewInvestments } from "../../utils/types/all-investments/portfolio-view-investments.types";
import { usePortfolioViewInvestmentsColumns } from "../../utils/columns/all-investments/portfolio-view-investments.column";
import { useFilteredTableData } from "@/ami/shared/hooks/useFilterTableData";
import { PORTFOLIO_VIEW_INVESTMENTS_TABLE_SEARCH_KEYS } from "../../constants/portfolio.constants";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import TableSearch from "@/ami/shared/components/custom/filter/TableSearch";
import TableFilter from "@/ami/shared/components/custom/filter/TableFilter";
import DataTable from "@/ami/shared/components/custom/table/DataTable";
import { FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUSES_FILTER_OPTIONS } from "@/ami/shared/constants/status.constants";

export const ViewInvestmentDetails = () => {
	return (
		<div className="grid grid-cols-2 gap-8">
			<InvestmentDetails />
			<InvestmentTerms />
			<ViewInvestmentTable />
		</div>
	);
};

const InvestmentDetails = () => {
	return (
		<FormCard className="col-span-2 xl:col-span-1">
			<FormCard.Title>Investment Details</FormCard.Title>
			<FormCard.Body>
				<FormCard.Field>
					<FormCard.Label>Investment Name</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">
						10-year Treasury Bond
					</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Asset Class</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">Fixed Income</Label>
				</FormCard.Field>
				<FormCard.Field className="items-start">
					<FormCard.Label>Description</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal line-clamp-4">
						A Sharia-compliant investment opportunity, Sukuk Bonds offer steady
						returns while adhering to Islamic principles. Ideal for ethical
						investors seeking halal fixed-income solutions with secure,
						asset-backend guarantees.
					</Label>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

const InvestmentTerms = () => {
	return (
		<FormCard className="col-span-2 xl:col-span-1">
			<FormCard.Title>Investment Terms</FormCard.Title>
			<FormCard.Body>
				<FormCard.Field>
					<FormCard.Label>Return of Investment (%)</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">
						0.67% annually
					</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Minimum Investment Amount</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">
						{formatToPeso("150000.00")}
					</Label>
				</FormCard.Field>
				<FormCard.Field>
					<FormCard.Label>Maximum Investment Amount</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">
						{formatToPeso("10050000.00")}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Investment Tenor</FormCard.Label>
					<Label className="lg:pl-10 text-2xs font-normal">
						10 years, 20 years, 30 years
					</Label>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

const ViewInvestmentTable = () => {
	const investments = investmentsArray as unknown;

	const investmentsData = investments as ViewInvestments[];
	const columns = usePortfolioViewInvestmentsColumns();

	const {
		searchText,
		setSearchText,
		filtersDraft,
		setFiltersDraft,
		applyFilters,
		filteredData,
	} = useFilteredTableData<ViewInvestments>({
		data: investmentsData,
		keys: PORTFOLIO_VIEW_INVESTMENTS_TABLE_SEARCH_KEYS,
	});

	return (
		<div className="relative pb-4 col-span-2">
			<SectionHeader hasSeparator={true}>
				<div className="flex gap-2 items-center h-9 w-full sm:w-fit">
					<TableSearch value={searchText} onChange={setSearchText} />
					<TableFilter
						filters={filtersDraft}
						setFilters={setFiltersDraft}
						filterOptions={
							FIXED_INCOME_AND_MANAGED_PORTFOLIO_STATUSES_FILTER_OPTIONS
						}
						onApply={applyFilters}
					/>
				</div>
			</SectionHeader>

			<DataTable data={filteredData} columns={columns} />
		</div>
	);
};
