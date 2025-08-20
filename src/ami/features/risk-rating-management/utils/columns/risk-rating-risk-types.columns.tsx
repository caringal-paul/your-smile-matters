import { Button } from "@/core/components/base/button";
import { DataTableRow } from "@/ami/shared/components/custom/table/DataTableRow";
import { Column } from "@/ami/shared/types/column.types";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import EyeIcon from "@/ami/shared/assets/icons/EyeIcon";
import EditIcon from "@/ami/shared/assets/icons/EditIcon";
import { RiskRatingRiskTypesTableTypes } from "../types/risk-rating-risk-types.types";
import { useNavigate } from "react-router-dom";

export const useRiskRatingRiskTypesColumns =
	(): Column<RiskRatingRiskTypesTableTypes>[] => {
		const navigate = useNavigate();

		const columns: Column<RiskRatingRiskTypesTableTypes>[] = [
			{
				key: "portfolio_class",
				label: "Portfolio Class",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "risk_rating",
				label: "Risk Rating",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "point_range",
				label: "Point Range",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "yield_range",
				label: "Yield Range",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "portfolio_distribution",
				label: "Portfolio Distribution",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "updated_by",
				label: "Updated By",
				render: (value) => <DataTableRow value={value} />,
			},
			{
				key: "updated_on",
				label: "Updated on",
				priority: 1,
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
							onClick={() => navigate(`view/risk-type/${row.portfolio_class}`)}
						>
							<EyeIcon fill="#1C1B1F" className="mt-[1px]" />
						</Button>
						<Button
							size="icon"
							variant="icon"
							onClick={() => navigate(`edit/risk-type/${row.portfolio_class}`)}
						>
							<EditIcon fill="#1C1B1F" className="ml-1 mt-[2px]" />
						</Button>
					</div>
				),
			},
		];

		return columns;
	};
