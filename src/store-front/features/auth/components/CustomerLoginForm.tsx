import { Button } from "@/core/components/base/button";
import { Checkbox } from "@/core/components/base/checkbox";
import { Form, FormLabel } from "@/core/components/base/form";
import { Input } from "@/core/components/base/input";
import { Label } from "@/core/components/base/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CustomerLoginForm = () => {
	const form = useForm<any>();
	const navigate = useNavigate();

	return (
		<div className="m-auto">
			<Form {...form}>
				<form>
					<div className="relative flex flex-row w-[70vw] h-[70vh] shadow-xl rounded-xl overflow-hidden">
						<div
							style={{ backgroundImage: "url('/ysm-sidebar.png')" }}
							className="absolute top-0 left-4 bg-center bg-no-repeat bg-contain h-20  w-24"
						/>
						<div className="w-1/2 bg-secondary/20 h-full rounded-l-2xl flex items-center justify-center">
							<img
								src="/sf/sf-auth-vector.svg"
								alt="LOGIN VECTOR"
								className="object-contain w-[90%] h-[90%]"
							/>
						</div>
						<div className="flex-1 my-auto h-full">
							<div className="bg-white h-full rounded-r-2xl flex flex-col items-start justify-center space-y-2 p-8">
								<Label className="text-3xl font-bold text-foreground mb-6">
									Login to Your Smile Matters
								</Label>

								<FormLabel>Email</FormLabel>
								<Input
									className="h-11 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
									placeholder="Type email here"
								/>

								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									className="h-11 text-gray-500 xl:text-sm xl:placeholder:text-sm rounded-md"
									placeholder="Type email here"
								/>

								<div className="space-x-2 py-1 flex items-center">
									<Checkbox />
									<Label className="text-xs text-gray-400 font-light tracking-tight">
										I agree with the{" "}
										<span className="text-gray-500/90 font-normal text-xs">
											Terms & Conditions
										</span>
									</Label>
								</div>

								<Button className="h-11 w-full font-semibold tracking-wide rounded-md">
									Login
								</Button>

								<div className="w-full flex justify-between">
									<Button
										variant="ghost"
										className="p-0 text-xs h-5 hover:text-underline text-primary font-normal hover:bg-transparent tracking-tight"
									>
										Forgot Password?
									</Button>

									<Label className="p-0 gap-1 text-xs h-5 hover:text-underline font-normal text-primary hover:bg-transparent tracking-tight hover:cursor-default">
										<span className="text-gray-400">
											Don't have an account?
										</span>
										<button
											type="button"
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
		</div>
	);
};

export default CustomerLoginForm;
