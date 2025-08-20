import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormCard from "@/ami/shared/components/custom/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField } from "@/core/components/base/form";
import { cn } from "@/core/lib/utils";
import { Customer, CustomerSchema } from "../utils/schemas/customer.schema";
import { Switch } from "@/core/components/base/switch";
import { Label } from "@/core/components/base/label";
import { useState } from "react";
import ConfirmModal from "@/ami/shared/components/custom/modal/ConfirmModal";

import logs from "../mock/temp-customer-logs.json";
import { CustomerLogTableType } from "../utils/types/customer-logs.types";
import { ActivityLogTable } from "@/ami/shared/components/custom/table/ActivityLogTable";

type CustomerForm = {
	className?: string;
	submitButtonLabel: string;
	cancelButtonLabel: string;
	closeModal?: () => void;
};

const CustomerForm = () => {
	const location = useLocation();
	const isEditForm = location.pathname.includes("edit");

	return (
		<div className="flex flex-col space-y-6 mb-4">
			<CustomerDetails isEditForm={isEditForm} />
			<SecurityQuestions isEditForm={isEditForm} />
			<CustomerActivityLog />
		</div>
	);
};

const CustomerDetails = ({ isEditForm }: { isEditForm: boolean }) => {
	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false);

	const form = useForm<Customer>({
		resolver: zodResolver(CustomerSchema),
		mode: "onChange",
		defaultValues: {
			mobile_number: "+234 201 335 3131",
			status: true,
		},
	});

	const onSubmit = (values: Customer) => {
		console.log(values);
	};

	return (
		<FormCard className={cn("mt-0")}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormCard.Body className="my-2">
						<FormCard.Title hasSeparator={false} className="mb-6">
							Customer Details
						</FormCard.Title>

						<FormCard.Field>
							<FormCard.Label>Customer ID</FormCard.Label>
							<Label className="text-[11px] font-normal">06600003</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>First Name</FormCard.Label>
							<Label className="text-[11px] font-normal">Ngozi</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Surname</FormCard.Label>
							<Label className="text-[11px] font-normal">Kelechi</Label>
						</FormCard.Field>
						<FormCard.Field>
							<FormCard.Label>Email address</FormCard.Label>
							<Label className="text-[11px] font-normal">
								ngozi.kelechi@email.com
							</Label>
						</FormCard.Field>
						{isEditForm && (
							<FormCard.Field>
								<FormCard.Label>Password</FormCard.Label>
								<Button
									className="bg-reset-password border-reset-password-border text-reset-password-text border-[1px] w-fit text-[10px] 2xl:text-[11px] py-0 2xl:py-1 px-3 h-6 2xl:h-7 rounded-md shadow-none hover:bg-slate-300"
									onClick={() => setIsResetPasswordModalOpen(true)}
								>
									Reset Password
								</Button>
							</FormCard.Field>
						)}
						<FormCard.Field>
							<FormCard.Label>BVN</FormCard.Label>
							<Label className="text-[11px] font-normal">23456788769</Label>
						</FormCard.Field>

						<FormField
							control={form.control}
							name="mobile_number"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label>Mobile Number</FormCard.Label>
									<div className="flex flex-row">
										<Input
											disabled={!isEditForm}
											className="text-[11px]"
											{...field}
										/>
									</div>
								</FormCard.Field>
							)}
						/>

						<FormCard.Field>
							<FormCard.Label>Linked Account Number/s</FormCard.Label>
							<Label className="text-[11px] font-normal">
								0006292411 , 0006292419 , 0006292418
							</Label>
						</FormCard.Field>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormCard.Field>
									<FormCard.Label htmlFor="status">
										Account Status
									</FormCard.Label>
									<div className="flex gap-2 items-center">
										<Switch
											checked={field.value}
											onCheckedChange={() =>
												form.setValue("status", !field.value, {
													shouldValidate: true,
												})
											}
											disabled={!isEditForm}
										/>

										<div className="relative h-4 w-fit">
											<Label
												className={`absolute transition-opacity duration-300 text-[11px] font-normal ${
													field.value ? "opacity-0" : "opacity-100"
												}`}
											>
												Inactive
											</Label>
											<Label
												className={`absolute transition-opacity duration-300 text-[11px] font-normal ${
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

						<FormCard.Field>
							<FormCard.Label>Created On</FormCard.Label>
							<Label className="text-[11px] font-normal">
								2023-10-22, 1:05:20 pm
							</Label>
						</FormCard.Field>
					</FormCard.Body>
					{isEditForm && (
						<FormCard.Footer className="flex gap-2 justify-end">
							<Button variant="secondary" disabled={!isEditForm}>
								Delete
							</Button>
							<Button className="sm:w-fit" type="submit" disabled={!isEditForm}>
								Save Changes
							</Button>
						</FormCard.Footer>
					)}
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
							<Label className="text-[11px] font-normal px-2">
								What is the name of your first pet?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-[11px] disabled:bg-disabled disabled:px-2"
								value={"Summer"}
							/>
						</div>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Security Question 2</FormCard.Label>
						<div className="flex flex-col gap-2">
							<Label className="text-[11px] font-normal px-2">
								In what city you were born?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-[11px] disabled:bg-disabled disabled:px-2"
								value={"Abuja"}
							/>
						</div>
					</FormCard.Field>
					<FormCard.Field className="items-start">
						<FormCard.Label>Security Question 3</FormCard.Label>
						<div className="flex flex-col gap-2">
							<Label className="text-[11px] font-normal px-2">
								What is your Mum's maiden name?
							</Label>
							<Input
								disabled
								className="hover:cursor-default text-[11px] disabled:bg-disabled disabled:px-2"
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
	const customerLogs = logs as unknown;

	const customerData = customerLogs as CustomerLogTableType[];

	return <ActivityLogTable data={customerData} />;
};

export default CustomerForm;
