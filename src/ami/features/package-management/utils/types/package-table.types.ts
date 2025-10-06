import { ServiceModel } from "@/core/models/service.model";
import { GetAllPackageResponseAmi } from "./package-response.ami.types";

export type PackageAmiTableType = {
	[K in keyof GetAllPackageResponseAmi]: GetAllPackageResponseAmi[K];
} & {
	status?: string;
	action?: string;
	servicesData?: ServiceModel[];
};
