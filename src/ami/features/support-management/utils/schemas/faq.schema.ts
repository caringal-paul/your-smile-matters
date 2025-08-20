import { z } from "zod/v4";

export const FAQSchema = z.object({
	question: z.string().nonempty("Question is required."),
	answer: z.string().nonempty("Answer is required."),
});

export type FAQ = z.infer<typeof FAQSchema>;
