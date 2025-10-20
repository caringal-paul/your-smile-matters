import { useNavigate } from "react-router-dom";
import { Label } from "@/core/components/base/label";
import { Input } from "@/core/components/base/input";
import { Button } from "@/core/components/base/button";
import { Checkbox } from "@/core/components/base/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/core/components/base/form";
import {
	customerLoginSchema,
	CustomerSfLogin,
} from "../utils/schemas/auth.sf.schema";
import { useLoginCustomerMutation } from "../queries/customerLogin.mutation";

const CustomerLoginForm = () => {
	const navigate = useNavigate();

	const { mutateAsync: login, isPending } = useLoginCustomerMutation();

	const form = useForm<CustomerSfLogin>({
		resolver: zodResolver(customerLoginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			agreedToTerms: false,
		},
	});

	const onSubmit = async (values: CustomerSfLogin) => {
		const path = localStorage.getItem("redirectToPath");

		try {
			const res = await login({
				email: values.email,
				password: values.password,
			});

			if (!res?.access_token) {
				return;
			}

			if (path) {
				navigate(path);

				localStorage.removeItem("redirectToPath");
			} else {
				navigate("/");
			}
		} catch (error) {
			console.log("Error");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="h-screen w-screen flex items-center justify-center"
			>
				<div className="relative flex flex-row w-[70vw] h-[70vh] shadow-xl rounded-xl overflow-hidden">
					<div
						style={{ backgroundImage: "url('/ysm-sidebar.png')" }}
						className="absolute top-0 left-4 bg-center bg-no-repeat bg-contain h-20 w-24"
					/>
					<div className="w-1/2 bg-secondary/20 h-full rounded-l-2xl flex items-center justify-center">
						<img
							src="/sf/sf-auth-vector.svg"
							alt="LOGIN VECTOR"
							className="object-contain w-[90%] h-[90%]"
						/>
					</div>
					<div className="flex-1 my-auto h-full">
						<div className="bg-white h-full rounded-r-2xl flex flex-col items-start justify-center space-y-4 p-8">
							<Label className="text-3xl font-bold text-foreground mb-6">
								Login to Your Smile Matters
							</Label>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												className="h-10 text-sm 2xl:text-base"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												className="h-10 text-sm 2xl:text-base"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="agreedToTerms"
								render={({ field }) => (
									<FormItem className="w-full">
										<div className="flex items-center space-x-2">
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											<Label className="text-xs text-gray-400 font-light tracking-tight">
												I agree with the{" "}
												<span className="text-gray-500/90 font-normal text-xs">
													Terms & Conditions
												</span>
											</Label>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-11 w-full font-semibold tracking-wide rounded-md"
								disabled={!form.formState.isValid}
							>
								Login
							</Button>

							<div className="w-full flex justify-between flex-row items-center">
								<Button
									variant="ghost"
									className="p-0 text-xs h-5 hover:text-underline text-primary font-normal hover:bg-transparent tracking-tight focus-visible:ring-0"
								>
									Forgot Password?
								</Button>

								<Label className="p-0 gap-1 text-xs h-5 hover:text-underline font-normal text-primary hover:bg-transparent tracking-tight hover:cursor-default flex flex-row items-center">
									<span className="text-gray-400">Don't have an account?</span>
									<button
										type="button"
										className="focus-visible:ring-0 focus-visible:outline-0"
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigate("/auth/register");
										}}
									>
										Click Here
									</button>
									<span className="text-gray-400">to Signup</span>
								</Label>
							</div>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default CustomerLoginForm;
