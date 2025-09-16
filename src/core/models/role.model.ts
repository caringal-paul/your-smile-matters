import { MetaData } from "../types/base.types";

export type RoleModel = MetaData & {
	name: string;
	description: string;
	permissions: string[];
};
