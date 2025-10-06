import { UserModel } from "@/core/models/user.model";

export type GetAllUserResponseAmi = Pick<
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

export type GetByIdUserResponseAmi = UserModel & {
	role_and_permissions: {
		name: string;
		description: string;
		permissions: string[];
	};
};

export type CreateUserResponseAmi = UserModel & {};

export type UpdateUserResponseAmi = UserModel & {};

export type DeactivateUserResponseAmi = UserModel & {};

export type ReactivateUserResponseAmi = UserModel & {};
