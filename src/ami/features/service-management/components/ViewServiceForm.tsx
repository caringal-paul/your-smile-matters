// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import { cn } from "@/core/lib/utils";
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Badge } from "@/core/components/base/badge";
import { useGetServiceByIdQuery } from "../queries/getServiceById.ami.query";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";

const ViewServiceForm = () => {
	const { id } = useParams();

	const { data: service, isLoading } = useGetServiceByIdQuery(id!);

	console.log(service);

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<div className="mb-6">
			<FormCard className={cn("mt-0")}>
				<FormCard.Body className="my-2 space-y-3">
					<FormCard.Title hasSeparator>Service Details</FormCard.Title>
					<FormCard.Field>
						<FormCard.Label>Service Name</FormCard.Label>
						<Label className="font-normal text-2xs 2xl:text-xs">
							{service?.name}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Service Price</FormCard.Label>
						<Label className="font-normal text-2xs 2xl:text-xs items-baseline">
							{formatToPeso(String(service?.price))}{" "}
							{!!service?.old_price && (
								<span className="font-normal text-3xs text-gray-400 2xl:text-2xs line-through">
									{formatToPeso(String(service?.old_price))}
								</span>
							)}
						</Label>
					</FormCard.Field>
					<FormCard.Field className={`items-start`}>
						<FormCard.Label>Description</FormCard.Label>
						<div className="flex flex-row w-full overflow-hidden rich-text">
							<Label className="font-normal text-2xs 2xl:text-xs rich-text">
								{service?.description ? parse(service?.description) : "-"}
							</Label>
						</div>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label>Category</FormCard.Label>
						<Badge>{service?.category}</Badge>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label htmlFor="is_available">Availability</FormCard.Label>
						<Label className="font-normal text-2xs 2xl:text-xs">
							{service?.is_available ? "Available" : "Unavailable"}
						</Label>
					</FormCard.Field>
					<FormCard.Field>
						<FormCard.Label htmlFor="is_available">
							Service Duration
						</FormCard.Label>
						<Label className="font-normal text-2xs 2xl:text-xs">
							{formatDurationByMinutes(Number(service?.duration_minutes))}
						</Label>
					</FormCard.Field>
				</FormCard.Body>
			</FormCard>

			<FormCard className="col-span-2">
				<FormCard.Title>Service Gallery</FormCard.Title>
				<FormCard.Body className="h-full">
					{Array.isArray(service?.service_gallery) &&
					service?.service_gallery.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 px-44">
							{service?.service_gallery.map((photo, index) => {
								return (
									<div key={index} className="aspect-square">
										<img
											src={photo || "/sf/ysm-card-fallback.png"}
											onError={(e) => {
												e.currentTarget.src = "/sf/ysm-card-fallback.png";
											}}
											alt={`photographer-img-${index + 1}`}
											className="w-full h-full object-cover rounded-lg"
										/>
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex items-center justify-center h-full min-h-[15rem]">
							<Label className="text-lg font-medium">No image showcased</Label>
						</div>
					)}
				</FormCard.Body>
			</FormCard>
		</div>
	);
};

export default ViewServiceForm;
