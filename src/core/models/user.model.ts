import { MetaData } from "../types/base.types";

export type UserModel = MetaData & {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	mobile_number: string;
	role_id: string;
};
