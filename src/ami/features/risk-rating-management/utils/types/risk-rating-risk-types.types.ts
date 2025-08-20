type RiskRatingRiskTypes = {
	portfolio_class: string;
	risk_rating: "Low" | "Moderate" | "High";
	point_range: string;
	yield_range: string;
	portfolio_distribution: string;
	updated_by: string;
	updated_on: string;
};

export type RiskRatingRiskTypesTableTypes = {
	[K in keyof RiskRatingRiskTypes]: string;
} & {
	action?: any;
};
