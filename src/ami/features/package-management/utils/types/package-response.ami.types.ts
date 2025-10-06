import { IncludedService, PackageModel } from "@/core/models/package.model";
import { ServiceModel } from "@/core/models/service.model";

export type GetAllPackageResponseAmi = Omit<PackageModel, "services"> & {
	services: (IncludedService & { service_details: ServiceModel })[];
};

export type GetByIdPackageResponseAmi = Omit<PackageModel, "services"> & {
	services: (IncludedService & { service_details: ServiceModel })[];
};

export type CreatePackageResponseAmi = PackageModel & {};

export type UpdatePackageResponseAmi = PackageModel & {};

export type DeactivatePackageResponseAmi = PackageModel & {};

export type ReactivatePackageResponseAmi = PackageModel & {};

export type ToggleAvailabilityResponseAmi = PackageModel & {};
