import { useNavigate } from "react-router-dom";

import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";

import { Form, FormField, FormMessage } from "@/core/components/base/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/core/components/base/input";

import {
	PhotographerAmiCreate,
	photographerCreateSchema,
} from "../utils/schemas/photographer.schema";
import { useCreatePhotographerMutation } from "../queries/createPhotographer.ami.mutation";
import {
	InputWithSuffix,
	MultipleSelectInput,
} from "@/core/components/custom/CustomInput";
import { SERVICE_OPTIONS } from "@/core/constants/options.constants";
import TextAreaEditor from "@/ami/shared/components/input/TextAreaEditor";
import { DEFAULT_WEEKLY_SCHEDULE } from "@/core/constants/schedule.constants";
import { Checkbox } from "@/core/components/base/checkbox";
import { Textarea } from "@/core/components/base/textarea";
import { UploadCloud, X } from "lucide-react";
import AddButtonIcon from "@/ami/shared/assets/icons/AddButtonIcon";
import TrashIcon from "@/ami/shared/assets/icons/TrashIcon";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUploadImagesMutation } from "@/core/queries/uploadImages.mutation";

const MAX_IMAGES = 9;

const CreatePhotographerForm = () => {
	const navigate = useNavigate();

	const uploadImagesMutation = useUploadImagesMutation();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const {
		mutateAsync: createPhotographer,
		isPending: isCreatePhotographerLoading,
	} = useCreatePhotographerMutation();

	const form = useForm<PhotographerAmiCreate>({
		resolver: zodResolver(photographerCreateSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			mobile_number: "",
			bio: "",
			profile_image: "",
			specialties: [],

			photo_gallery: [],

			weekly_schedule: [],

			date_overrides: [],

			booking_lead_time_hours: 1,
			is_active: true,
		},
	});

	const photoGallery = form.watch("photo_gallery") || [];
	const hasImages = (photoGallery ?? []).length > 0;
	const isFull = (photoGallery ?? []).length >= MAX_IMAGES;

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const fileArray = Array.from(files);
		const remainingSlots = MAX_IMAGES - (photoGallery ?? []).length;
		const filesToAdd = fileArray.slice(0, remainingSlots);

		// Add the actual File objects
		setSelectedFiles((prev) => [...prev, ...filesToAdd]);

		// Add preview URLs to the form field
		const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));
		form.setValue("photo_gallery", [
			...(form.getValues("photo_gallery") || []),
			...newPreviewUrls,
		]);

		e.target.value = "";
	};

	const removeImage = (index: number) => {
		const imageToRemove = photoGallery?.[index];

		// If it's a blob URL, remove from selectedFiles
		if (imageToRemove?.startsWith("blob:")) {
			const fileIndex = (photoGallery ?? [])
				.slice(0, index)
				.filter((url) => url?.startsWith("blob:")).length;

			setSelectedFiles((prev) => prev.filter((_, i) => i !== fileIndex));
		}

		// Remove from form gallery
		const newPhotos = (photoGallery ?? []).filter((_, i) => i !== index);
		form.setValue("photo_gallery", newPhotos, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const onSubmit = async (payload: PhotographerAmiCreate) => {
		try {
			let uploadedImagePaths: string[] = [];

			// Upload new files
			if (selectedFiles.length > 0) {
				const imageFormData = new FormData();
				selectedFiles.forEach((file) => {
					imageFormData.append("images", file);
				});

				const customFilename = `${form.getValues("name")}_photographer_image`;
				imageFormData.append("custom_filename", customFilename);

				const uploadRes = await uploadImagesMutation.mutateAsync({
					formData: imageFormData,
				});

				uploadedImagePaths =
					uploadRes?.map((res) => `http://localhost:3000${res.path}`) || [];
			}

			console.log(uploadedImagePaths);

			const response = await createPhotographer({
				...payload,
				photo_gallery: uploadedImagePaths,
			});

			if (response) {
				form.reset();
				setSelectedFiles([]);
				navigate("/admin/ami/photographer-management/photographers");
			}
		} catch (error) {
			console.error("Failed to create photographer:", error);
		}
	};

	useEffect(() => {
		form.setValue("weekly_schedule", DEFAULT_WEEKLY_SCHEDULE);
	}, []);

	return (
		<FormCard className="mb-6">
			<Form {...form}>
				<form>
					<FormCard.Title>Create Photographer Account</FormCard.Title>
					<FormCard.Body>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-1">
									<FormCard.Label htmlFor="name">Name</FormCard.Label>
									<Input placeholder="Name" {...field} />
									<div />
									<FormMessage className="ml-1" />
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-1">
									<FormCard.Label htmlFor="email">Email</FormCard.Label>
									<Input placeholder="Email" {...field} />
									<div />
									<FormMessage className="ml-1" />
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="mobile_number"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-1">
									<FormCard.Label htmlFor="mobile_number">
										Mobile Number
									</FormCard.Label>
									<Input placeholder="Mobile Number" type="string" {...field} />
									<div />
									<FormMessage className="ml-1" />
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="specialties"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-1 lg:items-start">
									<FormCard.Label htmlFor="specialties" className="lg:mt-2">
										Specialties
									</FormCard.Label>
									<MultipleSelectInput
										options={SERVICE_OPTIONS}
										value={field.value}
										onChange={(selectedValues) => {
											field.onChange(selectedValues);
										}}
									/>
									<div />
									<FormMessage className="ml-1" />
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="booking_lead_time_hours"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-1 lg:items-start">
									<FormCard.Label htmlFor="specialties" className="lg:mt-2">
										Advance Notice
									</FormCard.Label>
									<InputWithSuffix
										suffix="hrs"
										type="number"
										placeholder="Set how many hours in advance clients must book before the appointment."
										value={field.value ?? ""}
										onChange={(e) => {
											const value = e.target.value;
											field.onChange(Number(value));
										}}
										onBlur={() => {
											if (String(field.value) !== "") {
												field.onChange(Number(field.value));
											}
										}}
									/>

									<div />
									<Label className="ml-1 text-gray-400 font-light tracking-tighter text-2xs italic">
										Specify how far in advance clients must book to ensure
										consideration. Requests submitted after this period may not
										be accommodated.
									</Label>
									<div />
									<FormMessage className="ml-1" />
								</FormCard.Field>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormCard.Field className={`items-start`}>
									<FormCard.Label>Bio</FormCard.Label>
									<div className="flex flex-row w-full overflow-hidden">
										<TextAreaEditor
											description={field.value}
											onChange={field.onChange}
										/>
									</div>
								</FormCard.Field>
							)}
						/>

						<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
							Photo Gallery
						</FormCard.Title>

						<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
							Photo Gallery
						</FormCard.Title>
						<FormField
							control={form.control}
							name="photo_gallery"
							render={({ field }) => (
								<FormCard.Field className="lg:col-span-2 items-start">
									<FormCard.Label htmlFor="photo_gallery">
										Upload Photos
									</FormCard.Label>
									<div className="w-full">
										{!hasImages && (
											<div
												className="border-2 border-dashed border-gray-300 rounded-lg p-14 2xl:p-20 text-center hover:border-gray-400 transition-colors flex-1 flex items-center justify-center hover:cursor-pointer"
												onClick={() => {
													if (!isFull)
														document.getElementById("photo_gallery")?.click();
												}}
											>
												<input
													id="photo_gallery"
													type="file"
													multiple
													accept="image/*"
													className="hidden"
													disabled={isFull}
													onChange={handleImageChange}
												/>

												<label
													htmlFor="photo_gallery"
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
													{photoGallery.map((photo, index) => (
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
															document.getElementById("photo_gallery")?.click()
														}
													>
														<input
															id="photo_gallery"
															type="file"
															multiple
															accept="image/*"
															className="hidden"
															disabled={isFull}
															onChange={handleImageChange}
														/>

														<label
															htmlFor="photo_gallery"
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

						<FormCard.Title className="pt-3 border-t-[1px] border-dashed">
							Weekly Schedule{" "}
						</FormCard.Title>

						{/* Weekly Schedule Fields */}
						{(form.watch("weekly_schedule") ?? []).map((day, index) => (
							<div
								key={day.day_of_week}
								className="lg:col-span-2 space-y-4 border rounded-lg p-4"
							>
								<h3 className="font-semibold text-lg">{day.day_of_week}</h3>

								{/* Available and Whole Day Checkboxes */}
								<div className="flex items-center justify-start w-fit gap-6">
									<FormField
										control={form.control}
										name={`weekly_schedule.${index}.is_available`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`available-${index}`}
														checked={field.value}
														onCheckedChange={(checked) => {
															field.onChange(checked);

															// Reset all fields if unchecked
															if (!checked) {
																form.setValue(
																	`weekly_schedule.${index}.start_time`,
																	"00:00"
																);
																form.setValue(
																	`weekly_schedule.${index}.end_time`,
																	"24:00"
																);
															}
														}}
													/>
													<FormCard.Label
														htmlFor={`available-${index}`}
														className="!mt-0 cursor-pointer"
													>
														Available
													</FormCard.Label>
												</div>
											</FormCard.Field>
										)}
									/>

									{/* Whole Day Checkbox */}
									{form.watch(`weekly_schedule.${index}.is_available`) && (
										<div className="flex items-center space-x-2 w-[10em]">
											<Checkbox
												id={`whole-day-${index}`}
												checked={
													form.watch(`weekly_schedule.${index}.end_time`) ===
													"24:00"
												}
												onCheckedChange={(checked) => {
													if (checked) {
														form.setValue(
															`weekly_schedule.${index}.start_time`,
															"00:00"
														);
														form.setValue(
															`weekly_schedule.${index}.end_time`,
															"24:00"
														);
													} else {
														form.setValue(
															`weekly_schedule.${index}.end_time`,
															"23:30"
														);
													}

													form.clearErrors(`weekly_schedule.${index}.end_time`);
													form.clearErrors(
														`weekly_schedule.${index}.start_time`
													);
												}}
											/>
											<FormCard.Label
												htmlFor={`available-${index}`}
												className="!mt-0 cursor-pointer"
											>
												Whole Day
											</FormCard.Label>
										</div>
									)}
								</div>

								<div className="grid lg:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`weekly_schedule.${index}.start_time`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<FormCard.Label htmlFor={`start-time-${index}`}>
													Start Time
												</FormCard.Label>

												<Input
													id={`start-time-${index}`}
													type="time"
													step="1800"
													{...field}
													disabled={
														!form.watch(
															`weekly_schedule.${index}.is_available`
														) ||
														form.watch(`weekly_schedule.${index}.end_time`) ===
															"24:00"
													}
													className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none disabled:opacity-50"
													onBlur={(e) => {
														field.onBlur();

														const value = e.target.value;
														if (!value) return;

														const [hours, minutes] = value
															.split(":")
															.map(Number);

														if (minutes % 30 !== 0) {
															const roundedMinutes =
																Math.round(minutes / 30) * 30;
															const adjustedHours =
																roundedMinutes === 60 ? hours + 1 : hours;
															const finalMinutes =
																roundedMinutes === 60 ? 0 : roundedMinutes;

															const formattedTime = `${String(
																adjustedHours % 24
															).padStart(2, "0")}:${String(
																finalMinutes
															).padStart(2, "0")}`;

															field.onChange(formattedTime);
														}
													}}
												/>

												<div />
												<Label className="ml-1 text-gray-400 font-light tracking-tighter text-2xs italic">
													Specify a time, and it will automatically be aligned
													to the nearest 30-minute interval.
												</Label>
												<div />
												<FormMessage className="ml-1" />
											</FormCard.Field>
										)}
									/>

									<FormField
										control={form.control}
										name={`weekly_schedule.${index}.end_time`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<FormCard.Label htmlFor={`end-time-${index}`}>
													End Time
												</FormCard.Label>

												{/* Show special display for 24:00 */}
												{field.value === "24:00" ? (
													<div className="flex h-7 py-1 w-full px-0 shadow-none border-none bg-transparent hover:cursor-default text-gray-500 opacity-50 font-normal text-2xs items-center">
														<span>12:00 AM</span>
													</div>
												) : (
													<Input
														id={`end-time-${index}`}
														type="time"
														step="1800"
														{...field}
														disabled={
															!form.watch(
																`weekly_schedule.${index}.is_available`
															) ||
															form.watch(
																`weekly_schedule.${index}.end_time`
															) === "24:00"
														}
														className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none disabled:opacity-50"
														onBlur={(e) => {
															field.onBlur();

															const value = e.target.value;
															if (!value) return;

															const [hours, minutes] = value
																.split(":")
																.map(Number);

															if (minutes % 30 !== 0) {
																const roundedMinutes =
																	Math.round(minutes / 30) * 30;
																const adjustedHours =
																	roundedMinutes === 60 ? hours + 1 : hours;
																const finalMinutes =
																	roundedMinutes === 60 ? 0 : roundedMinutes;

																const formattedTime = `${String(
																	adjustedHours % 24
																).padStart(2, "0")}:${String(
																	finalMinutes
																).padStart(2, "0")}`;

																field.onChange(formattedTime);
															}
														}}
													/>
												)}
												<div />
												<Label className="ml-1 text-gray-400 font-light tracking-tighter text-2xs italic">
													Specify a time, and it will automatically be aligned
													to the nearest 30-minute interval.
												</Label>
												<div />
												<FormMessage className="ml-1" />
											</FormCard.Field>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={`weekly_schedule.${index}.notes`}
									render={({ field }) => (
										<FormCard.Field className="lg:col-span-1 md:grid-cols-[10%_1fr]">
											<FormCard.Label htmlFor={`notes-${index}`}>
												Notes
											</FormCard.Label>
											<Textarea
												id={`notes-${index}`}
												placeholder="Additional notes for this day"
												{...field}
												disabled={
													!form.watch(`weekly_schedule.${index}.is_available`)
												}
												className="disabled:opacity-50"
											/>
											<div />
											<FormMessage className="ml-1" />
										</FormCard.Field>
									)}
								/>
							</div>
						))}

						<FormCard.Title
							className="pt-3 border-t-[1px] border-dashed flex flex-row justify-between items-center"
							hasSeparator={false}
						>
							Custom Schedule
							<Button
								type="button"
								className="border-[1px] border-foreground bg-transparent text-foreground shadow-none text-xs hover:bg-accent"
								onClick={() => {
									const current = form.getValues("date_overrides") ?? [];
									form.setValue("date_overrides", [
										...current,
										{
											date: new Date(),
											is_available: false,
											custom_hours: {
												start_time: "",
												end_time: "",
											},
											reason: "",
											notes: "",
										},
									]);
								}}
							>
								<AddButtonIcon fill="black" /> Add Custom Schedule
							</Button>
						</FormCard.Title>

						{/* Date Overrides Section */}
						{(form.watch("date_overrides") ?? []).map((override, index) => (
							<div
								key={index}
								className="lg:col-span-2 space-y-4 border rounded-lg p-4"
							>
								<div className="flex justify-between items-center">
									<h3 className="font-semibold text-lg">
										Custom Schedule {index + 1}
									</h3>
									<Button
										type="button"
										variant="icon"
										size="icon"
										onClick={() => {
											const current = form.getValues("date_overrides") ?? [];
											form.setValue(
												"date_overrides",
												current.filter((_, i) => i !== index)
											);
										}}
									>
										<TrashIcon />
									</Button>
								</div>

								{/* Available and Whole Day Checkboxes */}
								<div className="flex items-center justify-start w-fit gap-6">
									<FormField
										control={form.control}
										name={`date_overrides.${index}.is_available`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`override-available-${index}`}
														checked={field.value}
														onCheckedChange={(checked) => {
															field.onChange(checked);

															// Reset custom hours if unchecked
															if (!checked) {
																form.setValue(
																	`date_overrides.${index}.custom_hours.start_time`,
																	"00:00"
																);
																form.setValue(
																	`date_overrides.${index}.custom_hours.end_time`,
																	"12:00"
																);
															}
														}}
													/>
													<FormCard.Label
														htmlFor={`override-available-${index}`}
														className="!mt-0 cursor-pointer text-2xs whitespace-nowrap"
													>
														Available on this date
													</FormCard.Label>
												</div>
											</FormCard.Field>
										)}
									/>

									{/* Whole Day Checkbox */}
									{form.watch(`date_overrides.${index}.is_available`) && (
										<div className="flex items-center space-x-2 w-[10em] justify-end">
											<Checkbox
												id={`override-whole-day-${index}`}
												checked={
													form.watch(
														`date_overrides.${index}.custom_hours.end_time`
													) === "24:00"
												}
												onCheckedChange={(checked) => {
													if (checked) {
														form.setValue(
															`date_overrides.${index}.custom_hours.start_time`,
															"00:00"
														);
														form.setValue(
															`date_overrides.${index}.custom_hours.end_time`,
															"24:00"
														);
													} else {
														form.setValue(
															`date_overrides.${index}.custom_hours.end_time`,
															"23:30"
														);
													}

													form.clearErrors(
														`date_overrides.${index}.custom_hours.end_time`
													);
													form.clearErrors(
														`date_overrides.${index}.custom_hours.start_time`
													);
												}}
											/>
											<FormCard.Label
												htmlFor={`override-whole-day-${index}`}
												className="!mt-0 cursor-pointer text-2xs whitespace-nowrap"
											>
												Whole Day
											</FormCard.Label>
										</div>
									)}
								</div>

								<div className="grid lg:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name={`date_overrides.${index}.date`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<FormCard.Label htmlFor={`override-date-${index}`}>
													Date
												</FormCard.Label>
												<Input
													id={`override-date-${index}`}
													type="date"
													value={
														field.value
															? new Date(field.value)
																	.toISOString()
																	.split("T")[0]
															: ""
													}
													onChange={(e) => {
														field.onChange(new Date(e.target.value));
													}}
												/>
												<div />
												<FormMessage className="ml-1" />
											</FormCard.Field>
										)}
									/>

									<FormField
										control={form.control}
										name={`date_overrides.${index}.reason`}
										render={({ field }) => (
											<FormCard.Field className="lg:col-span-1">
												<FormCard.Label htmlFor={`override-reason-${index}`}>
													Reason
												</FormCard.Label>
												<Input
													id={`override-reason-${index}`}
													placeholder="e.g., Holiday, Vacation"
													{...field}
												/>
												<div />
												<FormMessage className="ml-1" />
											</FormCard.Field>
										)}
									/>
								</div>

								{form.watch(`date_overrides.${index}.is_available`) && (
									<div className="grid lg:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`date_overrides.${index}.custom_hours.start_time`}
											render={({ field }) => (
												<FormCard.Field className="lg:col-span-1">
													<FormCard.Label htmlFor={`override-start-${index}`}>
														Start Time
													</FormCard.Label>
													<Input
														id={`override-start-${index}`}
														type="time"
														step="1800"
														{...field}
														disabled={
															form.watch(
																`date_overrides.${index}.custom_hours.end_time`
															) === "24:00"
														}
														className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none disabled:opacity-50"
														onBlur={(e) => {
															field.onBlur();

															const value = e.target.value;
															if (!value) return;

															const [hours, minutes] = value
																.split(":")
																.map(Number);

															if (minutes % 30 !== 0) {
																const roundedMinutes =
																	Math.round(minutes / 30) * 30;
																const adjustedHours =
																	roundedMinutes === 60 ? hours + 1 : hours;
																const finalMinutes =
																	roundedMinutes === 60 ? 0 : roundedMinutes;

																const formattedTime = `${String(
																	adjustedHours % 24
																).padStart(2, "0")}:${String(
																	finalMinutes
																).padStart(2, "0")}`;

																field.onChange(formattedTime);
															}
														}}
													/>
													<div />
													<Label className="ml-1 text-gray-400 font-light tracking-tighter text-2xs italic">
														Specify a time, and it will automatically be aligned
														to the nearest 30-minute interval.
													</Label>
													<div />
													<FormMessage className="ml-1" />
												</FormCard.Field>
											)}
										/>

										<FormField
											control={form.control}
											name={`date_overrides.${index}.custom_hours.end_time`}
											render={({ field }) => (
												<FormCard.Field className="lg:col-span-1">
													<FormCard.Label htmlFor={`override-end-${index}`}>
														End Time
													</FormCard.Label>

													{/* Show special display for 24:00 */}
													{field.value === "24:00" ? (
														<div className="flex h-7 py-1 w-full px-0 shadow-none border-none bg-transparent hover:cursor-default text-gray-500 opacity-50 font-normal text-2xs items-center">
															<span>12:00 AM</span>
														</div>
													) : (
														<Input
															id={`override-end-${index}`}
															type="time"
															step="1800"
															{...field}
															disabled={
																form.watch(
																	`date_overrides.${index}.custom_hours.end_time`
																) === "24:00"
															}
															className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none disabled:opacity-50"
															onBlur={(e) => {
																field.onBlur();

																const value = e.target.value;
																if (!value) return;

																const [hours, minutes] = value
																	.split(":")
																	.map(Number);

																if (minutes % 30 !== 0) {
																	const roundedMinutes =
																		Math.round(minutes / 30) * 30;
																	const adjustedHours =
																		roundedMinutes === 60 ? hours + 1 : hours;
																	const finalMinutes =
																		roundedMinutes === 60 ? 0 : roundedMinutes;

																	const formattedTime = `${String(
																		adjustedHours % 24
																	).padStart(2, "0")}:${String(
																		finalMinutes
																	).padStart(2, "0")}`;

																	field.onChange(formattedTime);
																}
															}}
														/>
													)}

													<div />
													<Label className="ml-1 text-gray-400 font-light tracking-tighter text-2xs italic">
														Specify a time, and it will automatically be aligned
														to the nearest 30-minute interval.
													</Label>
													<div />
													<FormMessage className="ml-1" />
												</FormCard.Field>
											)}
										/>
									</div>
								)}

								<FormField
									control={form.control}
									name={`date_overrides.${index}.notes`}
									render={({ field }) => (
										<FormCard.Field className="lg:col-span-1 md:grid-cols-[10%_1fr]">
											<FormCard.Label htmlFor={`override-notes-${index}`}>
												Notes
											</FormCard.Label>
											<Textarea
												id={`override-notes-${index}`}
												placeholder="Additional notes"
												{...field}
												disabled={
													!form.watch(`date_overrides.${index}.is_available`)
												}
												className="disabled:opacity-50"
											/>
											<div />
											<FormMessage className="ml-1" />
										</FormCard.Field>
									)}
								/>
							</div>
						))}
					</FormCard.Body>

					<FormCard.Footer className="flex justify-end gap-2 border-dashed border-t-[1px] pt-4">
						<Button
							variant="secondary"
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();

								form.reset();
								form.clearErrors();
							}}
							disabled={!form.formState.isDirty || isCreatePhotographerLoading}
						>
							Clear
						</Button>
						<Button
							className="sm:w-fit"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();

								onSubmit(form.getValues());
							}}
							disabled={
								!form.formState.isDirty ||
								// !form.formState.isValid ||
								isCreatePhotographerLoading
							}
						>
							{isCreatePhotographerLoading
								? "Creating Photographer..."
								: "Create Photographer"}
						</Button>
					</FormCard.Footer>
				</form>
			</Form>
		</FormCard>
	);
};

export default CreatePhotographerForm;
