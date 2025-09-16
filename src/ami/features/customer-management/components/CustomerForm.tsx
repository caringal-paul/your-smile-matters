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
	customerCreateSchema,
	customerUpdateSchema,
	CustomerCreate,
	CustomerUpdate,
} from "../utils/schemas/customer.schema";

type CustomerFormData = CustomerCreate | CustomerUpdate;

// Props for the main form (if you want to make it more reusable)
type CustomerFormProps = {
	className?: string;
	submitButtonLabel?: string;
	cancelButtonLabel?: string;
	closeModal?: () => void;
	initialData?: Partial<CustomerCreate>; // For populating existing customer data
	onSubmit?: (data: CustomerFormData) => void;
};

const CustomerForm = ({
	className,
	initialData,
	onSubmit: onSubmitProp,
}: CustomerFormProps) => {
	const location = useLocation();
	const isEditForm = location.pathname.includes("edit");

	return (
		<div className="flex flex-col space-y-6 mb-4">
			<CustomerDetails
				isEditForm={isEditForm}
				initialData={initialData}
				onSubmit={onSubmitProp}
			/>
			<SecurityQuestions isEditForm={isEditForm} />
			<CustomerActivityLog />
		</div>
	);
};

const CustomerDetails = ({
	isEditForm,
	initialData,
	onSubmit: onSubmitProp,
}: {
	isEditForm: boolean;
	initialData?: Partial<CustomerCreate>;
	onSubmit?: (data: CustomerFormData) => void;
}) => {
	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);

	// Choose schema based on mode
	const schema = isEditForm ? customerUpdateSchema : customerCreateSchema;

	const form = useForm<CustomerFormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: isEditForm
			? {
					// For edit mode, use existing data or empty defaults
					mobile_number: initialData?.mobile_number || "",
					is_active: initialData?.is_active ?? true,
					email: initialData?.email || "",
					first_name: initialData?.first_name || "",
					last_name: initialData?.last_name || "",
					...initialData,
			  }
			: {
					// For create mode, use defaults
					mobile_number: "+234 201 335 3131",
					is_active: true,
					country: "Philippines",
			  },
	});

	// Update form when initialData changes (for edit mode)
	useEffect(() => {
		if (isEditForm && initialData) {
			form.reset({
				...initialData,
				is_active: initialData.is_active ?? true,
			});
		}
	}, [initialData, isEditForm, form]);

	const onSubmit = (values: CustomerFormData) => {
		console.log(values);
		onSubmitProp?.(values);
	};

	return (
		<FormCard className={cn("mt-0")}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormCard.Body className="my-2">
						<FormCard.Title hasSeparator={false} className="mb-6">
							Customer Details
						</FormCard.Title>

						{/* Customer ID - only show in edit mode */}
						{isEditForm && (
							<FormCard.Field>
								<FormCard.Label>Customer ID</FormCard.Label>
								<Label className="text-2xs font-normal">
									{/* {initialData?.id || "06600003"} */}
								</Label>
							</FormCard.Field>
						)}

						{/* First Name Field */}
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>First Name</FormCard.Label>
									{isEditForm ? (
										<Label className="text-2xs font-normal">
											{field.value || "Ngozi"}
										</Label>
									) : (
										<Input
											className="text-2xs"
											placeholder="Enter first name"
											{...field}
										/>
									)}
								</FormCard.Field>
							)}
						/>

						{/* Last Name Field */}
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Surname</FormCard.Label>
									{isEditForm ? (
										<Label className="text-2xs font-normal">
											{field.value || "Kelechi"}
										</Label>
									) : (
										<Input
											className="text-2xs"
											placeholder="Enter last name"
											{...field}
										/>
									)}
								</FormCard.Field>
							)}
						/>

						{/* Email Field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Email address</FormCard.Label>
									{isEditForm ? (
										<Label className="text-2xs font-normal">
											{field.value || "ngozi.kelechi@email.com"}
										</Label>
									) : (
										<Input
											className="text-2xs"
											placeholder="Enter email address"
											type="email"
											{...field}
										/>
									)}
								</FormCard.Field>
							)}
						/>

						{/* Password - only show reset button in edit mode */}
						{isEditForm && (
							<FormCard.Field>
								<FormCard.Label>Password</FormCard.Label>
								<Button
									type="button"
									className="bg-reset-password border-reset-password-border text-reset-password-text border-[1px] w-fit text-[10px] 2xl:text-2xs py-0 2xl:py-1 px-3 h-6 2xl:h-7 rounded-md shadow-none hover:bg-slate-300"
									onClick={() => setIsResetPasswordModalOpen(true)}
								>
									Reset Password
								</Button>
							</FormCard.Field>
						)}

						{/* Password field for create mode */}
						{!isEditForm && (
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Password</FormCard.Label>
										<Input
											className="text-2xs"
											placeholder="Enter password"
											type="password"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>
						)}

						{/* Gender Field - only for create mode */}
						{!isEditForm && (
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label>Gender</FormCard.Label>
										<select className="text-2xs p-2 border rounded" {...field}>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</select>
									</FormCard.Field>
								)}
							/>
						)}

						{/* BVN - display only */}
						<FormCard.Field>
							<FormCard.Label>BVN</FormCard.Label>
							<Label className="text-2xs font-normal">23456788769</Label>
						</FormCard.Field>

						{/* Mobile Number */}
						<FormField
							control={form.control}
							name="mobile_number"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Mobile Number</FormCard.Label>
									<div className="flex flex-row">
										<Input
											disabled={!isEditForm}
											className="text-2xs"
											placeholder="Enter mobile number"
											{...field}
										/>
									</div>
								</FormCard.Field>
							)}
						/>

						{/* Linked Account Numbers - display only */}
						<FormCard.Field>
							<FormCard.Label>Linked Account Number/s</FormCard.Label>
							<Label className="text-2xs font-normal">
								0006292411 , 0006292419 , 0006292418
							</Label>
						</FormCard.Field>

						{/* Account Status */}
						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label htmlFor="is_active">
										Account Status
									</FormCard.Label>
									<div className="flex gap-2 items-center">
										<Switch
											checked={field.value}
											onCheckedChange={(checked) => {
												field.onChange(checked);
											}}
											disabled={!isEditForm}
										/>

										<div className="relative h-4 w-fit">
											<Label
												className={`absolute transition-opacity duration-300 text-2xs font-normal ${
													field.value ? "opacity-0" : "opacity-100"
												}`}
											>
												Inactive
											</Label>
											<Label
												className={`absolute transition-opacity duration-300 text-2xs font-normal ${
													field.value ? "opacity-100" : "opacity-0"
												}`}
											>
												Active
											</Label>
										</div>
									</div>
								</FormCard.Field>
							)}
						/>

						{/* Created On - only show in edit mode */}
						{/* {isEditForm && (
							<FormCard.Field>
								<FormCard.Label>Created On</FormCard.Label>
								<Label className="text-2xs font-normal">
									{initialData?.created_at
										? new Date(initialData.created_at).toLocaleString()
										: "2023-10-22, 1:05:20 pm"}
								</Label>
							</FormCard.Field>
						)} */}
					</FormCard.Body>

					{/* Form Actions */}
					<FormCard.Footer className="flex gap-2 justify-end">
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
									Create Customer
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

const SecurityQuestions = ({ isEditForm }: { isEditForm: boolean }) => {
	const [isResetQuestionModalOpen, setIsResetQuestionModalOpen] =
		useState(false);

	return (
		<FormCard className={cn("mt-0")}>
			<FormCard.Body className="my-2">
				<FormCard.Title className="flex items-center">
					Security Questions
					{isEditForm && (
						<div className="ml-auto">
							<Button
								variant="edit"
								className="p-0 h-5 text-xs font-light"
								onClick={() => setIsResetQuestionModalOpen(true)}
							>
								Reset Security Questions
							</Button>
						</div>
					)}
				</FormCard.Title>
				<div className="flex flex-col gap-4 pt-4">
					<FormCard.Field className="items-start">
						<FormCard.Label>Security Question 1</FormCard.Label>
						<div className="flex flex-col gap-2">
							<Label className="text-2xs font-normal px-2">
								What is the name of your first pet?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-2xs disabled:bg-disabled disabled:px-2"
								value={"Summer"}
							/>
						</div>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Security Question 2</FormCard.Label>
						<div className="flex flex-col gap-2">
							<Label className="text-2xs font-normal px-2">
								In what city you were born?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-2xs disabled:bg-disabled disabled:px-2"
								value={"Abuja"}
							/>
						</div>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Security Question 3</FormCard.Label>
						<div className="flex flex-col gap-2">
							<Label className="text-2xs font-normal px-2">
								What is your Mum's maiden name?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-2xs disabled:bg-disabled disabled:px-2"
								value={"Obi"}
							/>
						</div>
					</FormCard.Field>
				</div>
			</FormCard.Body>

			<ConfirmModal
				isConfirmModalOpen={isResetQuestionModalOpen}
				toggleConfirmModal={setIsResetQuestionModalOpen}
				confirmButtonLabel="Send for Approval"
				dismissButtonLabel="Cancel"
				title="Submit Reset Request"
				description="Click 'Send for Approval' to submit the reset request. The approver will review and take the necessary action."
			/>
		</FormCard>
	);
};

const CustomerActivityLog = () => {
	// You'll need to import these
	// const customerLogs = logs as unknown;
	// const customerData = customerLogs as CustomerLogTableType[];
	// return <ActivityLogTable data={customerData} />;

	return <div>Activity Log Component</div>;
};

export default CustomerForm;
