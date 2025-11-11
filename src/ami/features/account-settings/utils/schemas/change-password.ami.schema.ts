import { z } from "zod";

// Change Password Schema
export const changePasswordSchema = z
	.object({
		current_password: z.string().min(1, "Current password is required"),
		new_password: z
			.string()
			.min(8, "New password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),
		confirm_password: z.string().min(1, "Please confirm your new password"),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: "Passwords do not match",
		path: ["confirm_password"],
	});

export type PasswordAmiUpdate = z.infer<typeof changePasswordSchema>;
