import { useNavigate } from "react-router-dom";
import { Label } from "@/core/components/base/label";
import { Input } from "@/core/components/base/input";
import { Button } from "@/core/components/base/button";
import KeyIcon from "@/ami/shared/assets/icons/KeyIcon";

const VerifyCodeForm = () => {
	const navigate = useNavigate();

	function maskEmail(email: string): string {
		const [username, domain] = email.split("@");
		if (username.length <= 2) return email;
		const first = username[0];
		const last = username[username.length - 1];
		const masked = "*".repeat(username.length - 2);
		return `${first}${masked}${last}@${domain}`;
	}

	return (
		<>
			<div className="xl:hidden absolute inset-0 flex items-center justify-center px-4 z-10">
				<div className="w-full max-w-[280px] sm:w-[28em] sm:max-w-[420px] md:w-[70%] md:max-w-[480px] lg:w-[60%] lg:max-w-[520px] px-4 py-6 sm:p-8 gap-6 sm:gap-10 md:gap-12 bg-[#F5F5F5] rounded-xl shadow-xl flex flex-col text-center">
					<div className="flex flex-col gap-2 sm:gap-4 md:gap-6 sm:mt-3">
						<Label className="text-xs sm:text-[22px] md:text-2xl text-primary font-bold">
							Verify Your Identity
						</Label>
						<div className="flex flex-col gap-0">
							<Label className="text-[8px] sm:text-base md:text-lg px-2 text-foreground">
								We've sent a verification code to (
								{maskEmail("johndoe@altinvest.com")}).
							</Label>
							<Label className="text-[8px] sm:text-base md:text-lg px-2 text-foreground">
								Enter the code below to continue.
							</Label>
						</div>
					</div>

					<div className="relative w-full">
						<KeyIcon
							className="h-6 w-6 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500"
							fill="black"
						/>
						<Input
							className="w-full h-8 sm:h-14 md:h-15 text-[8px] sm:text-base md:text-lg pl-8 sm:pl-16"
							placeholder="Enter verification code"
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Button
							className="h-8 sm:h-14 md:h-15 text-[8px] md:text-base sm:text-base text-white"
							onClick={() => navigate("/dashboard")}
						>
							Verify and Sign In
						</Button>
						<Label className="text-[8px] sm:text-sm md:text-base text-center text-foreground">
							Didn't receive the email?{" "}
							<Label className="underline hover:cursor-pointer text-[8px] sm:text-sm md:text-base">
								Resend Code
							</Label>
						</Label>
					</div>
				</div>
			</div>

			<div className="hidden xl:flex w-full h-full items-center justify-center px-4">
				<div className="h-[50%] w-[50%] 2xl:h-[45%] 2xl:w-[45%] m-auto justify-between">
					<div
						id="form"
						className="flex flex-col h-full w-full px-4 py-6 xl:gap-12 2xl:gap-14 2xl:justify-normal"
					>
						<div className="flex flex-col text-center gap-2">
							<Label className="text-2xl 2xl:text-3xl text-primary font-bold">
								Verify Your Identity
							</Label>
							<div className="flex flex-col gap-0">
								<Label className="text-base 2xl:text-lg px-4 text-foreground">
									We've sent a verification code to (
									{maskEmail("johndoe@altinvest.com")}).
								</Label>
								<Label className="text-base 2xl:text-lg px-4 text-foreground">
									Enter the code below to continue.
								</Label>
							</div>
						</div>

						<div className="relative w-full">
							<KeyIcon className="h-6 w-6 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" />
							<Input
								className="xl:h-14 2xl:h-16 xl:text-base 2xl:text-xl pl-14 2xl:pl-16 md:text-base"
								placeholder="Enter verification code"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<Button
								className="xl:h-14 2xl:h-16 xl:text-base 2xl:text-xl xl:py-3 2xl:py-4 text-white rounded-xl"
								onClick={() => navigate("/dashboard")}
							>
								Verify and Sign In
							</Button>
							<Label className="text-sm 2xl:text-base text-center text-foreground">
								Didn't receive the email?{" "}
								<Label className="underline text-sm 2xl:text-base hover:cursor-pointer">
									Resend Code
								</Label>
							</Label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default VerifyCodeForm;
