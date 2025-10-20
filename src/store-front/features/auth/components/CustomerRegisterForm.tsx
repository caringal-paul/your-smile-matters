import {
	CustomerAmiCreate,
	CustomerAmiCreateWithConfirm,
	customerCreateSchema,
	customerCreateSchemaExtended,
} from "@/ami/features/customer-management/utils/schemas/customer.schema";
import { Button } from "@/core/components/base/button";
import { Checkbox } from "@/core/components/base/checkbox";
import { Form, FormField, FormMessage } from "@/core/components/base/form";
import { Input } from "@/core/components/base/input";
import { Label } from "@/core/components/base/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";
import { GENDER_OPTIONS } from "@/core/constants/options.constants";
import { useRegisterCustomerMutation } from "../queries/customerRegister.mutation";

const CustomerRegisterForm = () => {
	const navigate = useNavigate();
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	const { mutateAsync: registerCustomer, isPending: isRegistrationLoading } =
		useRegisterCustomerMutation();

	const form = useForm<CustomerAmiCreateWithConfirm>({
		resolver: zodResolver(customerCreateSchemaExtended),
		mode: "onChange",
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirm_password: "",
			mobile_number: "",
			gender: "Other",
			is_active: true,
		},
	});

	const onSubmit = async (
		payload: CustomerAmiCreate & { confirm_password: string }
	) => {
		if (!agreedToTerms) {
			// Handle terms agreement validation
			return;
		}

		try {
			await registerCustomer(payload);
		} catch (error) {
			console.error("Failed to register customer:", error);
		}
	};

	return (
		<div className="m-auto">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="relative flex flex-row w-[80vw] 2xl:w-[70vw] h-[80vh] 2xl:h-[70vh] shadow-xl rounded-xl overflow-hidden">
						<div
							style={{ backgroundImage: "url('/ysm-sidebar.png')" }}
							className="absolute top-0 left-4 bg-center bg-no-repeat bg-contain h-20 w-24"
						/>
						<div className="w-1/3 bg-secondary/20 h-full rounded-l-2xl flex items-center justify-center">
							<img
								src="/sf/sf-register-vector.svg"
								alt="Register VECTOR"
								className="object-contain w-[90%] h-[90%]"
							/>
						</div>
						<div className="flex-1 my-auto h-full">
							<div className="bg-white h-full rounded-r-2xl flex flex-col items-start justify-center space-y-2 p-8">
								<Label className="text-3xl font-bold text-foreground mb-6">
									Register to Your Smile Matters
								</Label>

								<div className="flex flex-row w-full gap-4">
									<FormField
										control={form.control}
										name="first_name"
										render={({ field }) => (
											<div className="w-full">
												<Label>First Name</Label>
												<Input
													{...field}
													className="h-10 w-full text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Enter first name"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>

									<FormField
										control={form.control}
										name="last_name"
										render={({ field }) => (
											<div className="w-full">
												<Label>Last Name</Label>
												<Input
													{...field}
													className="h-10 w-full text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Enter last name"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>
								</div>

								<div className="flex flex-row w-full gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<div className="w-full">
												<Label>Email</Label>
												<Input
													{...field}
													type="email"
													className="h-10 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Enter email address"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>

									<FormField
										control={form.control}
										name="mobile_number"
										render={({ field }) => (
											<div className="w-full">
												<Label>Mobile Number</Label>
												<Input
													{...field}
													type="tel"
													className="h-10 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Enter mobile number"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>
								</div>

								<div className="flex flex-row w-full gap-4">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<div className="w-full">
												<Label>Password</Label>
												<Input
													{...field}
													type="password"
													className="h-10 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Enter password"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>
									<FormField
										control={form.control}
										name="confirm_password"
										render={({ field }) => (
											<div className="w-full">
												<Label>Confirm Password</Label>
												<Input
													{...field}
													type="password"
													className="h-10 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
													placeholder="Confirm your password"
												/>
												<FormMessage className="ml-1" />
											</div>
										)}
									/>{" "}
								</div>

								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<div className="w-full">
											<Label>Gender</Label>
											<Select
												value={field.value ?? undefined}
												onValueChange={(value) => field.onChange(value)}
											>
												<SelectTrigger
													className={`w-full h-10 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md ${
														!field.value ? "text-gray-400" : "text-foreground"
													}`}
												>
													<SelectValue placeholder="Select gender" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Gender</SelectLabel>
														{GENDER_OPTIONS.map((gender) => {
															return (
																<SelectItem
																	value={gender.value}
																	key={gender.value}
																>
																	{gender.label}
																</SelectItem>
															);
														})}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage className="ml-1" />
										</div>
									)}
								/>

								<div className="space-x-2 py-1 flex items-center">
									<Checkbox
										checked={agreedToTerms}
										onCheckedChange={() => {
											setAgreedToTerms(!agreedToTerms);
										}}
									/>
									<Label className="text-xs text-gray-400 font-light tracking-tight">
										I agree with the{" "}
										<span className="text-gray-500/90 font-normal text-xs">
											Terms & Conditions
										</span>
									</Label>
								</div>

								<Button
									type="submit"
									className="h-10 w-full font-ssemibold tracking-wide rounded-md"
									disabled={
										!form.formState.isValid ||
										!agreedToTerms ||
										isRegistrationLoading
									}
								>
									{form.formState.isSubmitting ? "Registering..." : "Register"}
								</Button>

								<div className="w-full flex justify-center">
									<Label className="p-0 gap-1 text-xs h-5 hover:text-underline font-normal text-primary hover:bg-transparent tracking-tight hover:cursor-default justify-center">
										<span className="text-gray-400 mr-1">
											Already have account?
										</span>
										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												navigate("/auth/login");
											}}
										>
											Login Now
										</button>
									</Label>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CustomerRegisterForm;
