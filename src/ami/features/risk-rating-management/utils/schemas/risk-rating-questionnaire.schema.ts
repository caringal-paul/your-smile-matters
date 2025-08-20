import { z } from "zod/v4";

export const RiskRatingQuestionnaireSchema = z.object({
	status: z.boolean(),
	question: z.string().nonempty("Question is required."),
	answer_format: z.string().nonempty("Answer Format is required."),
	options: z
		.array(
			z.object({
				label: z.string().nonempty("Label is required."),
				point: z.number().refine((val) => !isNaN(val), {
					message: "Point must be a valid number.",
				}),
				type: z.string(),
			})
		)
		.min(2, { message: "At least 2 options are required." })
		.optional(),
});

export type RiskRatingQuestion = z.infer<typeof RiskRatingQuestionnaireSchema>;
