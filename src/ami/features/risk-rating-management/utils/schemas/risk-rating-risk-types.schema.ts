import { z } from "zod/v4";

const PortfolioDistributionSchema = z.object({
	product_name: z.string(),
	allotment: z.number(),
});

export const RiskRatingRiskTypesSchema = z.object({
	portfolio_class: z.string().nonempty("Portfolio Class is required."),
	risk_rating: z.string().nonempty("Risk Rating is required."),
	min_point_range: z.number(),
	max_point_range: z.number(),
	min_yield_range: z.number(),
	max_yield_range: z.number(),
	portfolio_distribution: z.array(PortfolioDistributionSchema),
});

export type RiskTypes = z.infer<typeof RiskRatingRiskTypesSchema>;
