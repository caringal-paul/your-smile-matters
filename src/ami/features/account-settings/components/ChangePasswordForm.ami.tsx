import { useEffect } from "react";
import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField, FormMessage } from "@/core/components/base/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserLoggedInQuery } from "../queries/getCurrentUserLoggedIn.ami.query";
import { useChangePasswordAmiMutation } from "../queries/changePassword.ami.mutation";
import {
	changePasswordSchema,
	PasswordAmiUpdate,
} from "../utils/schemas/change-password.ami.schema";

const ChangePasswordForm = () => {
	const { data: currUserLoggedIn, isLoading: isUserDataFetching } =
		useGetCurrentUserLoggedInQuery();

	const { mutateAsync: changePassword, isPending: isChangePasswordLoading } =
		useChangePasswordAmiMutation();

	const form = useForm<PasswordAmiUpdate>({
		resolver: zodResolver(changePasswordSchema),
		mode: "onChange",
		defaultValues: {
			current_password: "",
			new_password: "",
			confirm_password: "",
		},
	});

	const onSubmit = async (payload: PasswordAmiUpdate) => {
		if (!currUserLoggedIn?._id) {
			throw new Error("Error");
		}

		try {
			await changePassword({
				id: currUserLoggedIn._id,
				payload,
			});
		} catch (error) {
			console.error("Failed to change password:", error);
		}
	};

	if (isUserDataFetching) {
		return <>Loading</>;
	}

	return (
		<div>
			<FormCard className="h-fit">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Title>Change Password</FormCard.Title>
						<FormCard.Body>
							<FormField
								control={form.control}
								name="current_password"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="current_password">
											Current Password
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Enter current password"
											type="password"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="new_password"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="new_password">
											New Password
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Enter new password"
											type="password"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="confirm_password"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="confirm_password">
											Confirm New Password
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Confirm new password"
											type="password"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<div className="flex gap-2 items-center justify-end mt-4">
								<Button
									variant="secondary"
									size="sm"
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();

										form.reset();
										form.clearErrors();
									}}
									disabled={!form.formState.isDirty || isChangePasswordLoading}
								>
									Cancel
								</Button>
								<Button
									className="w-full sm:w-fit"
									size="sm"
									type="submit"
									disabled={
										!form.formState.isDirty ||
										!form.formState.isValid ||
										isChangePasswordLoading
									}
								>
									{isChangePasswordLoading
										? "Changing Password..."
										: "Change Password"}
								</Button>
							</div>
						</FormCard.Body>
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default ChangePasswordForm;
