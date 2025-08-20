type RiskRatingQuestionnaire = {
	id: number;
	question: string;
	answer: string;
	submitted_by: string;
	created_on: string;
};

export type RiskRatingQuestionnaireTableType = {
	[K in keyof RiskRatingQuestionnaire]: string;
} & { action?: any };
