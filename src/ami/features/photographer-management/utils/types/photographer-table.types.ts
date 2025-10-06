import { GetAllPhotographerResponseAmi } from "./photographer-response.ami.types";

export type PhotographerAmiTableType = {
	[K in keyof GetAllPhotographerResponseAmi]: GetAllPhotographerResponseAmi[K];
} & {
	status?: string;
	action?: string;
};
