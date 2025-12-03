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
import { useNavigate } from "react-router-dom";

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
import { useState } from "react";
import { SERVICE_OPTIONS } from "@/core/constants/options.constants";
import { UploadCloud, X } from "lucide-react";
import { PricingInput } from "@/core/components/custom/CustomInput";
import DurationInput from "@/core/components/custom/DurationInput";
import { useCreateServiceMutation } from "../queries/createService.ami.mutation";
import {
	ServiceAmiCreate,
	serviceCreateSchema,
} from "../utils/schemas/service.schema";
import { useUploadImagesMutation } from "@/core/queries/uploadImages.mutation";

const MAX_IMAGES = 4;

const CreateServiceForm = () => {
	const navigate = useNavigate();

	const { mutateAsync: createService, isPending: isCreateServiceLoading } =
		useCreateServiceMutation();

	const options = SERVICE_OPTIONS;

	const uploadImagesMutation = useUploadImagesMutation();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const form = useForm<ServiceAmiCreate>({
		resolver: zodResolver(serviceCreateSchema),
		mode: "onChange",
		defaultValues: {
			category: "Other",
			description: "",
			duration_minutes: 0,
			is_available: true,
			name: "",
			old_price: 0,
			price: 0,
			service_gallery: [],
		},
	});

	const serviceGallery = form.watch("service_gallery");
	const hasImages = (serviceGallery ?? []).length > 0;
	const isFull = (serviceGallery ?? []).length >= 4;

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const remainingSlots = MAX_IMAGES - selectedFiles.length;
		const filesToAdd = fileArray.slice(0, remainingSlots);

		// Add the actual File objects
		setSelectedFiles((prev) => [...prev, ...filesToAdd]);

		// Add preview URLs to the form field
		const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));
		form.setValue("service_gallery", [
			...(form.getValues("service_gallery") || []),
			...newPreviewUrls,
		]);

		e.target.value = "";
	};

	const removeImage = (index: number) => {
		const imageToRemove = serviceGallery?.[index];

		// If it's a blob URL, remove from selectedFiles
		if (imageToRemove?.startsWith("blob:")) {
			const fileIndex = (serviceGallery ?? [])
				.slice(0, index)
				.filter((url) => url?.startsWith("blob:")).length;

			setSelectedFiles((prev) => prev.filter((_, i) => i !== fileIndex));
		}

		// Remove from form gallery
		const newPhotos = (serviceGallery ?? []).filter((_, i) => i !== index);
		form.setValue("service_gallery", newPhotos, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const onSubmit = async (payload: ServiceAmiCreate) => {
		try {
			let uploadedImagePaths: string[] = [];

			// Upload new files
			if (selectedFiles.length > 0) {
				const imageFormData = new FormData();
				selectedFiles.forEach((file) => {
					imageFormData.append("images", file);
				});

				const customFilename = `${form.getValues("name")}_service_image`;
				imageFormData.append("custom_filename", customFilename);

				const uploadRes = await uploadImagesMutation.mutateAsync({
					formData: imageFormData,
				});

				uploadedImagePaths =
					uploadRes?.map((res) => `http://localhost:3000${res.path}`) || [];
			}

			const response = await createService({
				...payload,
				service_gallery: uploadedImagePaths,
			});

			if (response) {
				form.reset();
				setSelectedFiles([]);
				navigate("/admin/ami/service-management/services");
			}
		} catch (error) {
			console.error("Failed to update service:", error);
		}
	};

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
												const value = e.target.value.replace(/[^\d.]/g, "");
												const numericValue =
													value === "" ? 0 : parseFloat(value);

												field.onChange(numericValue);
											}}
										/>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="old_price"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Old Price</FormCard.Label>
										<PricingInput
											prefix="₱"
											className="text-2xs"
											placeholder="Enter old price"
											value={!field.value ? "" : String(field.value)}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value.replace(/[^\d.]/g, "");
												const numericValue =
													value === "" ? 0 : parseFloat(value);

												field.onChange(numericValue);
											}}
										/>
										<div />
										<FormCard.Description>
											Enter old price to show the price before the discount. If
											new service leave as blank
										</FormCard.Description>
										<div />
										<FormMessage />
									</FormCard.Field>
								)}
							/>

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
											{!hasImages && (
												<div
													className="border-2 border-dashed border-gray-300 rounded-lg p-14 2xl:p-20 text-center hover:border-gray-400 transition-colors flex-1 flex items-center justify-center hover:cursor-pointer"
													onClick={() => {
														if (!isFull)
															document
																.getElementById("service_gallery")
																?.click();
													}}
												>
													<input
														id="service_gallery"
														type="file"
														multiple
														accept="image/*"
														className="hidden"
														disabled={isFull}
														onChange={handleImageChange}
													/>

													<label
														htmlFor="service_gallery"
														className={`cursor-pointer flex flex-col items-center justify-center ${
															isFull ? "opacity-50 cursor-not-allowed" : ""
														}`}
													>
														<UploadCloud className="size-16 text-gray-400 mb-4" />
														<p className="text-sm text-gray-600 mb-1">
															Click to upload or drag and drop
														</p>
														<p className="text-xs text-gray-500">
															PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES})
														</p>
													</label>
												</div>
											)}

											{hasImages && (
												<div className="space-y-4 flex flex-col flex-1 mt-4">
													<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
														{serviceGallery.map((photo, index) => (
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
																	onClick={() => removeImage(index)}
																	className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
																>
																	<X className="w-4 h-4" />
																</button>
															</div>
														))}
													</div>

													{!isFull && (
														<div
															className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors hover:cursor-pointer"
															onClick={() =>
																document
																	.getElementById("service_gallery")
																	?.click()
															}
														>
															<input
																id="service_gallery"
																type="file"
																multiple
																accept="image/*"
																className="hidden"
																disabled={isFull}
																onChange={handleImageChange}
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
																	PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES})
																</p>
															</label>
														</div>
													)}

													{isFull && (
														<div className="bg-secondary/20 border border-secondary/40 rounded-lg p-3 text-center">
															<p className="text-sm text-secondary font-medium">
																Maximum {MAX_IMAGES} images uploaded!
															</p>
														</div>
													)}
												</div>
											)}
										</div>

										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>
						</FormCard.Body>

						<FormCard.Footer className="flex justify-end gap-2">
							<Button
								variant="secondary"
								type="button"
								disabled={!form.formState.isDirty || isCreateServiceLoading}
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
								disabled={!form.formState.isDirty || isCreateServiceLoading}
							>
								Create Service
							</Button>
						</FormCard.Footer>
					</FormCard>
				</div>
			</form>
		</Form>
	);
};

export default CreateServiceForm;
