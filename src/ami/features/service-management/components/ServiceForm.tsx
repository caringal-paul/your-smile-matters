import { useForm } from "react-hook-form";
import { useEffect } from "react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";
import { Switch } from "@/core/components/base/switch";
import { Label } from "@/core/components/base/label";
import { useState } from "react";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";
import { useLocation } from "react-router-dom";

import {
	serviceCreateSchema,
	serviceUpdateSchema,
	ServiceAmiCreate,
	ServiceAmiUpdate,
} from "../utils/schemas/service.schema";
import TextAreaEditor from "@/ami/shared/components/custom/input/TextAreaEditor";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";

type ServiceFormData = ServiceAmiCreate | ServiceAmiUpdate;

// Props for the main form (if you want to make it more reusable)
type ServiceFormProps = {
	className?: string;
	submitButtonLabel?: string;
	cancelButtonLabel?: string;
	closeModal?: () => void;
	initialData?: Partial<ServiceAmiCreate>; // For populating existing service data
	onSubmit?: (data: ServiceFormData) => void;
};

const ServiceForm = ({
	className,
	initialData,
	onSubmit: onSubmitProp,
}: ServiceFormProps) => {
	const location = useLocation();
	const isEditForm = location.pathname.includes("edit");

	return (
		<div className="flex flex-col mb-4 space-y-6">
			<ServiceDetails
				isEditForm={isEditForm}
				initialData={initialData}
				onSubmit={onSubmitProp}
			/>
		</div>
	);
};

const ServiceDetails = ({
	isEditForm,
	initialData,
	onSubmit: onSubmitProp,
}: {
	isEditForm: boolean;
	initialData?: Partial<ServiceAmiCreate>;
	onSubmit?: (data: ServiceFormData) => void;
}) => {
	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);

	// Choose schema based on mode
	const schema = isEditForm ? serviceUpdateSchema : serviceCreateSchema;

	const form = useForm<ServiceFormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: isEditForm
			? {
					// For edit mode, use existing data or empty defaults
					name: initialData?.name || "",
					description: initialData?.description || "",
					category: initialData?.category || "Photography",
					is_available: initialData?.is_available ?? true,
					...initialData,
			  }
			: {
					name: initialData?.name,
					description: initialData?.description,
					category: initialData?.category,
					is_available: initialData?.is_available,
			  },
	});

	// Update form when initialData changes (for edit mode)
	useEffect(() => {
		if (isEditForm && initialData) {
			form.reset({
				...initialData,
				is_available: initialData.is_available ?? true,
			});
		}
	}, [initialData, isEditForm, form]);

	const onSubmit = (values: ServiceFormData) => {
		console.log(values);
		onSubmitProp?.(values);
	};

	return (
		<FormCard className={cn("mt-0")}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
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
										{/* {isViewForm ? (
											<div className="font-normal rich-text text-2xs">
												{parse(String(field.value))}
											</div>
										) : ( */}
										<TextAreaEditor
											description={field.value}
											// placeholder="Enter a description"
											onChange={field.onChange}
										/>
										{/* )} */}
									</div>
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
										value={field.value}
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
												<SelectItem value="photography">Photography</SelectItem>
												<SelectItem value="beauty">Beauty</SelectItem>
												<SelectItem value="styling">Styling</SelectItem>
												<SelectItem value="equipment">Equipment</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
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
									</FormCard.Field>
								)}
							/>
						</div>
					</FormCard.Body>

					{/* Form Actions */}
					<FormCard.Footer className="flex justify-end gap-2">
						{isEditForm ? (
							<>
								<Button variant="secondary" type="button">
									Delete
								</Button>
								<Button className="sm:w-fit" type="submit">
									Save Changes
								</Button>
							</>
						) : (
							<>
								<Button variant="secondary" type="button">
									Cancel
								</Button>
								<Button className="sm:w-fit" type="submit">
									Create Service
								</Button>
							</>
						)}
					</FormCard.Footer>
				</form>
			</Form>

			<ConfirmModal
				isConfirmModalOpen={isResetPasswordModalOpen}
				toggleConfirmModal={setIsResetPasswordModalOpen}
				confirmButtonLabel="Send for Approval"
				dismissButtonLabel="Cancel"
				title="Submit Reset Request"
				description="Click 'Send for Approval' to submit the reset request. The approver will review and take the necessary action."
			/>
		</FormCard>
	);
};

export default ServiceForm;
