import { UserModel } from "@/core/models/user.model";

type RoleResponse = {
	_id: string;
	name: string;
	description?: string;
	permissions: string[];
};

type UserAuthResponse = Pick<
	UserModel,
	| "_id"
	| "email"
	| "username"
	| "first_name"
	| "last_name"
	| "mobile_number"
	| "role_id"
> & {
	role_and_permissions: RoleResponse | null;
	is_photographer?: boolean;
};

export type LoginResponseAmi = {
	user: UserAuthResponse;
	access_token: string;
	refresh_token: string;
	expires_in: string;
};
