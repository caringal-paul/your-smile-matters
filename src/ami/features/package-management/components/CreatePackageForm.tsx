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

import {
	packageCreateSchema,
	PackageAmiCreate,
} from "../utils/schemas/package.schema";
import TextAreaEditor from "@/ami/shared/components/input/TextAreaEditor";
import { PricingInput } from "@/core/components/custom/CustomInput";
import { useGetAllServicesQuery } from "../../service-management/queries/getServices.ami.query";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { Plus, Trash2, UploadCloud, X } from "lucide-react";
import { IncludedService } from "@/core/models/package.model";
import { Badge } from "@/core/components/base/badge";
import { useCreatePackageMutation } from "../queries/createPackage.ami.mutation";
import { useUploadImageMutation } from "@/core/queries/uploadImage.mutation";

const CreatePackageForm = () => {
	const navigate = useNavigate();

	const { data: services = [], isLoading: isServicesFetching } =
		useGetAllServicesQuery();

	const { mutateAsync: createPackage, isPending: isCreatePackageLoading } =
		useCreatePackageMutation();

	const uploadImageMutation = useUploadImageMutation();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const [showAddService, setShowAddService] = useState(false);
	const [selectedServiceId, setSelectedServiceId] = useState<string>("");
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

	const form = useForm<PackageAmiCreate>({
		resolver: zodResolver(packageCreateSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			package_price: 0,
			looks: 0,
			services: [],
			is_available: true,
			description: "",
			image: "",
			custom_duration_minutes: undefined,
		},
	});

	const onSubmit = async (payload: PackageAmiCreate) => {
		try {
			let uploadedImage = "";

			if (selectedFile) {
				const imageFormData = new FormData();
				imageFormData.append("image", selectedFile);

				const customFilename = `${form.getValues("name")}_package_image`;

				imageFormData.append("custom_filename", customFilename);

				const uploadResult = await uploadImageMutation.mutateAsync({
					formData: imageFormData,
				});

				if (uploadResult?.path) {
					uploadedImage = `http://localhost:3000${uploadResult.path}`;
					form.setValue("image", `http://localhost:3000${uploadResult.path}`);
				}
			}

			const response = await createPackage({
				...payload,
				image: uploadedImage,
			});

			if (response) {
				navigate("/admin/ami/package-management/packages");
			}
		} catch (error) {
			console.error("Failed to update Package:", error);
		}
	};

	const handleAddService = () => {
		if (!selectedServiceId) return;

		const service = services.find((s) => s._id === selectedServiceId);
		if (!service) return;

		const currentServices = form.getValues("services") ?? [];

		// Check if service already exists
		const existingIndex = currentServices.findIndex(
			(s) => s.service_id === selectedServiceId
		);

		if (existingIndex >= 0) {
			// Update existing service quantity
			const updated = [...currentServices];
			updated[existingIndex] = {
				...updated[existingIndex],
				quantity: updated[existingIndex].quantity + selectedQuantity,
				total_price:
					updated[existingIndex].price_per_unit *
					(updated[existingIndex].quantity + selectedQuantity),
			};
			form.setValue("services", updated, {
				shouldValidate: true,
				shouldDirty: true,
			});
		} else {
			// Add new service
			const newService: IncludedService = {
				service_id: selectedServiceId,
				quantity: selectedQuantity,
				price_per_unit: service.price,
				total_price: service.price * selectedQuantity,
				duration_minutes: service.duration_minutes ?? 120,
			};

			form.setValue("services", [...currentServices, newService], {
				shouldValidate: true,
				shouldDirty: true,
			});
		}

		// Reset form
		setSelectedServiceId("");
		setSelectedQuantity(1);
		setShowAddService(false);
	};

	if (isServicesFetching) {
		return (
			<div className="flex items-center justify-center h-40">
				<div className="w-6 h-6 border-2 rounded-full animate-spin border-primary border-t-transparent" />
				<span className="ml-2 text-sm text-muted-foreground">
					Please Wait...
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col mb-4 space-y-6">
			<FormCard className={cn("mt-0")}>
				<Form {...form}>
					<form>
						<FormCard.Body className="my-2">
							<FormCard.Title hasSeparator>Create Package</FormCard.Title>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Package Name</FormCard.Label>
										<Input
											className="text-2xs"
											disabled={isCreatePackageLoading}
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
								render={({ field }) => (
									<FormCard.Field className="items-start">
										<FormCard.Label>Description</FormCard.Label>
										<div className="flex flex-row w-full overflow-hidden">
											<TextAreaEditor
												description={field.value ?? ""}
												onChange={(val) =>
													form.setValue("description", val, {
														shouldDirty: true,
														shouldValidate: true,
													})
												}
											/>
										</div>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="package_price"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Package Price</FormCard.Label>
										<PricingInput
											prefix="₱"
											disabled={isCreatePackageLoading}
											value={!field.value ? "" : String(field.value)}
											onChange={(e) => {
												const raw = e.target.value.replace(/[^\d.]/g, "");
												const num = raw === "" ? 0 : parseFloat(raw);
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
										<FormCard.Label>No. of Looks</FormCard.Label>
										<div className="relative w-full">
											<Input
												type="number"
												disabled={isCreatePackageLoading}
												className="pr-10 text-2xs"
												placeholder="Enter no of looks"
												value={field.value ?? ""}
												onChange={(e) => {
													const raw = e.target.value;
													field.onChange(raw === "" ? undefined : Number(raw));
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
											<FormCard.Label htmlFor="is_available">
												Availability
											</FormCard.Label>
											<div className="flex items-center gap-2">
												<Switch
													disabled={isCreatePackageLoading}
													checked={field.value}
													onCheckedChange={(checked) => {
														field.onChange(checked);
													}}
												/>
												<div className="relative h-4 w-fit">
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
											<FormMessage className="ml-1" />
										</FormCard.Field>
									)}
								/>
							</div>

							<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
								Package Services
							</FormCard.Title>

							<FormField
								control={form.control}
								name="services"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-2 items-start">
										<FormCard.Label className="flex flex-col gap-1">
											Included Services <FormMessage />
										</FormCard.Label>

										<div className="space-y-3 w-full">
											{showAddService && (
												<div className="p-4 space-y-4 border-[1px] border-border rounded-lg bg-white">
													<div className="flex items-center justify-between">
														<h3 className="text-sm font-semibold">
															Add New Service
														</h3>
														<Button
															type="button"
															disabled={isCreatePackageLoading}
															className="size-6 p-0 hover:bg-transparent bg-transparent hover:text-foreground text-foreground hover:scale-125 shadow-none transition-all"
															onClick={() => {
																setShowAddService(false);
																setSelectedServiceId("");
																setSelectedQuantity(1);
															}}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>

													<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
														<div>
															<Label className="text-xs">Select Service</Label>
															<Select
																value={selectedServiceId}
																onValueChange={setSelectedServiceId}
																disabled={isCreatePackageLoading}
															>
																<SelectTrigger>
																	<SelectValue placeholder="Choose a service" />
																</SelectTrigger>
																<SelectContent>
																	<SelectGroup>
																		<SelectLabel>
																			Available Services
																		</SelectLabel>
																		{services
																			.filter(
																				(s) =>
																					!field.value?.some(
																						(fs) => fs.service_id === s._id
																					)
																			)
																			.map((service) => (
																				<SelectItem
																					key={service._id}
																					value={service._id}
																				>
																					<div className="flex items-center justify-between w-full gap-2">
																						<Label className="text-xs">
																							{service.name}
																						</Label>
																						<Badge className="xl:text-3xs 2xl:text-2xs">
																							{service.is_available
																								? "Available"
																								: "Unavailable"}
																						</Badge>
																					</div>
																				</SelectItem>
																			))}
																	</SelectGroup>
																</SelectContent>
															</Select>
														</div>

														<div>
															<Label className="text-xs">Quantity</Label>
															<div className="flex items-center gap-2">
																<button
																	type="button"
																	disabled={isCreatePackageLoading}
																	className="hover:scale-125 transition-all"
																	onClick={() =>
																		setSelectedQuantity(
																			Math.max(1, selectedQuantity - 1)
																		)
																	}
																>
																	-
																</button>
																<Input
																	type="number"
																	min="1"
																	value={selectedQuantity}
																	onChange={(e) =>
																		setSelectedQuantity(
																			Math.max(1, Number(e.target.value))
																		)
																	}
																	className="text-center"
																/>
																<button
																	type="button"
																	disabled={isCreatePackageLoading}
																	className="hover:scale-125 transition-all"
																	onClick={() =>
																		setSelectedQuantity(selectedQuantity + 1)
																	}
																>
																	+
																</button>
															</div>
														</div>
													</div>

													{/* Preview */}
													{selectedServiceId &&
														(() => {
															const service = services.find(
																(s) => s._id === selectedServiceId
															);
															if (!service) return null;
															return (
																<div className="p-3 space-y-2 rounded-lg bg-muted/30 border">
																	<Label>Preview</Label>
																	<div className="space-y-1">
																		<div className="flex justify-between text-xs">
																			<Label className="text-muted-foreground">
																				Price per unit:
																			</Label>
																			<Label className="font-semibold text-foreground">
																				₱{service.price.toLocaleString()}
																			</Label>
																		</div>
																		<div className="flex justify-between text-xs">
																			<span className="text-muted-foreground">
																				Duration:
																			</span>
																			<span className="font-semibold text-foreground">
																				{service.duration_minutes
																					? `${service.duration_minutes} min`
																					: "Not specified"}
																			</span>
																		</div>
																		<div className="flex justify-between pt-2 mt-2 border-t">
																			<Label className="font-medium">
																				Total Price:
																			</Label>
																			<Label className="font-bold text-destructive">
																				₱
																				{(
																					service.price * selectedQuantity
																				).toLocaleString()}
																			</Label>
																		</div>
																	</div>
																</div>
															);
														})()}

													<Button
														type="button"
														className="w-full"
														onClick={handleAddService}
														disabled={
															!selectedServiceId || isCreatePackageLoading
														}
													>
														Add to Package
													</Button>
												</div>
											)}

											{/* Selected Services List - Card Style */}
											{field.value && field.value.length > 0 ? (
												<div className="space-y-2 max-h-96 overflow-auto scrollbar-small">
													{field.value.map((service, index) => {
														const serviceInfo = services.find(
															(s) => s._id === service.service_id
														);
														return (
															<div
																key={service.service_id}
																className="relative p-4 border border-dashed rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
															>
																{/* Service Info */}
																<div className="pr-20">
																	<p className="text-sm font-medium mb-1">
																		{serviceInfo?.name ?? "Unknown Service"}
																	</p>
																	<p className="text-xs text-muted-foreground mb-2">
																		₱{service.price_per_unit.toLocaleString()}{" "}
																		per unit
																	</p>

																	{/* Details */}
																	<div className="flex flex-col space-y-1">
																		<div className="flex items-center gap-2 text-xs">
																			<span className="text-muted-foreground">
																				Quantity:
																			</span>
																			<div className="flex items-center gap-1">
																				<button
																					type="button"
																					disabled={isCreatePackageLoading}
																					className="h-6 w-6 hover:scale-125 transition-all"
																					onClick={() => {
																						const updated = [...field.value!];
																						if (updated[index].quantity > 1) {
																							updated[index] = {
																								...updated[index],
																								quantity:
																									updated[index].quantity - 1,
																								total_price:
																									updated[index]
																										.price_per_unit *
																									(updated[index].quantity - 1),
																							};
																							field.onChange(updated);
																						}
																					}}
																				>
																					-
																				</button>
																				<span className="w-8 text-center font-medium text-2xs">
																					{service.quantity}
																				</span>
																				<button
																					type="button"
																					disabled={isCreatePackageLoading}
																					className="h-6 w-6 hover:scale-125 transition-all"
																					onClick={() => {
																						const updated = [...field.value!];
																						updated[index] = {
																							...updated[index],
																							quantity:
																								updated[index].quantity + 1,
																							total_price:
																								updated[index].price_per_unit *
																								(updated[index].quantity + 1),
																						};
																						field.onChange(updated);
																					}}
																				>
																					+
																				</button>
																			</div>
																		</div>

																		<div className="flex items-center gap-2 text-xs">
																			<span className="text-muted-foreground">
																				Total:
																			</span>
																			<span className="font-semibold">
																				₱{service.total_price.toLocaleString()}
																			</span>
																		</div>

																		{service.duration_minutes && (
																			<div className="flex items-center gap-2 text-xs">
																				<span className="text-muted-foreground">
																					Duration:
																				</span>
																				<span>
																					{service.duration_minutes *
																						service.quantity}{" "}
																					min
																				</span>
																			</div>
																		)}
																	</div>
																</div>

																{/* Delete Button - Top Right */}
																<Button
																	type="button"
																	variant="ghost"
																	disabled={isCreatePackageLoading}
																	size="icon"
																	className="absolute top-3 right-3 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
																	onClick={() => {
																		const updated = field.value!.filter(
																			(_, i) => i !== index
																		);
																		field.onChange(updated);
																	}}
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</div>
														);
													})}

													{/* Summary Footer */}
													<div className="flex justify-between items-center pt-3 px-2 border-t border-dashed">
														<div className="text-sm">
															<span className="text-muted-foreground">
																Total Cost:{" "}
															</span>
															<span className="font-bold text-base text-destructive">
																₱
																{field.value
																	.reduce((sum, s) => sum + s.total_price, 0)
																	.toLocaleString()}
															</span>
														</div>
														<div className="text-sm">
															<span className="text-muted-foreground">
																Total Duration:{" "}
															</span>
															<span className="font-semibold text-primary">
																{field.value.reduce(
																	(sum, s) =>
																		sum +
																		(s.duration_minutes ?? 0) * s.quantity,
																	0
																)}{" "}
																min
															</span>
														</div>
													</div>
												</div>
											) : (
												<div className="text-center py-8 px-4 border border-dashed rounded-lg bg-muted/20">
													<p className="text-sm text-muted-foreground">
														No services added yet
													</p>
													<p className="text-xs text-muted-foreground mt-1">
														Click the button below to add services to this
														package
													</p>
												</div>
											)}

											{/* Add Service Button */}
											<Button
												type="button"
												className="w-full"
												disabled={isCreatePackageLoading}
												onClick={() => setShowAddService(true)}
											>
												<Plus className="w-4 h-4 mr-2" />
												Add Service
											</Button>
										</div>
									</FormCard.Field>
								)}
							/>

							<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
								Package Image
							</FormCard.Title>

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-2 items-start">
										<FormCard.Label htmlFor="image">
											Upload Package Image
										</FormCard.Label>
										<div className="w-full">
											{!field.value && (
												<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
													<input
														id="image"
														type="file"
														accept="image/*"
														className="hidden"
														onChange={(e) => {
															const file = e.target.files?.[0];
															if (file) {
																setSelectedFile(file);
																const imageUrl = URL.createObjectURL(file);
																setPreviewUrl(imageUrl);

																field.onChange(imageUrl);
															}
														}}
													/>
													<label
														htmlFor="image"
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
											)}

											{field.value && (
												<div className="mt-4 relative group w-full md:w-1/2">
													<img
														src={
															previewUrl ||
															field.value ||
															"/sf/ysm-profile-fallback.jpg"
														}
														alt="Uploaded image"
														onError={(e) => {
															e.currentTarget.src = "/sf/ysm-card-fallback.png";
														}}
														className="aspect-square object-cover rounded-lg border border-gray-200"
													/>
													<button
														type="button"
														onClick={(e) => {
															e.preventDefault();
															setSelectedFile(null);
															setPreviewUrl("");
															field.onChange("");
														}}
														className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
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
								disabled={!form.formState.isDirty || isCreatePackageLoading}
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
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									isCreatePackageLoading
								}
								onClick={() => {
									onSubmit(form.getValues());
								}}
								type="button"
							>
								Create Package
							</Button>
						</FormCard.Footer>
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default CreatePackageForm;
