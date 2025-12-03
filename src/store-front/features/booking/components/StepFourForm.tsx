import { useState } from "react";
import { Label } from "@/core/components/base/label";
import { Button } from "@/core/components/base/button";
import { Input } from "@/core/components/base/input";
import { Badge } from "@/core/components/base/badge";
import {
	Camera,
	Calendar,
	Clock,
	MapPin,
	User,
	CreditCard,
	Tag,
	X,
	CheckCircle,
} from "lucide-react";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import parse from "html-react-parser";
import { GetAllServiceResponseSf } from "../../service/utils/types/service-response.sf.types";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import CloseBookingFormConfirmationModal from "./CloseBookingFormConfirmationModal";
import { useSendBookingForApprovalMutation } from "../queries/sendBookingForApproval.sf.mutation";
import { Spinner } from "@/core/components/base/spinner";

type StepFourFormProps = {
	allServices: GetAllServiceResponseSf[];
};

const StepFourForm = ({ allServices }: StepFourFormProps) => {
	const { formData, setFieldImmediate, canProceedToStep, validateStep } =
		useBookingFormStore();

	const {
		mutateAsync: sendBookingForApproval,
		isPending: isBookingSendingForApproval,
	} = useSendBookingForApprovalMutation();

	const myCredentials = useMyCredentials((state) => state.myCredentials);

	const [promoCode, setPromoCode] = useState(formData?.promo_id || "");
	const [isPromoApplied, setIsPromoApplied] = useState(!!formData?.promo_id);

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const handlePromoApply = () => {
		if (promoCode.trim()) {
			const discountAmount = 100; // Example discount
			const newFinalAmount = (formData?.total_amount || 0) - discountAmount;

			setIsPromoApplied(true);
		}
	};

	const handlePromoRemove = () => {
		setPromoCode("");
		setIsPromoApplied(false);
	};

	return (
		<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4 border-none px-[2px]">
			{/* Header */}
			<div className="w-full flex flex-col gap-4 sticky top-0 bg-white z-50 pb-2">
				<Label className="text-3xl font-bold text-center py-4 sticky m-0 top-0 w-full z-50 border-y-2 border-secondary border-dashed">
					Booking{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Summary{" "}
					</span>
					and{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Confirmation{" "}
					</span>
				</Label>
			</div>

			<div className="flex flex-col lg:flex-row gap-2 pb-6">
				<div className="flex-1 space-y-2">
					<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
						<h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
							<Camera className="size-5 text-primary" />
							Selected Services
						</h3>
						<div className="space-y-3">
							{formData?.services?.map((service, index) => {
								const foundService = allServices.find(
									(s) => s._id === service._id
								);
								if (!foundService) return null;

								return (
									<div
										key={index}
										className="flex justify-between items-center p-3 bg-primary/20 rounded-lg"
									>
										<div className="flex-1">
											<h4 className="font-medium text-foreground text-sm">
												{foundService.name}
											</h4>
											<div className="flex gap-2 mt-1">
												<Badge className="text-xs text-white">
													{foundService.category}
												</Badge>
												<span className="text-2xs text-foreground flex items-center gap-1">
													<Clock className="size-3" />
													{service.duration_minutes} mins
												</span>
											</div>
										</div>
										<span className="font-semibold text-foreground text-sm">
											{formatToPeso(String(service.total_price))}
										</span>
									</div>
								);
							})}
							{formData?.is_customized && (
								<div className="p-2 bg-primary/20 rounded-lg border border-primary">
									<div className="flex items-center gap-2 ">
										<CheckCircle className="size-4 text-primary" />
										<span className="font-medium text-foreground text-sm">
											Customization Notes
										</span>
									</div>
									{formData?.customization_notes && (
										<p className="text-xs text-foreground font-light tracking-tight mt-2 ml-2">
											{formData?.customization_notes}
										</p>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Date & Time Section */}
					<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
						<h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
							<Calendar className="size-5 text-primary" />
							Schedule Details
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<Calendar className="size-4 text-foreground" />
								<div>
									<p className="text-sm text-foreground font-medium">Date</p>
									<p className="font-normal text-xs">
										{formatToNormalDate(String(formData.booking_date))}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<Clock className="size-4 text-foreground" />
								<div>
									<p className="text-sm text-foreground font-medium">Time</p>
									<p className="font-normal text-xs">
										{formatToNormalTime(formData.start_time)} -{" "}
										{formatToNormalTime(formData.end_time)}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
								<MapPin className="size-4 text-foreground" />
								<div>
									<p className="text-sm text-foreground font-medium">
										Location
									</p>
									<p className="font-normal text-xs">{formData?.location}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Photographer & Details Section */}
					<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
						<h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
							<User className="size-5 text-primary" />
							Photographer & Details
						</h3>
						<div className="space-y-3">
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<User className="size-4 text-foreground" />
								<div>
									<p className="text-sm text-foreground font-medium">
										Photographer
									</p>
									<p className="font-normal text-xs">
										{formData.photographer_name}
									</p>
								</div>
							</div>
							{formData?.theme && (
								<div className="p-3 bg-gray-50 rounded-lg">
									<p className="text-sm text-foreground font-medium mb-1">
										Theme
									</p>
									<p className="rich-text text-xs font-normal tracking-tight leading-none">
										{parse(formData?.theme)}
									</p>
								</div>
							)}
							{formData?.special_requests && (
								<div className="p-3 bg-gray-50 rounded-lg">
									<p className="text-sm text-foreground font-medium mb-1">
										Special Requests
									</p>
									<p className="text-xs tracking-tight leading-none rich-text">
										{parse(formData?.special_requests)}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="w-full lg:w-96 space-y-2">
					<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
						<h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
							<CreditCard className="size-5 text-primary" />
							Pricing Summary
						</h3>
						<div className="space-y-3">
							<div className="flex justify-between  text-sm">
								<span className="text-foreground tracking-tight font-normal">
									Subtotal:
								</span>
								<span className="font-medium">
									{formData?.total_amount
										? formatToPeso(String(formData?.total_amount))
										: "-"}
								</span>
							</div>
							{(formData?.discount_amount || 0) > 0 && (
								<div className="flex justify-between text-foreground text-sm">
									<span className="text-foreground tracking-tight font-normal">
										Discount:
									</span>
									<span>
										-{formatToPeso(String(formData?.discount_amount))}
									</span>
								</div>
							)}
							<hr className="border-border" />
							<div className="flex justify-between text-base font-semibold">
								<span>Total Amount</span>
								<span className="text-foreground font-bold">
									{formData?.total_amount
										? formatToPeso(String(formData?.total_amount))
										: "-"}
								</span>
							</div>
						</div>
					</div>

					{!myCredentials && (
						<Button
							className="rounded-lg w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:from-primary/90 hover:to-primary/70 transition"
							onClick={() => setIsConfirmModalOpen(true)}
						>
							Log in to Secure Your Booking
						</Button>
					)}

					{/* Promo Code Section - Hidden for now */}
					{false && (
						<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
							<h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
								<Tag className="size-4 text-primary" />
								Promo Code
							</h4>
							{!isPromoApplied ? (
								<div className="flex gap-2">
									<Input
										type="text"
										placeholder="Enter promo code"
										value={promoCode}
										onChange={(e) => setPromoCode(e.target.value)}
										className="flex-1"
									/>
									<Button
										onClick={handlePromoApply}
										disabled={!promoCode.trim()}
										size="sm"
									>
										Apply
									</Button>
								</div>
							) : (
								<div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
									<div className="flex items-center gap-2">
										<CheckCircle className="size-4 text-green-600" />
										<span className="text-sm font-medium text-green-800">
											{formData?.promo_id}
										</span>
									</div>
									<Button
										onClick={handlePromoRemove}
										size="sm"
										variant="ghost"
										className="text-red-600 hover:text-red-700"
									>
										<X className="size-4" />
									</Button>
								</div>
							)}
						</div>
					)}

					<Button
						onClick={async (e) => {
							e.preventDefault();
							e.stopPropagation();

							if (!myCredentials) {
								setIsConfirmModalOpen(true);
								return;
							}

							try {
								const res = await sendBookingForApproval(formData);

								if (res) {
									validateStep(4);
									setFieldImmediate("booking_reference", res.booking_reference);

									setFieldImmediate("is_booking_sent", true);
								}
							} catch (error) {
								console.log(error);
							}
						}}
						size="lg"
						className="w-full rounded-lg gap-1 flex flex-row"
						disabled={
							canProceedToStep(5) ||
							!myCredentials ||
							isBookingSendingForApproval
						}
					>
						{!canProceedToStep(5) ? (
							<>
								{isBookingSendingForApproval ? (
									<>
										<Spinner /> Sending...
									</>
								) : (
									"Confirm Booking"
								)}
							</>
						) : (
							"Booking Confirmed proceed to Summary tab"
						)}
					</Button>
				</div>
			</div>

			<CloseBookingFormConfirmationModal
				open={isConfirmModalOpen}
				isOpen={setIsConfirmModalOpen}
				isForLogin={true}
			/>
		</div>
	);
};

export default StepFourForm;
