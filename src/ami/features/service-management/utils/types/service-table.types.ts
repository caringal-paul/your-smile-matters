import { GetAllServiceResponseAmi } from "./service-response.ami.types";

export type ServiceAmiTableType = {
	[K in keyof GetAllServiceResponseAmi]: GetAllServiceResponseAmi[K];
} & {
	status?: string;
	action?: string;
};
