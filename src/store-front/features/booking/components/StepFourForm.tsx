import React, { useState, useRef } from "react";
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
	Upload,
	X,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import {
	PaymentMethod,
	useBookingFormStore,
} from "@/store-front/store/useBookingFormStore";
import { ServiceModel } from "@/core/models/service.model";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import {
	formatToNormalDate,
	formatToNormalTime,
} from "@/ami/shared/helpers/formatDate";
import parse from "html-react-parser";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/core/components/base/select";

export type Service = {
	_id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	old_price?: number; // optional, not always present
	duration_minutes: number | null;
	is_available: boolean;
	service_gallery: string[];
	is_active: boolean;
	created_by: string;
	updated_by: string;
	deleted_by: string | null;
	retrieved_by: string | null;
	deleted_at: string | null;
	retrieved_at: string | null;
	__v: number;
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
};

export const ALL_SERVICES: Service[] = [
	{
		_id: "68db7cd6a46929dc4e9479f0",
		name: "Bridal Makeup",
		description: `
			<p><b>💄 Bridal Makeup</b> includes a <i>trial session</i> to perfect your look before the big day. 
			We use ✨ <b>waterproof, long-lasting products</b> to keep you glowing all day.</p>
			<ul>
				<li>✅ Personalized consultation</li>
				<li>✅ Trial makeup session</li>
				<li>✅ Premium branded products</li>
			</ul>
			<p><s>Old price: ₱3000</s> 👉 <b>Now only ₱2500!</b></p>
		`,
		category: "Beauty",
		price: 2500,
		old_price: 3000,
		duration_minutes: 120,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
			"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
			"https://images.unsplash.com/photo-1516975080664-ed2fc6a32937",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f1",
		name: "Party Makeup",
		description: `
			<p>✨ Look <b>fabulous</b> at your next party with our <i>customized</i> glam looks.</p>
			<ol>
				<li>🎨 Smokey eyes</li>
				<li>💎 Glitter highlights</li>
				<li>🌟 Natural glowing finish</li>
			</ol>
			<p><s>Regular ₱1500</s> 👉 <b>Now only ₱1200!</b></p>
		`,
		category: "Beauty",
		price: 1200,
		duration_minutes: 90,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1560066984-138dadb4c035",
			"https://images.unsplash.com/photo-1583001809809-a2b0c6e3f22f",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f2",
		name: "Hair Styling",
		description: `
			<p>💇 Get a <i>professional</i> hairstyle tailored to your event. Perfect for <b>weddings</b>, parties, or casual outings.</p>
			<ul>
				<li>🌹 Elegant updos</li>
				<li>🌊 Beach waves</li>
				<li>✨ Sleek straightening</li>
			</ul>
			<p><b>Pro tip:</b> Book with makeup for a <s>10% discount</s> 🎁 <i>(limited time)</i>.</p>
		`,
		category: "Styling",
		price: 800,
		duration_minutes: 60,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1562322140-8baeececf3df",
			"https://images.unsplash.com/photo-1605497788044-5a32c7078486",
			"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Photo Editing",
		description: `
			<p>📸 Enhance your photos with <b>professional editing</b>. We make your shots <i>magazine-ready</i>!</p>
			<ol>
				<li>✨ Skin smoothing</li>
				<li>💡 Lighting adjustments</li>
				<li>🖼 Background cleanup</li>
			</ol>
			<p><s>₱500</s> 👉 <b>Now ₱400 per photo!</b></p>
		`,
		category: "Editing",
		price: 400,
		duration_minutes: 30,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1504203700686-0f3ec2a5dd12",
			"https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Portrait Photography",
		description: `
			<p>📷 Get timeless <b>portrait photos</b> with our expert photographers. Perfect for <i>branding</i> or family shoots.</p>
			<ul>
				<li>🏢 Studio setup</li>
				<li>🌳 Outdoor natural light</li>
				<li>🖼 Up to 20 edited shots</li>
			</ul>
			<p><b>Special:</b> Free <i>framed print</i> 🎁 this month only!</p>
		`,
		category: "Photography",
		price: 2000,
		duration_minutes: 90,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ef",
		name: "Event Photography",
		description: `
			<p>🎉 Our <b>Event Photography</b> captures <i>every important moment</i> of your gathering. Perfect for corporate & social occasions.</p>
			<ol>
				<li>📌 Coverage of highlights</li>
				<li>🤩 Candid moments</li>
				<li>👥 Group portraits</li>
			</ol>
			<p><b>Deal:</b> Free <i>editing</i> on 10 selected photos 🎁</p>
		`,
		category: "Photography",
		price: 3500,
		duration_minutes: 240,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479ed",
		name: "Videography",
		description: `
			<p>🎥 <b>Videography</b> that brings your story to life. From <i>weddings</i> to launches, we create unforgettable films.</p>
			<ul>
				<li>📹 HD & 4K recording</li>
				<li>🎬 Professional editing</li>
				<li>🌟 Highlight reel included</li>
			</ul>
			<p><s>₱5000</s> 👉 <b>Now ₱4500</b> (early bookings) 🎁</p>
		`,
		category: "Video",
		price: 4500,
		duration_minutes: 300,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
			"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
	{
		_id: "68db7cd6a46929dc4e9479f7",
		name: "Wedding Photography",
		description: `
			<p>💍 Make your <b>wedding day</b> unforgettable with our <i>full-coverage</i> photography service.</p>
			<ol>
				<li>📸 Pre-wedding shoot</li>
				<li>💒 Ceremony coverage</li>
				<li>🎉 Reception highlights</li>
			</ol>
			<p><b>Bonus:</b> Free <i>engagement shoot</i> included 💝</p>
		`,
		category: "Photography",
		price: 6000,
		duration_minutes: 480,
		is_available: true,
		service_gallery: [
			"https://images.unsplash.com/photo-1529634893481-bd1c1c8f84b0",
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
		],
		is_active: true,
		created_by: "68b4fc3b0d4b7f4b17d0054a",
		updated_by: "68b4fc3b0d4b7f4b17d0054a",
		deleted_by: null,
		retrieved_by: null,
		deleted_at: null,
		retrieved_at: null,
		__v: 0,
		created_at: "2025-09-30T06:46:46.083Z",
		updated_at: "2025-09-30T06:46:46.083Z",
	},
];

const StepFourForm = ({}) => {
	const { formData, setFieldImmediate, canProceedToStep, validateStep } =
		useBookingFormStore();

	const [promoCode, setPromoCode] = useState(formData?.promo_id || "");
	const [isPromoApplied, setIsPromoApplied] = useState(!!formData?.promo_id);

	const [mop, setMop] = useState("");

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

			{/* Main Content */}
			<div className="flex flex-col lg:flex-row gap-2 pb-6">
				{/* Left Side - Booking Summary */}
				<div className="flex-1 space-y-2">
					{/* Services Section */}
					<div className="bg-white rounded-lg border border-border p-4 shadow-sm">
						<h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
							<Camera className="size-5 text-primary" />
							Selected Services
						</h3>
						<div className="space-y-3">
							{formData?.services?.map((service, index) => {
								const foundService = ALL_SERVICES.find(
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
										{/* {formatTo24HourTime(formData.start_time || "")}
										{formData.end_time &&
											` - ${formatTo24HourTime(formData.end_time)}`} */}
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

				{/* Right Side - Payment & Confirmation */}
				<div className="w-full lg:w-96 space-y-2">
					{/* Pricing Summary */}
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

					<Select
						value={String(mop)}
						onValueChange={(value) => {
							setFieldImmediate("method_of_payment", value as PaymentMethod);
							setMop(value);
						}}
					>
						<SelectTrigger
							disabled={canProceedToStep(5)}
							className={`w-full h-[32px] xl:text-xs  ${
								!formData.method_of_payment
									? "text-gray-400"
									: "text-foreground"
							}`}
						>
							<SelectValue placeholder="Select method of payment" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel className="text-xs">Method of Payment</SelectLabel>

								<SelectItem value="GCash" className="xl:text-xs">
									GCash
								</SelectItem>
								<SelectItem value="Cash" className="xl:text-xs">
									Cash
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{/* Submit Button */}
					<Button
						onClick={() => {
							// !DELETE ME LATER
							function generateBookingRef(): string {
								const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
								let result = "BK-";
								for (let i = 0; i < 8; i++) {
									result += chars.charAt(
										Math.floor(Math.random() * chars.length)
									);
								}
								return result;
							}

							validateStep(4);

							setFieldImmediate("is_booking_sent", true);

							// await api call the response should return reference id

							// set reference number

							setFieldImmediate("booking_reference", generateBookingRef());

							console.log(formData);
						}}
						size="lg"
						className="w-full rounded-lg"
						disabled={canProceedToStep(5) || !formData.method_of_payment}
					>
						{!canProceedToStep(5)
							? "Confirm Booking"
							: "Booking Confirmed proceed to Summary tab"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StepFourForm;

{
	/* <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
<h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
	<Upload className="size-4 text-primary" />
	Payment Proof
</h4>

<div className="mb-4">
	<input
		ref={fileInputRef}
		type="file"
		accept="image/*"
		multiple
		onChange={handleImageUpload}
		className="hidden"
	/>
	<Button
		onClick={() => fileInputRef.current?.click()}
		variant="ghost"
		className="w-full"
		disabled={uploadedImages.length >= 5}
	>
		<Upload className="size-4 mr-2" />
		Upload Images ({uploadedImages.length}/5)
	</Button>
</div>

{uploadedImages.length > 0 && (
	<div className="grid grid-cols-2 gap-2">
		{uploadedImages.map((image, index) => (
			<div key={index} className="relative group">
				<img
					src={image}
					alt={`Payment proof ${index + 1}`}
					className="w-full h-20 object-cover rounded-lg border border-border"
				/>
				<button
					onClick={() => handleImageRemove(index)}
					className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<X className="size-3" />
				</button>
			</div>
		))}
	</div>
)}

{uploadedImages.length === 0 && (
	<div className="text-center py-4 text-gray-500 text-sm border border-dashed border-gray-300 rounded-lg">
		No payment proof uploaded yet
	</div>
)}
</div> */
}
