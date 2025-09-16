import { MetaData } from "../types/base.types";

export type PackageModel = MetaData & {
	name: string;
	description: string | null;
	price: number;
	looks: number;
	included_services: string[];
	is_available: boolean;
};
