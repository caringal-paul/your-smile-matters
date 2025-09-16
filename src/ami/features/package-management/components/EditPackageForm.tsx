import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import servicesArray from "../../service-management/mock/temp-services.json";
import packagesArray from "../mock/temp-packages.json";

// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField, FormMessage } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";
import { Switch } from "@/core/components/base/switch";
import { Label } from "@/core/components/base/label";
import { useParams } from "react-router-dom";

import {
	packageUpdateSchema,
	PackageAmiUpdate,
} from "../utils/schemas/package.schema";
import TextAreaEditor from "@/ami/shared/components/custom/input/TextAreaEditor";
import {
	MultipleSelectInput,
	PricingInput,
} from "@/core/components/custom/CustomInput";
import { ServiceModel } from "@/core/models/service.model";
import { SelectOptions } from "@/core/types/option.types";
import { PackageModel } from "@/core/models/package.model";
import { useEffect, useState } from "react";

type PackageFormProps = {
	className?: string;
};

const EditPackageForm = ({ className }: PackageFormProps) => {
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

	const form = useForm<PackageAmiUpdate>({
		resolver: zodResolver(packageUpdateSchema),
		mode: "onChange",
		defaultValues: {
			name: packageWithServices?.name ?? "",
			price: packageWithServices?.price ?? 0,
			looks: packageWithServices?.looks ?? 1,
			included_services: packageWithServices?.included_services ?? [],
			is_available: packageWithServices?.is_available ?? false,
			description: packageWithServices?.description ?? "",
		},
	});

	const serviceOptions: SelectOptions[] = servicesData.map((service) => {
		return {
			value: service._id,
			label: service.name,
			status: service.is_available ? "Available" : "Unavailable",
		};
	});

	const onSubmit = (values: PackageAmiUpdate) => {
		console.log(values);
	};

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading || !packageWithServices) {
		return (
			<div className="flex items-center justify-center h-40">
				<div className="w-6 h-6 border-2 rounded-full animate-spin border-primary border-t-transparent" />
				<span className="ml-2 text-sm text-muted-foreground">
					Loading package details...
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col mb-4 space-y-6">
			<FormCard className={cn("mt-0")}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Body className="my-2">
							<FormCard.Title hasSeparator>Edit Package</FormCard.Title>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label required>Package Name</FormCard.Label>
										<Input
											className="text-2xs"
											placeholder="Enter package name"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => {
									const handleChange = (val: string) => {
										field.onChange(val);
									};

									return (
										<FormCard.Field className="items-start">
											<FormCard.Label>Description</FormCard.Label>
											<div className="flex flex-row w-full overflow-hidden">
												<TextAreaEditor
													description={field.value ?? ""}
													onChange={handleChange}
												/>
											</div>
										</FormCard.Field>
									);
								}}
							/>

							<FormField
								control={form.control}
								name="included_services"
								render={({ field: { value, onChange } }) => (
									<FormCard.Field>
										<FormCard.Label required>Included services</FormCard.Label>

										<MultipleSelectInput
											placeholder="Choose services"
											options={serviceOptions}
											value={value}
											onChange={onChange}
											searchPlaceholder="Search services"
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label required>Price</FormCard.Label>
										<PricingInput
											prefix="₱"
											value={String(field.value)}
											onChange={(e) => {
												const raw = e.target.value.replace(/,/g, "");
												const num = raw === "" ? 0 : Number(raw);
												field.onChange(num);
											}}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="looks"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label required>No. of Looks</FormCard.Label>
										<div className="relative w-full">
											<Input
												type="number"
												className="pr-10 text-2xs"
												placeholder="Enter no of looks"
												value={field.value}
												onChange={(e) => {
													const raw = e.target.value;

													field.onChange(raw == "" ? "" : Number(raw));
												}}
											/>
											<span className="absolute text-gray-300 -translate-y-1/2 right-2 top-1/2 text-2xs">
												looks
											</span>
										</div>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<div className="pt-1">
								<FormField
									control={form.control}
									name="is_available"
									render={({ field }) => (
										<FormCard.Field>
											<FormCard.Label required htmlFor="is_available">
												Availability
											</FormCard.Label>
											<div className="flex items-center gap-2">
												<Switch
													checked={field.value}
													onCheckedChange={(checked) => {
														field.onChange(checked);
													}}
												/>

												<div className="relative z-10 h-4 w-fit">
													<Label
														className={`absolute transition-opacity duration-300 text-2xs font-normal  z-10 ${
															field.value ? "opacity-0" : "opacity-100"
														}`}
													>
														Unavailable
													</Label>
													<Label
														className={`absolute transition-opacity duration-300 text-2xs font-normal  z-10 ${
															field.value ? "opacity-100" : "opacity-0"
														}`}
													>
														Available
													</Label>
												</div>
											</div>
										</FormCard.Field>
									)}
								/>
							</div>
						</FormCard.Body>

						<FormCard.Footer className="flex justify-end gap-2">
							<>
								<Button
									variant="secondary"
									type="button"
									disabled={!form.formState.isDirty}
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();

										form.reset();
										form.clearErrors();
									}}
								>
									Clear
								</Button>
								<Button
									className="sm:w-fit"
									disabled={!form.formState.isDirty || !form.formState.isValid}
									onClick={() => onSubmit(form.getValues())}
								>
									Save Changes
								</Button>
							</>
						</FormCard.Footer>
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default EditPackageForm;
