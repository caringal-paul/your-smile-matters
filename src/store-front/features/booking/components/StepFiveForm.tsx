import { Label } from "@/core/components/base/label";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import {
	Check,
	Clipboard,
	Copy,
	CopyCheck,
	Mail,
	Phone,
	PhoneCall,
} from "lucide-react";
import { useState } from "react";

const StepFiveForm = () => {
	const { formData } = useBookingFormStore();

	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(formData.booking_reference);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
			{/* Header */}
			<div className="w-full flex flex-col gap-4 sticky top-0 bg-white z-50 pb-2">
				<Label className="text-3xl font-bold text-center py-4 sticky m-0 top-0 w-full z-50 border-y-2 border-secondary border-dashed">
					Congratulations! Your booking is now for{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Approval
					</span>
				</Label>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 pb-4 h-[26em]">
				<div className="lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex flex-col items-center justify-center h-full">
					<div className="relative mb-6">
						<div className="relative bg-white rounded-full p-8 shadow-2xl">
							<Check />
						</div>
					</div>

					<h3 className="text-2xl font-bold text-white text-center mb-2">
						Booking Submitted!
					</h3>
					<p className="text-white text-center text-sm">
						Your request has been received and is being processed
					</p>
				</div>

				<div className="lg:col-span-2 lg:row-span-1 flex flex-col gap-4 h-full">
					{/* Reference Number */}
					<div className="bg-white border-2 border-dashed border-primary/30 rounded-2xl p-6 relative overflow-hidden h-full">
						<div className="flex flex-col z-10 h-full">
							<div className="flex items-center justify-between mb-3">
								<span className="text-base font-semibold text-gray-500 uppercase tracking-wider">
									Reference No.
								</span>
								<Clipboard className="text-primary" />
							</div>
							<div className="h-fit my-auto mt-4">
								<div className="flex flex-row gap-6 items-end">
									<Label className="flex text-4xl font-extrabold tracking-tight text-primary">
										{formData.booking_reference}{" "}
									</Label>
									<button
										onClick={handleCopy}
										className="p-1 rounded-md hover:bg-primary/10 transition"
										title="Copy Reference No."
									>
										{copied ? (
											<CopyCheck className="text-primary size-8" />
										) : (
											<Copy className="text-primary size-8" />
										)}
									</button>
								</div>
								<p className="text-xs text-gray-500 flex items-center gap-1">
									<svg
										className="w-3 h-3"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clipRule="evenodd"
										/>
									</svg>
									Keep this number for tracking
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:col-span-2 lg:row-span-1 flex flex-row gap-4">
					<div className="w-full bg-primary/10 rounded-2xl p-6 border border-primary/50">
						<div className="flex items-center gap-2 mb-2">
							<div className="size-8 bg-primary rounded-lg flex items-center justify-center">
								<svg
									className="size-4 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h4 className="font-bold text-primary text-base">What's Next?</h4>
						</div>
						<ul className="space-y-1">
							<li className="flex gap-3">
								<div className="size-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-2xs font-bold">1</span>
								</div>
								<p className="text-xs text-primary">
									<span className="font-semibold">Email Confirmation</span>
									<br />
									<span className="text-primary/80">
										Check your inbox within 5 minutes
									</span>
								</p>
							</li>
							<li className="flex gap-3">
								<div className="size-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-2xs font-bold">2</span>
								</div>
								<p className="text-xs text-primary">
									<span className="font-semibold">Team Review</span>
									<br />
									<span className="text-primary/80">
										We'll verify your booking details
									</span>
								</p>
							</li>
							<li className="flex gap-3">
								<div className="size-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-white text-2xs font-bold">3</span>
								</div>
								<p className="text-xs text-primary">
									<span className="font-semibold">Final Approval</span>
									<br />
									<span className="text-primary/80">
										Response within 24-48 hours
									</span>
								</p>
							</li>
						</ul>
					</div>

					<div className="w-full bg-primary/10 rounded-2xl p-6 border border-primary/50">
						<h4 className="font-bold text-primary mb-2 flex items-center gap-2">
							<Phone className="text-primary size-6" />
							Need Help?
						</h4>
						<div className="space-y-3">
							<div className="flex items-center gap-3 p-3 bg-white rounded-lg">
								<Mail className="text-primary size-5" />

								<div>
									<p className="text-2xs text-gray-500">Email</p>
									<p className="font-semibold text-sm text-primary">
										ysmphotography@yopmail.com
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-3 bg-white rounded-lg">
								<PhoneCall className="text-primary size-5" />

								<div>
									<p className="text-2xs text-gray-500">Phone</p>
									<p className="font-semibold text-sm text-primary">
										+63 992 855 9444
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepFiveForm;
