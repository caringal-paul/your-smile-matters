import { useNavigate } from "react-router-dom";
import { Label } from "@/core/components/base/label";
import { Input } from "@/core/components/base/input";
import { Button } from "@/core/components/base/button";
import { useLoginAmiUserMutation } from "../queries/loginAmiUser.mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amiLoginSchema, AuthAmiLogin } from "../utils/schemas/auth.schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/core/components/base/form";

const LoginForm = () => {
	const navigate = useNavigate();
	const { mutateAsync: login, isPending } = useLoginAmiUserMutation();

	const form = useForm<AuthAmiLogin>({
		resolver: zodResolver(amiLoginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: AuthAmiLogin) => {
		try {
			await login(values);
			navigate("/admin/ami/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full">
				{/* Mobile layout */}
				<div className="xl:hidden absolute inset-0 flex items-center justify-center px-4 z-10">
					<div className="flex flex-col w-full max-w-[280px] sm:w-[28em] sm:max-w-[420px] md:w-[70%] md:max-w-[480px] lg:w-[60%] lg:max-w-[520px] px-4 py-6 sm:p-8 gap-4 sm:gap-6 bg-background rounded-xl shadow-xl">
						{/* Header */}
						<div className="flex flex-col justify-center text-center gap-2">
							<img
								src="/ysm-sidebar.png"
								alt="logo"
								className="mx-auto w-[90px] sm:w-[160px] h-9 sm:h-16"
							/>
							<Label className="text-sm sm:text-lg 2xl:text-xl text-primary font-bold">
								Welcome to Your Smile Matters Admin
							</Label>
							<Label className="text-3xs sm:text-xs xl:text-sm text-secondary">
								Enter your email and password to access AMI.
							</Label>
						</div>

						{/* Fields */}
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<Label className="font-semibold text-start text-2xs sm:text-sm">
											Email
										</Label>
										<FormControl>
											<Input
												type="text"
												className="text-2xs lg:h-8"
												{...field}
											/>
										</FormControl>
										<FormMessage className="ml-1" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<Label className="font-semibold text-start text-2xs sm:text-sm">
											Password
										</Label>
										<FormControl>
											<Input
												type="password"
												className="text-2xs lg:h-8"
												{...field}
											/>
										</FormControl>
										<FormMessage className="ml-1" />
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="xl:h-10 2xl:h-12 text-2xs xl:text-sm 2xl:text-base xl:py-2 2xl:py-3 text-white rounded-xl"
						>
							{isPending ? "Signing in..." : "Sign in"}
						</Button>
					</div>
				</div>

				{/* Desktop layout */}
				<div className="hidden xl:flex w-full h-full bg-background items-center justify-center px-4">
					<div className="w-[60%] max-w-[520px] bg-background rounded-xl shadow-xl p-10 flex flex-col gap-8">
						{/* Header */}
						<div className="text-center space-y-2 flex flex-col">
							<img
								src="/ysm-sidebar.png"
								alt="logo"
								className="mx-auto w-[180px] h-16"
							/>
							<Label className="text-lg 2xl:text-xl text-primary font-bold">
								Welcome to Your Smile Matters Admin
							</Label>
							<Label className="text-xs xl:text-sm px-4 text-secondary">
								Enter your email and password to access AMI.
							</Label>
						</div>

						{/* Fields */}
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<Label className="font-semibold">Email</Label>
										<FormControl>
											<Input type="text" className="lg:h-8" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<Label className="font-semibold">Password</Label>
										<FormControl>
											<Input type="password" className="lg:h-8" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="xl:h-10 2xl:h-12 xl:text-sm 2xl:text-base xl:py-2 2xl:py-3 text-white rounded-xl"
						>
							{isPending ? "Signing in..." : "Sign in"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default LoginForm;
