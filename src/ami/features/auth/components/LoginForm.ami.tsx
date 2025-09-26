import { useNavigate } from "react-router-dom";
import { Label } from "@/core/components/base/label";
import { Input } from "@/core/components/base/input";
import { Button } from "@/core/components/base/button";
import UserIcon from "@/ami/shared/assets/icons/UserIcon";
import FormCard from "@/ami/shared/components/card/FormCard";

const LoginForm = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="xl:hidden absolute inset-0 flex items-center justify-center px-4 z-10">
				<div className="w-full max-w-[280px] sm:w-[28em] sm:max-w-[420px] md:w-[70%] md:max-w-[480px] lg:w-[60%] lg:max-w-[520px] px-4 py-6 sm:p-8 gap-6 sm:gap-10 md:gap-12 bg-background rounded-xl shadow-xl flex flex-col text-center">
					<div className="flex flex-col gap-2 sm:gap-4 md:gap-6 sm:mt-3">
						<Label className="text-xs sm:text-[22px] md:text-2xl text-primary font-bold">
							Welcome to ALTINVEST Admin
						</Label>
						<Label className="text-[8px] sm:text-base md:text-lg px-2 text-foreground">
							Enter your email to receive a verification code and access your
							dashboard.
						</Label>
					</div>

					<div className="relative w-full">
						<UserIcon
							fill="black"
							className="h-4 w-4 sm:h-7 sm:w-7 md:h-7 md:w-7 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500"
						/>
						<Input
							className="w-full h-8 sm:h-14 md:h-15 text-[8px] sm:text-base md:text-lg pl-8 sm:pl-16"
							placeholder="Enter email address"
						/>
					</div>

					<Button
						className="h-8 sm:h-14 md:h-15 text-[8px] md:text-base sm:text-base text-white"
						onClick={() => navigate("verify")}
					>
						Send Code
					</Button>
				</div>
			</div>

			<div className="hidden xl:flex w-full h-full bg-background items-center justify-center px-4">
				<div className="h-[50%] w-[50%] xl:w-[65%] m-auto">
					<div
						id="form"
						className="flex flex-col h-full w-full px-4 py-6 xl:gap-8 2xl:gap-16 2xl:justify-normal"
					>
						<div className="flex flex-col justify-center text-center gap-2">
							<div className="mx-auto">
								<img
									id="logo"
									src="/ysm-sidebar.png"
									alt="logo"
									className="w-[180px] h-16 ml-4"
								/>
							</div>
							<Label className="text-lg 2xl:text-xl text-primary font-bold">
								Welcome to Your Smile Matters Admin
							</Label>
							<Label className="text-xs xl:text-sm px-4 text-secondary">
								Enter your email and password to access AMI.
							</Label>
						</div>

						<div className="relative w-full flex flex-col gap-2">
							{/* <UserIcon
								className="h-6 w-6 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500"
								fill="black"
							/> */}

							<div className="space-y-2">
								<Label htmlFor="email" className="font-semibold">
									Email
								</Label>
								<Input type="text" name="email" className="lg:h-8" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="password" className="font-semibold">
									Password
								</Label>
								<Input type="password" name="password" className="lg:h-8" />
							</div>
							{/* <Input
								className="xl:h-14 2xl:h-16 xl:text-base 2xl:text-xl pl-14 2xl:pl-16 md:text-base 2xl:placeholder:text-lg"
								placeholder="Enter email address"
							/> */}
						</div>

						<Button
							className="xl:h-10 2xl:h-12 xl:text-sm 2xl:text-base xl:py-2 2xl:py-3 text-white rounded-xl"
							onClick={() => navigate("verify")}
						>
							Sign in
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
