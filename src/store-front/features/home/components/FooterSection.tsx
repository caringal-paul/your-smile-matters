import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Label } from "@/core/components/base/label";
import { Separator } from "@/core/components/base/separator";
import {
	CopyrightIcon,
	Facebook,
	Instagram,
	MoveLeft,
	Youtube,
} from "lucide-react";
import { PiTiktokLogo } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const LogoAndButton = () => {
	return (
		<>
			<Button
				className="absolute top-0 px-4 text-white transition-all duration-100 scale-100 rotate-90 -translate-x-1/2 -translate-y-1/2 py-6 left-1/2 bg-primary transform-all hover:scale-110 [&_svg]:size-5"
				style={{
					clipPath:
						"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
				}}
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<MoveLeft className="size-6" />
			</Button>

			<div className="relative w-2/5 h-14 xl:h-16">
				<Separator className="bg-primary" />

				<div
					style={{ backgroundImage: "url('/ysm-sidebar.png')" }}
					className="absolute top-0 -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-contain left-1/2 h-36 xl:h-24 w-36 xl:w-32 bg-sf-dark-bg"
				/>
			</div>
		</>
	);
};

const Contacts = () => {
	return (
		<>
			<Label className="text-base font-normal tracking-normal text-white">
				ysmphotography@yopmail.com
			</Label>
			<Label className="text-base font-normal tracking-normal text-white">
				+63 992 855 9444
			</Label>
		</>
	);
};

const SocialMediaIcons = () => {
	return (
		<div className="flex flex-row w-1/6 my-4 justify-evenly">
			<div className="p-[3px] bg-primary rounded-lg">
				<a href="https://www.facebook.com/yoursmilemattersphotography">
					<Button
						size="icon"
						className="hover:bg-primary/80 rounded-lg border-[1px] border-white"
					>
						<Facebook />
					</Button>
				</a>
			</div>
			<div className="p-[3px] bg-primary rounded-lg">
				<Button
					size="icon"
					className="hover:bg-primary/80 rounded-lg border-[1px] border-white"
				>
					<Instagram />
				</Button>
			</div>
			<div className="p-[3px] bg-primary rounded-lg">
				<Button
					size="icon"
					className="hover:bg-primary/80 rounded-lg border-[1px] border-white"
				>
					<Youtube />
				</Button>
			</div>
			<div className="p-[3px] bg-primary rounded-lg">
				<Button
					size="icon"
					className="hover:bg-primary/80 rounded-lg border-[1px] border-white"
				>
					<PiTiktokLogo />
				</Button>
			</div>
		</div>
	);
};

const EmailSubscriptionInput = () => {
	return (
		<div className="w-full max-w-sm mx-auto my-6">
			<div className="flex overflow-hidden border rounded-lg shadow-sm">
				<Input
					type="email"
					placeholder="Enter your email"
					className="flex-1 h-[38px] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
				<Button className="px-6 rounded-none h-[38px] shadow-lg hover:bg-primary/80 active:shadow-inner ">
					Subscribe
				</Button>
			</div>
		</div>
	);
};

const Copyright = () => {
	return (
		<div className="absolute bottom-0 flex items-center justify-center w-full h-20 border-t-[1px] border-dashed border-secondary text-secondary">
			Copyright <CopyrightIcon className="ml-2 size-4" />
			2025 Your Smiles Matter. All Rights Reserved
		</div>
	);
};

const FooterSection = () => {
	return (
		<div className="relative flex flex-col gap-2 justify-center items-center h-[500px] w-full bg-sf-dark-bg">
			<LogoAndButton />
			<Contacts />
			<SocialMediaIcons />
			<EmailSubscriptionInput />
			<Copyright />
		</div>
	);
};

export default FooterSection;
