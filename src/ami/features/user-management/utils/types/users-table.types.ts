import { UserModel } from "@/core/models/user.model";

export type UserAmi = Pick<
	UserModel,
	| "_id"
	| "email"
	| "username"
	| "first_name"
	| "last_name"
	| "mobile_number"
	| "is_active"
	| "role_id"
	| "updated_at"
>;

export type UserAmiFilters = Partial<Record<keyof UserAmi, string[]>>;

export type UserAmiTableType = {
	[K in keyof UserAmi]: UserAmi[K];
} & {
	status?: string;
	full_name?: string;
	action?: string;
};
