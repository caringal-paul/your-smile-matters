import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField, FormMessage } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";
import { Switch } from "@/core/components/base/switch";
import { Label } from "@/core/components/base/label";
import { useNavigate, useParams } from "react-router-dom";

import {
	serviceUpdateSchema,
	ServiceAmiUpdate,
} from "../utils/schemas/service.schema";
import TextAreaEditor from "@/ami/shared/components/input/TextAreaEditor";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { useGetServiceByIdQuery } from "../queries/getServiceById.ami.query";
import { useEffect, useState } from "react";
import { SERVICE_OPTIONS } from "@/core/constants/options.constants";
import { UploadCloud } from "lucide-react";
import { ServiceCategory } from "@/core/models/service.model";
import { PricingInput } from "@/core/components/custom/CustomInput";
import DurationInput from "@/core/components/custom/DurationInput";
import { Checkbox } from "@/core/components/base/checkbox";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { useUpdateServiceMutation } from "../queries/updateService.ami.mutation";

const UpdateServiceForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: service, isLoading: isServiceDataFetching } =
		useGetServiceByIdQuery(id!);

	const { mutateAsync: updateService, isPending: isUpdateServiceLoading } =
		useUpdateServiceMutation();

	const options = SERVICE_OPTIONS;

	const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

	const form = useForm<ServiceAmiUpdate>({
		resolver: zodResolver(serviceUpdateSchema),
		mode: "onChange",
		defaultValues: !service
			? undefined
			: {
					category: service.category ?? undefined,
					description: service.description ?? "",
					duration_minutes: service.duration_minutes ?? 0,
					is_available: service.is_available ?? false,
					name: service.name ?? "",
					old_price: service.old_price ?? 0,
					price: service.price ?? 0,
					service_gallery: service.service_gallery ?? [],
			  },
	});

	const onSubmit = async (payload: ServiceAmiUpdate) => {
		try {
			const response = await updateService({ id: String(id), payload });

			if (response) {
				navigate("/admin/ami/service-management/services");
			}

			console.log("Service updated:", response);
		} catch (error) {
			console.error("Failed to create photographer:", error);
		}
	};

	useEffect(() => {
		if (service && !!service.category) {
			setIsApplyingDiscount(!!service.old_price);
			form.reset({
				category: service.category as ServiceCategory,
				description: service.description,
				duration_minutes: service.duration_minutes,
				is_available: service.is_available,
				name: service.name,
				old_price: service.old_price,
				price: service.price,
				service_gallery: service.service_gallery,
			});
		}
	}, [service]);

	if (isServiceDataFetching && !options && !service) {
		return <>Loading</>;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<FormCard className={cn("mt-0")}>
						<FormCard.Body className="my-2">
							<FormCard.Title hasSeparator>Service Details</FormCard.Title>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Service Name</FormCard.Label>
										<Input
											className="text-2xs"
											placeholder="Enter service name"
											{...field}
										/>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="duration_minutes"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Service session duration</FormCard.Label>

										<DurationInput
											value={!field.value ? "" : String(field.value)}
											onChange={(value) => {
												const numericValue =
													value === "" ? 0 : parseFloat(value);
												field.onChange(numericValue);
											}}
											hideError
										/>
										<div />
										<FormCard.Description>
											Enter duration in minutes (must be in 30-minute
											intervals). Example: 2 hrs = 120, 1 hr 30 mins = 90
										</FormCard.Description>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormCard.Field className={`items-start`}>
										<FormCard.Label>Description</FormCard.Label>
										<div className="flex flex-row w-full overflow-hidden">
											<TextAreaEditor
												description={field.value}
												onChange={field.onChange}
											/>
										</div>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Category</FormCard.Label>
										<Select
											value={field.value ?? undefined}
											onValueChange={(value) => field.onChange(value)}
										>
											<SelectTrigger
												className={`w-full ${
													!field.value ? "text-gray-400" : "text-foreground"
												}`}
											>
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Category</SelectLabel>
													{options.map((service) => {
														return (
															<SelectItem
																value={service.value}
																key={service.value}
															>
																{service.label}
															</SelectItem>
														);
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>
							<div className="pt-1">
								<FormField
									control={form.control}
									name="is_available"
									render={({ field }) => (
										<FormCard.Field>
											<FormCard.Label htmlFor="is_available">
												Availability
											</FormCard.Label>
											<div className="flex items-center gap-2">
												<Switch
													checked={field.value}
													onCheckedChange={(checked) => {
														field.onChange(checked);
													}}
												/>
												<div className="relative h-4 w-fit pt-[2px]">
													<Label
														className={`absolute transition-opacity duration-300 text-2xs font-normal ${
															field.value ? "opacity-0" : "opacity-100"
														}`}
													>
														Unavailable
													</Label>
													<Label
														className={`absolute transition-opacity duration-300 text-2xs font-normal ${
															field.value ? "opacity-100" : "opacity-0"
														}`}
													>
														Available
													</Label>
												</div>
											</div>
											<div />
											<FormMessage />
										</FormCard.Field>
									)}
								/>
							</div>

							<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
								Service Pricing
							</FormCard.Title>

							<div className="flex items-center space-x-2">
								<Checkbox
									checked={isApplyingDiscount}
									onCheckedChange={(value) => {
										setIsApplyingDiscount(!!value);

										if (value == true) {
											form.setValue("old_price", service?.price);
										} else {
											form.setValue("old_price", 0);
										}
									}}
								/>
								<FormCard.Label className="!mt-0 cursor-pointer">
									Apply price change as a discount
								</FormCard.Label>
							</div>

							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Price</FormCard.Label>
										<PricingInput
											prefix="₱"
											className="text-2xs"
											placeholder="Enter service price"
											value={!field.value ? "" : String(field.value)}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric chars except decimal
												const numericValue =
													value === "" ? 0 : parseFloat(value);

												field.onChange(numericValue);
											}}
										/>
										<div />
										<FormCard.Description>
											Toggle the checkbox above to treat this price change as a
											discount.
										</FormCard.Description>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>

							{!!form.getValues("old_price") && (
								<FormField
									control={form.control}
									name="old_price"
									render={({ field }) => (
										<FormCard.Field>
											<FormCard.Label>Old Price</FormCard.Label>
											<Label className="font-normal text-2xs 2xl:text-xs line-through">
												{formatToPeso(String(field.value))}
											</Label>
											<div />
											<FormMessage />
										</FormCard.Field>
									)}
								/>
							)}

							<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
								Service Gallery
							</FormCard.Title>
							<FormField
								control={form.control}
								name="service_gallery"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-2 items-start">
										<FormCard.Label htmlFor="service_gallery">
											Upload Photos
										</FormCard.Label>
										<div className="w-full">
											<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
												<input
													id="service_gallery"
													type="file"
													multiple
													accept="image/*"
													className="hidden"
													onChange={(e) => {
														const files = e.target.files;
														if (files) {
															const fileArray = Array.from(files);
															const newPhotos = fileArray.map((file) =>
																URL.createObjectURL(file)
															);
															field.onChange([
																...(field.value || []),
																...newPhotos,
															]);
														}
													}}
												/>
												<label
													htmlFor="service_gallery"
													className="cursor-pointer flex flex-col items-center justify-center"
												>
													<UploadCloud className="size-16 text-gray-400 mb-4" />
													<p className="text-sm text-gray-600 mb-1">
														Click to upload or drag and drop
													</p>
													<p className="text-xs text-gray-500">
														PNG, JPG, GIF up to 10MB
													</p>
												</label>
											</div>

											{(field.value ?? []).length > 0 && (
												<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
													{(field.value ?? []).map((photo, index) => (
														<div key={index} className="relative group">
															<img
																src={photo || "/sf/ysm-card-fallback.png"}
																alt={`Preview ${index + 1}`}
																onError={(e) => {
																	e.currentTarget.src =
																		"/sf/ysm-card-fallback.png";
																}}
																className="w-full h-32 object-cover rounded-lg border border-gray-200"
															/>
															<button
																type="button"
																onClick={() => {
																	const newPhotos = (field.value ?? []).filter(
																		(_, i) => i !== index
																	);
																	field.onChange(newPhotos);
																}}
																className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
															>
																<svg
																	className="w-4 h-4"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M6 18L18 6M6 6l12 12"
																	/>
																</svg>
															</button>
														</div>
													))}
												</div>
											)}
										</div>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>
						</FormCard.Body>
						{/* Form Actions */}
						<FormCard.Footer className="flex justify-end gap-2">
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
								type="submit"
								disabled={!form.formState.isDirty || !form.formState.isValid}
							>
								Save Changes
							</Button>
						</FormCard.Footer>
					</FormCard>
				</div>
			</form>
		</Form>
	);
};

export default UpdateServiceForm;
