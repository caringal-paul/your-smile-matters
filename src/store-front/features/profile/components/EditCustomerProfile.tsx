import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import { Input } from "@/core/components/base/input";
import { Separator } from "@/core/components/base/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import { Button } from "@/core/components/base/button";
import { Calendar } from "@/core/components/base/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	CustomerSfUpdate,
	customerUpdateSchema,
} from "../utils/schema/customer-update.schema";
import { useGetMeMutation } from "../queries/getMe.sf.query";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { getInitials } from "@/core/helpers/getInitials";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/core/components/base/avatar";
import CameraIcon from "@/ami/shared/assets/icons/CameraIcon";
import { useUpdateCustomerMutation } from "../queries/updateCustomer.sf.mutation";
import { useUploadImageMutation } from "@/core/queries/uploadImage.mutation";
import CustomerLoadingFallback from "@/core/components/custom/CustomerLoadingFallback";

const EditCustomerProfile = () => {
	const { mutateAsync: updateProfile, isPending: isUpdating } =
		useUpdateCustomerMutation();
	const { data: currentUser, isLoading: isFetchingMyDetails } =
		useGetMeMutation();

	const uploadImageMutation = useUploadImageMutation();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");

	// DO THE SAME ON PACKAGE FORM
	const form = useForm<CustomerSfUpdate>({
		resolver: zodResolver(customerUpdateSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			first_name: "",
			last_name: "",
			mobile_number: "",
			gender: "Male",
			address: "",
			barangay: "",
			city: "",
			province: "",
			postal_code: "",
			country: "Philippines",
			password: "",
			birth_date: null,
			profile_image: "",
		},
	});

	useEffect(() => {
		if (currentUser) {
			form.reset({
				email: currentUser.email ?? "",
				first_name: currentUser.first_name ?? "",
				last_name: currentUser.last_name ?? "",
				mobile_number: currentUser.mobile_number ?? "",
				gender: currentUser.gender ?? "Male",
				address: currentUser.address ?? "",
				barangay: currentUser.barangay ?? "",
				city: currentUser.city ?? "",
				province: currentUser.province ?? "",
				postal_code: currentUser.postal_code ?? "",
				country: currentUser.country ?? "Philippines",
				password: "",
				birth_date: currentUser.birth_date
					? new Date(currentUser.birth_date)
					: null,
				profile_image: currentUser.profile_image ?? "",
			});
		}
	}, [currentUser, form]);

	const onSubmit = async (payload: CustomerSfUpdate) => {
		try {
			let uploadedImagePath = payload.profile_image;

			if (selectedFile) {
				const imageFormData = new FormData();
				imageFormData.append("image", selectedFile);

				const customFilename = `${currentUser?.customer_no}_profile_image`;
				imageFormData.append("custom_filename", customFilename);

				const uploadResult = await uploadImageMutation.mutateAsync({
					formData: imageFormData,
				});

				uploadedImagePath = uploadResult?.path;

				if (uploadResult?.path) {
					form.setValue("profile_image", uploadResult.path);
				}
			}

			await updateProfile({
				customerId: String(currentUser?._id),
				payload: {
					...payload,
					profile_image: `http://localhost:3000${uploadedImagePath}`,
				},
			});

			setSelectedFile(null);
			setPreviewUrl("");
		} catch (error) {
			console.error("Failed to update profile:", error);
		}
	};

	if (isFetchingMyDetails) {
		return (
			<div className="h-full justify-center items-center flex">
				<CustomerLoadingFallback />
			</div>
		);
	}

	return (
		<Card className="h-fit w-full flex flex-col">
			<Form {...form}>
				<div>
					<CardHeader className="flex flex-row items-center justify-between px-8 py-4">
						<CardTitle className="text-3xl font-bold tracking-normal">
							Edit Profile
						</CardTitle>
					</CardHeader>
					<Separator className="mb-6" />
					<CardContent className="overflow-auto px-8 pb-8 flex flex-col gap-6">
						{/* ==================== PROFILE IMAGE ==================== */}
						<FormField
							control={form.control}
							name="profile_image"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="w-full">Profile Image</FormLabel>
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
													<Avatar className="size-48 border-2 border-gray-300 hover:border-gray-400 transition-colors">
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
												<p className="text-xs text-gray-500 mt-2">
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

						{/* ==================== PERSONAL INFO ==================== */}
						<div className="grid grid-cols-2 gap-6 mt-4">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name*</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter first name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name*</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter last name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email*</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												type="email"
												placeholder="Enter your email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mobile_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile Number</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter your mobile number"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gender*</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value || ""}
											>
												<SelectTrigger className="h-8">
													<SelectValue placeholder="Select gender" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Male">Male</SelectItem>
													<SelectItem value="Female">Female</SelectItem>
													<SelectItem value="Other">Other</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="birth_date"
								render={({ field }) => (
									<FormItem className="flex flex-col mt-auto">
										<FormLabel>Birth Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"pl-3 text-left font-normal rounded-md h-8 w-full text-2xs",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span className="text-2xs text-gray-400 font-normal">
																Select birth date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value || undefined}
													onSelect={field.onChange}
													disabled={(date) => {
														const today = new Date();
														today.setHours(0, 0, 0, 0);
														return date > today; // Disable future dates
													}}
													captionLayout="dropdown"
													fromYear={1900}
													toYear={new Date().getFullYear()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* ==================== ADDRESS INFO ==================== */}
						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter your address"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="barangay"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Barangay</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter your barangay"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter your city"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="province"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Province</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter your province"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="postal_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input
												className="h-8"
												{...field}
												placeholder="Enter postal code"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="pt-4 ml-auto">
							<Button
								variant="sf"
								disabled={isUpdating || !form.formState.isDirty}
								className="text-base xl:text-xl 2xl:text-lg xl:p-6"
								type="button"
								onClick={() => onSubmit(form.getValues())}
							>
								{isUpdating ? "Updating Profile..." : "Update Profile"}
							</Button>
						</div>
					</CardContent>
				</div>
			</Form>
		</Card>
	);
};

export default EditCustomerProfile;
