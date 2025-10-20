import z from "zod";

export const PaymentMethods = z.enum(["GCash", "Cash"]);

export const transactionCreateSchema = z.object({
	amount: z
		.number({
			required_error: "Aamount is required",
			invalid_type_error: "Amount must be a number",
		})
		.positive("Please input the amount you're paying"),

	payment_method: PaymentMethods,

	payment_proof_images: z
		.array(z.string().url({ message: "Each images must be a valid URL" }))
		.optional(),

	external_reference: z.string().optional(),

	notes: z
		.string()
		.max(2000, "Notes must be at most 2000 characters")
		.optional(),
});

/** Type inferred from schema */
export type TransactionSfCreate = z.infer<typeof transactionCreateSchema>;
