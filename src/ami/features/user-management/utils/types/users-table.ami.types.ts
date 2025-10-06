import { GetAllUserResponseAmi } from "./user-response.ami.types";

export type UserAmiTableType = {
	[K in keyof GetAllUserResponseAmi]: GetAllUserResponseAmi[K];
} & {
	status?: string;
	full_name?: string;
	action?: string;
};
