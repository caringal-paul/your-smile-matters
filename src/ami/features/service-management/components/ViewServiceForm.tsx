// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import { cn } from "@/core/lib/utils";
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import serviceArray from "../mock/temp-services.json";

import { ServiceModel } from "@/core/models/service.model";
import parse from "html-react-parser";
import { Badge } from "@/core/components/base/badge";

const ViewServiceForm = () => {
	const { id } = useParams();

	const services = serviceArray as unknown;
	const servicesData = services as ServiceModel[];
	const foundService = id
		? servicesData.find((user) => user._id === id)
		: undefined;

	return (
		<FormCard className={cn("mt-0")}>
			<FormCard.Body className="my-2 space-y-3">
				<FormCard.Title hasSeparator>Service Details</FormCard.Title>

				<FormCard.Field>
					<FormCard.Label>Service Name</FormCard.Label>

					<Label className="font-normal text-2xs">{foundService?.name}</Label>
				</FormCard.Field>

				<FormCard.Field className={`items-start`}>
					<FormCard.Label>Description</FormCard.Label>
					<div className="flex flex-row w-full overflow-hidden rich-text">
						<Label className="font-normal text-2xs">
							{foundService?.description
								? parse(foundService?.description)
								: "-"}
						</Label>
					</div>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label>Category</FormCard.Label>

					<Label className="font-normal text-2xs">
						{foundService?.category}
					</Label>
				</FormCard.Field>

				<FormCard.Field>
					<FormCard.Label htmlFor="is_available">Availability</FormCard.Label>
					<Badge
						className={`${
							foundService?.is_available ? "bg-primary" : "bg-secondary"
						}`}
					>
						{foundService?.is_available ? "Available" : "Unavailable"}
					</Badge>
				</FormCard.Field>
			</FormCard.Body>
		</FormCard>
	);
};

export default ViewServiceForm;
