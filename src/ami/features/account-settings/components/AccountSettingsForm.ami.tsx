import { useEffect, useState } from "react";
import FormCard from "@/ami/shared/components/card/FormCard";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
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
import { useUploadImageMutation } from "@/core/queries/uploadImage.mutation";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import { getInitials } from "@/core/helpers/getInitials";
import CameraIcon from "@/ami/shared/assets/icons/CameraIcon";
import LoadingFallback from "@/core/components/custom/LoadingFallback";

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
					profile_image: currUserLoggedIn.profile_image ?? "",
					role_id: currUserLoggedIn.role_id ?? "",
			  }
			: undefined,
	});

	const uploadImageMutation = useUploadImageMutation();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const onSubmit = async (payload: UserAmiUpdate) => {
		if (!currUserLoggedIn?._id) {
			throw new Error("Error");
		}

		try {
			let uploadedImagePath = payload.profile_image;

			if (selectedFile) {
				const imageFormData = new FormData();
				imageFormData.append("image", selectedFile);

				const customFilename = `${form.getValues("username")}_profile_image`;

				imageFormData.append("custom_filename", customFilename);

				const uploadResult = await uploadImageMutation.mutateAsync({
					formData: imageFormData,
				});

				if (uploadResult?.path) {
					uploadedImagePath = `http://localhost:3000${uploadResult.path}`;
				}
			}

			await updateUser({
				id: currUserLoggedIn._id,
				payload: { ...payload, profile_image: uploadedImagePath },
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
				profile_image: currUserLoggedIn.profile_image,
				role_id: currUserLoggedIn.role_id,
			});

			form.trigger();
		}
	}, [currUserLoggedIn, roles, form]);

	if (isUserDataFetching && isRolesDataFetching) {
		return <LoadingFallback />;
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
								name="profile_image"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Profile Image</FormLabel>
										<div className="w-full flex justify-center">
											<div className="relative group">
												<input
													id="profile_image"
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
													htmlFor="profile_image"
													className="cursor-pointer flex flex-col items-center justify-center"
												>
													<div className="relative">
														<Avatar className="size-28 border-2 border-gray-300 hover:border-gray-400 transition-colors">
															<AvatarImage
																src={
																	previewUrl ||
																	field.value ||
																	"/sf/ysm-profile-fallback.jpg"
																}
																alt="Profile"
																className="object-cover"
															/>
															<AvatarFallback className="text-4xl">
																{getInitials(
																	`${form.getValues("first_name") || "User"} ${
																		form.getValues("last_name") || "Name"
																	}`
																)}
															</AvatarFallback>
														</Avatar>
														<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all flex items-center justify-center">
															<CameraIcon className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
														</div>
													</div>
													<p className="text-2xs text-gray-500 mt-2">
														Click to upload profile photo
													</p>
												</label>
												{(previewUrl || field.value) && (
													<button
														type="button"
														onClick={(e) => {
															e.preventDefault();
															setSelectedFile(null);
															setPreviewUrl("");
															field.onChange("");
														}}
														className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
												)}
											</div>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

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
