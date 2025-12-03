export type CurrentUserLoggedInResponse = {
	_id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	mobile_number: string;
	profile_image?: string;
	role_id: string;
	role_and_permissions: RoleResponse | null;
};

type RoleResponse = {
	_id: string;
	name: string;
	description?: string;
	permissions: string[];
};
