import DataTable from "@/ami/shared/components/custom/table/DataTable";

import riskRatingRiskTypes from "../mock/temp-risk-rating-risk-types.json";
import { RiskRatingRiskTypesTableTypes } from "../utils/types/risk-rating-risk-types.types";
import { useRiskRatingRiskTypesColumns } from "../utils/columns/risk-rating-risk-types.columns";

const RiskRatingRiskTypesTable = () => {
	const riskRatings = riskRatingRiskTypes as unknown;

	const riskRatingsData = riskRatings as RiskRatingRiskTypesTableTypes[];
	const columns = useRiskRatingRiskTypesColumns();

	return (
		<div className="relative pb-4 pt-4">
			<DataTable
				data={riskRatingsData}
				columns={columns}
				hasPagination={false}
			/>
		</div>
	);
};

export default RiskRatingRiskTypesTable;
