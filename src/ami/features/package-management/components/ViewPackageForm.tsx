// Utils
import servicesArray from "../../service-management/mock/temp-services.json";
import packagesArray from "../mock/temp-packages.json";

// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { cn } from "@/core/lib/utils";
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";

import { ServiceModel } from "@/core/models/service.model";
import { PackageModel } from "@/core/models/package.model";
import parse from "html-react-parser";
import { Badge } from "@/core/components/base/badge";
import { Switch } from "@/core/components/base/switch";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

type ViewPackageFormProps = {
	className?: string;
};

const ViewPackageForm = ({ className }: ViewPackageFormProps) => {
	const { id } = useParams();

	const services = servicesArray as unknown;
	const packages = packagesArray as unknown;

	const servicesData = services as ServiceModel[];
	const packagesData = packages as PackageModel[];

	const foundPackage = id
		? packagesData.find((pkg) => pkg._id === id)
		: undefined;

	const packageWithServices = foundPackage && {
		...foundPackage,
		services: servicesData.filter((svc) =>
			foundPackage.included_services.includes(svc._id)
		),
	};

	return (
		<FormCard className={cn("mt-0")}>
			<FormCard.Body className="mt-0 mb-2 space-y-4">
				<FormCard.Title hasSeparator>Package Details</FormCard.Title>

				<FormCard.Field>
					<FormCard.Label>Package Name</FormCard.Label>
					<Label className="font-normal text-2xs">
						{packageWithServices?.name}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Package Description</FormCard.Label>
					<Label className="font-normal text-2xs">
						{parse(String(packageWithServices?.description))}
					</Label>
				</FormCard.Field>

				<FormCard.Field className={`items-start space-0 gap-0`}>
					<FormCard.Label>Package Services</FormCard.Label>
					<ul className="flex flex-col space-y-2">
						{packageWithServices?.services.map((service, index) => {
							return (
								<li key={service._id} className="p-0 font-normal text-2xs">
									{index + 1}. {service.name}{" "}
									<Badge className={`ml-2`}>
										{service.is_available ? "Available" : "Unavailable"}
									</Badge>
								</li>
							);
						})}
					</ul>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Package Price</FormCard.Label>
					<Label className="font-normal text-2xs">
						{formatToPeso(String(packageWithServices?.price))}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>No. of looks</FormCard.Label>
					<Label className="font-normal text-2xs">
						{packageWithServices?.looks} looks
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Package Availability</FormCard.Label>
					<div className="flex items-center gap-2">
						<Switch checked={packageWithServices?.is_available} disabled />

						<div className="relative z-10 h-4 w-fit">
							<Label
								className={`mt-[1px] absolute transition-opacity duration-300 text-2xs font-normal z-10 ${
									packageWithServices?.is_available
										? "opacity-0"
										: "opacity-100"
								}`}
							>
								Unavailable
							</Label>
							<Label
								className={`mt-[1px] absolute transition-opacity duration-300 text-2xs font-normal z-10 ${
									packageWithServices?.is_available
										? "opacity-100"
										: "opacity-0"
								}`}
							>
								Available
							</Label>
						</div>
					</div>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

export default ViewPackageForm;
