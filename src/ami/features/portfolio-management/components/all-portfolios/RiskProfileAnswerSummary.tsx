import { Label } from "@/core/components/base/label";
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import riskProfileAnswers from "../../mock/all-portfolios/temp-risk-profile-answer-summary.json";
import { RiskProfileAnswerSummary } from "../../utils/types/all-portfolios/managed-portfolio-risk-summary.types";

type PortfolioDistribution = {
	assetType: string;
	percentage: string;
};

const RiskProfileAnswerSummaryPage = () => {
	const answerSummary = riskProfileAnswers as unknown;

	const answerSummaryData = answerSummary as RiskProfileAnswerSummary[];

	const portfolioDistribution: PortfolioDistribution[] = [
		{ assetType: "Fund Placement", percentage: "15%" },
		{ assetType: "Compliant Funds / Bonds", percentage: "20%" },
		{ assetType: "Commercial Papers", percentage: "15%" },
		{ assetType: "Real Estate", percentage: "15%" },
		{ assetType: "Commodity", percentage: "10%" },
		{ assetType: "Equities (NGX)", percentage: "10%" },
		{ assetType: "Venture Capital / Private Equity", percentage: "15%" },
	];

	return (
		<div className="grid grid-cols-3 gap-4 2xl:gap-8 h-full w-full">
			<FormCard className="col-span-3 lg:col-span-2">
				<FormCard.Title hasSeparator={false} className="mb-6">
					Risk Profile Answers Summary
				</FormCard.Title>
				<FormCard.Body>
					<ol className="space-y-4">
						{answerSummaryData.map(
							(answer: RiskProfileAnswerSummary, index) => {
								return (
									<li className="w-full grid grid-cols-3">
										<div className="col-span-1 max-w-[90%]">
											<FormCard.Label className="line-clamp-2">
												{index + 1}. {answer.question}
											</FormCard.Label>
										</div>
										<div className="col-span-2 max-w-[90%]">
											<FormCard.Label className="line-clamp-4 font-normal">
												{answer.answer}
											</FormCard.Label>
										</div>
									</li>
								);
							}
						)}
					</ol>
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-3 lg:col-span-1 h-fit overflow-hidden bg-accent">
				<div className="flex flex-col mb-6">
					<FormCard.Title hasSeparator={false}>
						Portfolio Distribution
					</FormCard.Title>
					<Label className="text-xs font-light">
						Risk Rating: <span className="text-avatar font-bold">Moderate</span>
					</Label>
				</div>
				<FormCard.Body>
					<ol className="space-y-4">
						{portfolioDistribution.map(
							(distribution: PortfolioDistribution) => {
								return (
									<li className="flex justify-between">
										<FormCard.Label>{distribution.assetType}</FormCard.Label>
										<FormCard.Label>{distribution.percentage}</FormCard.Label>
									</li>
								);
							}
						)}
					</ol>
				</FormCard.Body>
			</FormCard>
		</div>
	);
};

export default RiskProfileAnswerSummaryPage;
