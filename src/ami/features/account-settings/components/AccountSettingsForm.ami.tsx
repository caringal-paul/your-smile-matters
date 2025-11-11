import { useEffect } from "react";
import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Form, FormField, FormMessage } from "@/core/components/base/form";
import {
	UserAmiUpdate,
	userUpdateSchema,
} from "../../user-management/utils/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectOptions } from "@/core/types/option.types";
import { useUpdateUserMutation } from "../../user-management/queries/updateUser.ami.mutation";
import { useGetAllRolesQuery } from "../../role-and-permission/queries/getRoles.ami.query";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserLoggedInQuery } from "../queries/getCurrentUserLoggedIn.ami.query";

const AccountSettingsForm = () => {
	const navigate = useNavigate();

	const { data: currUserLoggedIn, isLoading: isUserDataFetching } =
		useGetCurrentUserLoggedInQuery();

	const { data: roles = [], isLoading: isRolesDataFetching } =
		useGetAllRolesQuery();

	const { mutateAsync: updateUser, isPending: isUpdateUserLoading } =
		useUpdateUserMutation();

	const roleOptions: SelectOptions[] = roles.map((role) => {
		return {
			label: role.name,
			value: role._id,
			status: role.is_active ? "Active" : "Inactive",
		};
	});

	const form = useForm<UserAmiUpdate>({
		resolver: zodResolver(userUpdateSchema),
		mode: "onChange",
		values: currUserLoggedIn
			? {
					username: currUserLoggedIn.username ?? "",
					email: currUserLoggedIn.email ?? "",
					first_name: currUserLoggedIn.first_name ?? "",
					last_name: currUserLoggedIn.last_name ?? "",
					mobile_number: currUserLoggedIn.mobile_number ?? "",
					role_id: currUserLoggedIn.role_id ?? "",
			  }
			: undefined,
	});

	const onSubmit = async (payload: UserAmiUpdate) => {
		if (!currUserLoggedIn?._id) {
			throw new Error("Error");
		}

		try {
			await updateUser({
				id: currUserLoggedIn._id,
				payload,
			});
		} catch (error) {
			console.error("Failed to update user:", error);
		}
	};

	useEffect(() => {
		if (currUserLoggedIn && roleOptions.length > 0) {
			form.reset({
				username: currUserLoggedIn.username,
				email: currUserLoggedIn.email,
				first_name: currUserLoggedIn.first_name,
				last_name: currUserLoggedIn.last_name,
				mobile_number: currUserLoggedIn.mobile_number,
				role_id: currUserLoggedIn.role_id,
			});

			form.trigger();
		}
	}, [currUserLoggedIn, roles, form]);

	if (isUserDataFetching && isRolesDataFetching) {
		return <>Loading</>;
	}

	return (
		<div>
			<FormCard className="h-fit">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Title>Account Profile</FormCard.Title>
						<FormCard.Body>
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="first_name">
											First Name
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="First name"
											{...field}
										/>
										<div />

										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="last_name">
											Last Name
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Last name"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="email">
											Email address
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Email"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="username">Username</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Username"
											{...field}
										/>
										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="mobile_number"
								render={({ field }) => (
									<FormCard.Field>
										<FormCard.Label htmlFor="mobile_number">
											Mobile Number
										</FormCard.Label>
										<Input
											className="h-7 py-1 text-2xs font-normal placeholder:text-2xs placeholder:font-normal"
											placeholder="Mobile Number"
											type="number"
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
									disabled={!form.formState.isDirty || isUpdateUserLoading}
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
										isUpdateUserLoading
									}
								>
									{isUpdateUserLoading ? "Updating..." : "Save Changes"}
								</Button>
							</div>
						</FormCard.Body>
					</form>
				</Form>
			</FormCard>

			<FormCard className="h-fit">
				<FormCard.Title>Password</FormCard.Title>
				<FormCard.Body>
					<FormCard.Field>
						<FormCard.Label>Change Password</FormCard.Label>

						<Button
							variant="outline"
							size="sm"
							type="button"
							className="w-fit"
							onClick={() => navigate("change-password")}
						>
							Change Password
						</Button>
					</FormCard.Field>
				</FormCard.Body>
			</FormCard>
		</div>
	);
};

export default AccountSettingsForm;
