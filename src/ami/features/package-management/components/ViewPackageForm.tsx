// Utils
import servicesArray from "../../service-management/mock/temp-services.json";
import packagesArray from "../mock/temp-packages.json";

// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import { cn } from "@/core/lib/utils";
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";

import { ServiceModel } from "@/core/models/service.model";
import { PackageModel } from "@/core/models/package.model";
import parse from "html-react-parser";
import { Badge } from "@/core/components/base/badge";
import { Switch } from "@/core/components/base/switch";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useGetPackageByIdQuery } from "../queries/getPackageById.ami.query";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemSeparator,
	ItemTitle,
} from "@/core/components/base/item";
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";

const ViewPackageForm = () => {
	const { id } = useParams();

	const { data: pkg, isLoading } = useGetPackageByIdQuery(id!);

	if (isLoading) {
		return <>Loading</>;
	}

	return (
		<div className="mb-6 space-y-4">
			<FormCard className={cn("mt-0 grid grid-cols-1 xl:grid-cols-2")}>
				<FormCard.Body className="mt-8 border-t-[1px] border-border border-dashed pt-2 xl:pt-0 xl:border-none xl:mt-0 mb-2 space-y-4">
					<FormCard.Title hasSeparator>Package Details</FormCard.Title>

					<FormCard.Field>
						<FormCard.Label>Package Name</FormCard.Label>
						<Label className="font-normal text-2xs">{pkg?.name}</Label>
					</FormCard.Field>

					<FormCard.Field className="items-start">
						<FormCard.Label>Package Description</FormCard.Label>
						<Label className="font-normal text-2xs rich-text">
							{parse(String(pkg?.description))}
						</Label>
					</FormCard.Field>

					<FormCard.Field>
						<FormCard.Label>Package Duration</FormCard.Label>
						<Label className="font-normal text-2xs rich-text">
							{formatDurationByMinutes(
								Number(pkg?.custom_duration_minutes) ||
									Number(
										pkg?.services.reduce(
											(sum, s) =>
												sum + (s.service_details?.duration_minutes || 0),
											0
										)
									)
							)}
						</Label>
					</FormCard.Field>

					{/* <FormCard.Field className={`items-start space-0 gap-0`}>
						<FormCard.Label>Package Services</FormCard.Label>
						<ul className="flex flex-col space-y-2">
							{pkg?.services.map((service, index) => {
								return (
									<li
										key={service.service_id}
										className="p-0 font-normal text-2xs"
									>
										{index + 1}. {service.service_details.name}{" "}
										<Badge className={`ml-2`}>
											{service.service_details.is_available
												? "Available"
												: "Unavailable"}
										</Badge>
									</li>
								);
							})}
						</ul>
					</FormCard.Field> */}

					<FormCard.Field>
						<FormCard.Label>No. of looks</FormCard.Label>
						<Label className="font-normal text-2xs">{pkg?.looks} looks</Label>
					</FormCard.Field>

					<FormCard.Field>
						<FormCard.Label>Package Availability</FormCard.Label>
						<div className="flex items-center gap-2">
							<Switch checked={pkg?.is_available} disabled />

							<div className="relative z-10 h-4 w-fit">
								<Label
									className={`mt-[1px] absolute transition-opacity duration-300 text-2xs font-normal z-10 ${
										pkg?.is_available ? "opacity-0" : "opacity-100"
									}`}
								>
									Unavailable
								</Label>
								<Label
									className={`mt-[1px] absolute transition-opacity duration-300 text-2xs font-normal z-10 ${
										pkg?.is_available ? "opacity-100" : "opacity-0"
									}`}
								>
									Available
								</Label>
							</div>
						</div>
					</FormCard.Field>
				</FormCard.Body>

				<FormCard.Body className="mt-0 mb-2 space-y-4">
					<FormCard.Title hasSeparator>Package Image</FormCard.Title>

					<img
						src={pkg?.image || "/sf/ysm-card-fallback.png"}
						alt="Package image"
						onError={(e) => {
							e.currentTarget.src = "/sf/ysm-card-fallback.png";
						}}
						className="size-40 object-cover rounded-lg border border-gray-200"
					/>
				</FormCard.Body>
			</FormCard>

			<FormCard className={cn("mt-0")}>
				<FormCard.Body className="mt-0 mb-2 space-y-4">
					<FormCard.Title hasSeparator>
						Package Services ({pkg?.services.length})
					</FormCard.Title>

					<div className="flex w-full max-w-xl flex-col gap-6">
						<ItemGroup className="grid grid-cols-3 gap-4  2xl:w-[40EM]">
							{pkg?.services.map((service) => (
								<Item key={service.service_details.name} variant="outline">
									<ItemHeader>
										<img
											src={
												service.service_details.service_gallery[0] ||
												"/sf/ysm-card-fallback.png"
											}
											onError={(e) => {
												e.currentTarget.src = "/sf/ysm-card-fallback.png";
											}}
											alt={service.service_details.name}
											width={128}
											height={128}
											className="aspect-square w-full rounded-sm object-cover"
										/>
									</ItemHeader>
									<ItemContent>
										<ItemTitle className="text-xs xl:text-sm line-clamp-3 max-w-[85%] truncate">
											{service.service_details.name}
										</ItemTitle>
										<ItemDescription className="text-xs xl:text-xs">
											{parse(String(service.service_details.description))}
										</ItemDescription>

										<ItemSeparator />

										<ItemTitle className="text-xs xl:text-sm">
											Service Price:
										</ItemTitle>
										<ItemDescription className="text-xs xl:text-xs">
											{formatToPeso(String(service.price_per_unit))} *{" "}
											{service.quantity} ={" "}
											<strong>{service.total_price}</strong>
										</ItemDescription>
									</ItemContent>
								</Item>
							))}
						</ItemGroup>
					</div>

					<FormCard.Title
						className="pt-3 border-t-[1px] border-dashed text-lg 2xl:text-xl font-light tracking-tight"
						hasSeparator={false}
					>
						PACKAGE PRICE:{" "}
						<span className="font-bold text-destructive ml-3">
							{formatToPeso(String(pkg?.package_price))}
						</span>
					</FormCard.Title>
				</FormCard.Body>
			</FormCard>
		</div>
	);
};

export default ViewPackageForm;
