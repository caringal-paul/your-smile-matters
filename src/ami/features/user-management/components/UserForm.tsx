import { useLocation, useNavigate } from "react-router-dom";

import FormCard from "@/ami/shared/components/custom/card/FormCard";
import SectionHeader from "@/ami/shared/components/custom/header/SectionHeader";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import { Switch } from "@/core/components/base/switch";

import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { ChevronRight } from "lucide-react";

import { formatToTableDate } from "@/ami/shared/helpers/formatDate";
import { Form, FormField } from "@/core/components/base/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreate, userCreateSchema } from "../utils/schemas/user.schema";
import { useForm } from "react-hook-form";
import { Input } from "@/core/components/base/input";

const UserForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isEditForm = location.pathname.includes("edit");

	const form = useForm<UserCreate>({
		resolver: zodResolver(userCreateSchema),
		defaultValues: {
			username: "johndoe",
			email: "johndoe@example.com",
			firstName: "John",
			lastName: "Doe",
			mobileNumber: "1234567890",
			isActive: true,
			roleId: "",
			createdAt: undefined,
			updatedAt: undefined,
			lastLogin: undefined,
		},
	});

	const onSubmit = (values: UserCreate) => {
		console.log(values);
	};

	return (
		<div>
			<SectionHeader>
				<div>
					<Label className="text-md font-normal flex flex-row gap-1 items-center">
						<Button
							variant={"icon"}
							onClick={() => navigate("/admin/ami/user-management/users")}
							className="hover:bg-transparent px-2 text-md font-normal"
						>
							<BackIcon fill="#1C1B1F" className="h-4 w-4" /> Users
						</Button>
						<ChevronRight className="h-4 w-4" />{" "}
						<span className="text-secondary">User Details</span>
					</Label>
				</div>
			</SectionHeader>

			<FormCard>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormCard.Title>User Information</FormCard.Title>
						<FormCard.Body className="grid lg:grid-cols-2 gap-4 space-y-0">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="firstName">
											First Name
										</FormCard.Label>
										<Input
											disabled={!isEditForm}
											placeholder="First name"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="lastName">
											Last Name
										</FormCard.Label>
										<Input
											disabled={!isEditForm}
											placeholder="Last name"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="email">Email</FormCard.Label>
										<Input
											disabled={!isEditForm}
											placeholder="Email"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="username">Username</FormCard.Label>
										<Input
											disabled={!isEditForm}
											placeholder="Username"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>

							<FormField
								control={form.control}
								name="mobileNumber"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1">
										<FormCard.Label htmlFor="mobileNumber">
											Mobile Number
										</FormCard.Label>
										<Input
											disabled={!isEditForm}
											placeholder="Mobile Number"
											type="number"
											{...field}
										/>
									</FormCard.Field>
								)}
							/>

							{/* {isEditForm && (
								<FormCard.Field>
									<FormCard.Label htmlFor="email">Updated On</FormCard.Label>
									<Label className="text-[11px] font-normal">
										{formatToTableDate("2023-09-10T02:20:30.000Z")}
									</Label>
								</FormCard.Field>
							)} */}
							<FormField
								control={form.control}
								name="isActive"
								render={({ field }) => (
									<FormCard.Field className="lg:col-span-1 items-center">
										<FormCard.Label htmlFor="isActive">
											Account Status
										</FormCard.Label>
										<div className="flex gap-2 items-center">
											<Switch
												checked={field.value}
												onCheckedChange={() =>
													form.setValue("isActive", !field.value, {
														shouldValidate: true,
													})
												}
												disabled={!isEditForm}
											/>

											<div className="relative h-7 w-fit flex items-center">
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
						</FormCard.Body>
						{isEditForm && (
							<FormCard.Footer className="flex gap-2 justify-end">
								<Button
									variant="secondary"
									className=""
									onClick={() => {
										form.reset();
										form.clearErrors();
									}}
								>
									Cancel
								</Button>
								<Button className="sm:w-fit" type="submit">
									Save Changes
								</Button>
							</FormCard.Footer>
						)}
					</form>
				</Form>
			</FormCard>
		</div>
	);
};

export default UserForm;
