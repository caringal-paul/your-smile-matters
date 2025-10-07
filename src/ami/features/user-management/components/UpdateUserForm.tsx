import { useNavigate, useParams } from "react-router-dom";

import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import { Switch } from "@/core/components/base/switch";

import { Form, FormField, FormMessage } from "@/core/components/base/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAmiUpdate, userUpdateSchema } from "../utils/schemas/user.schema";
import { useForm } from "react-hook-form";
import { Input } from "@/core/components/base/input";

import { SelectOptions } from "@/core/types/option.types";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { useGetUserByIdQuery } from "../queries/getUserById.ami.query";
import { useUpdateUserMutation } from "../queries/updateUser.ami.mutation";
import { useGetAllRolesQuery } from "../../role-and-permission/queries/getRoles.ami.query";
import { useEffect } from "react";

const UpdateUserForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: userWithRoleAndPermissions, isLoading: isUserDataFetching } =
		useGetUserByIdQuery(id!);

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
		values: userWithRoleAndPermissions
			? {
					username: userWithRoleAndPermissions.username ?? "",
					email: userWithRoleAndPermissions.email ?? "",
					first_name: userWithRoleAndPermissions.first_name ?? "",
					last_name: userWithRoleAndPermissions.last_name ?? "",
					mobile_number: userWithRoleAndPermissions.mobile_number ?? "",
					is_active: userWithRoleAndPermissions.is_active ?? false,
					role_id: userWithRoleAndPermissions.role_id ?? "",
			  }
			: undefined,
	});

	const onSubmit = async (payload: UserAmiUpdate) => {
		if (!userWithRoleAndPermissions?._id) {
			throw new Error("Error");
		}

		try {
			const response = await updateUser({
				id: userWithRoleAndPermissions._id,
				payload,
			});

			if (response) {
				navigate("/admin/ami/user-management/users");
			}
		} catch (error) {
			console.error("Failed to create user:", error);
		}
	};

	useEffect(() => {
		if (userWithRoleAndPermissions && roleOptions.length > 0) {
			form.reset({
				username: userWithRoleAndPermissions.username,
				email: userWithRoleAndPermissions.email,
				first_name: userWithRoleAndPermissions.first_name,
				last_name: userWithRoleAndPermissions.last_name,
				mobile_number: userWithRoleAndPermissions.mobile_number,
				is_active: userWithRoleAndPermissions.is_active,
				role_id: userWithRoleAndPermissions.role_id,
			});

			form.trigger();
		}
	}, [userWithRoleAndPermissions, roles, form]);

	if (isUserDataFetching && isRolesDataFetching) {
		return <>Loading</>;
	}

	return (
		<div>
			<FormCard>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Title>Edit User Information</FormCard.Title>
						<FormCard.Body className="grid gap-4 space-y-0 lg:grid-cols-2">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="first_name">
											First Name
										</FormCard.Label>
										<Input placeholder="First name" {...field} />

										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="last_name">
											Last Name
										</FormCard.Label>
										<Input placeholder="Last name" {...field} />

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
								name="username"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="username">Username</FormCard.Label>
										<Input placeholder="Username" {...field} />

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
										<Input
											placeholder="Mobile Number"
											type="number"
											{...field}
										/>

										<div />
										<FormMessage className="ml-1" />
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="is_active"
								render={({ field }) => (
									<FormCard.Field className="items-center lg:col-span-1">
										<FormCard.Label htmlFor="isActive">
											Account Status
										</FormCard.Label>
										<div className="flex items-center gap-2">
											<Switch
												checked={field.value}
												onCheckedChange={() =>
													form.setValue("is_active", !field.value, {
														shouldValidate: true,
													})
												}
											/>

											<div className="relative flex items-center h-7 w-fit">
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

							<FormField
								control={form.control}
								name="role_id"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="role_id">Role</FormCard.Label>
										<Select
											value={field.value || ""}
											onValueChange={(value) => field.onChange(value)}
										>
											<SelectTrigger
												className={`w-full ${
													!field.value ? "text-gray-400" : "text-foreground"
												}`}
											>
												<SelectValue placeholder="Select role" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{roleOptions.map((role) => {
														return (
															<SelectItem value={role.value} id={role.value}>
																{role.label}
															</SelectItem>
														);
													})}
												</SelectGroup>
											</SelectContent>
										</Select>

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
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();

									form.reset();
									form.clearErrors();
								}}
								disabled={!form.formState.isDirty || isUpdateUserLoading}
							>
								Clear
							</Button>
							<Button
								className="sm:w-fit"
								type="submit"
								disabled={
									!form.formState.isDirty ||
									!form.formState.isValid ||
									isUpdateUserLoading
								}
							>
								{isUpdateUserLoading ? "Updating User..." : "	Save Changes"}
							</Button>
						</FormCard.Footer>
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default UpdateUserForm;
