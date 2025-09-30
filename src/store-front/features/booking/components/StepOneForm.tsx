import { useState, useMemo, useCallback, useEffect } from "react";
import {
	BookingService,
	useBookingFormStore,
} from "@/store-front/store/useBookingFormStore";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import {
	ChevronLeft,
	ChevronRight,
	Clock,
	Trash2,
	Loader2,
} from "lucide-react";
import { Separator } from "@/core/components/base/separator";
import { formatDuration } from "@/store-front/shared/helpers/formatDurationMinutes";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { ServiceModel } from "@/core/models/service.model";
import ServiceAccordionCard from "@/store-front/shared/components/ServiceAccordionCard";
import { Textarea } from "@/core/components/base/textarea";

// Move allServices OUTSIDE the component to prevent recreation
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

// { isDataLoading }: StepOneFormProps
const StepOneForm = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingAction, setLoadingAction] = useState<string | null>(null);
	const servicesPerPage = 9;

	const {
		setFieldImmediate,
		setField,
		formData,
		setStepValid,
		resetForm,
		validateStep,
		updateServiceQuantity,
	} = useBookingFormStore();

	const [customizationNotes, setCustomizationNotes] = useState(
		formData.customization_notes ?? ""
	);

	// Set step validation based on services length
	useEffect(() => {
		setStepValid("step1", formData.services.length > 0);
	}, [formData.services.length, setStepValid]);

	const availableServices = useMemo(
		() =>
			ALL_SERVICES.filter(
				(s) => !formData.services.some((service) => service._id === s._id)
			),
		[formData.services]
	);

	const { totalPages, currentServices } = useMemo(() => {
		const totalPages = Math.ceil(availableServices.length / servicesPerPage);
		const startIndex = (currentPage - 1) * servicesPerPage;
		const endIndex = startIndex + servicesPerPage;
		const currentServices = availableServices.slice(startIndex, endIndex);

		return { totalPages, currentServices };
	}, [currentPage, availableServices, servicesPerPage]);

	// Book a service with loading state
	const handleBook = useCallback(
		async (service: BookingService) => {
			setIsLoading(true);
			setLoadingAction(`add-${service._id}`);

			try {
				// Small delay to show loading state
				await new Promise((resolve) => setTimeout(resolve, 100));

				const updatedServices = [...formData.services, service];
				setFieldImmediate("services", updatedServices);
				validateStep(1);
			} finally {
				setIsLoading(false);
				setLoadingAction(null);
			}
		},
		[formData.services, setFieldImmediate, setStepValid]
	);

	// Remove service with loading state
	const removeBookedService = useCallback(
		async (serviceToRemove: BookingService) => {
			setIsLoading(true);
			setLoadingAction(`remove-${serviceToRemove._id}`);

			try {
				// Small delay to show loading state
				await new Promise((resolve) => setTimeout(resolve, 100));

				const filteredServices = formData.services.filter(
					(s) => s._id !== serviceToRemove._id
				);
				setFieldImmediate("services", filteredServices);
				validateStep(1);
			} finally {
				setIsLoading(false);
				setLoadingAction(null);
			}
		},
		[formData.services, setFieldImmediate, setStepValid]
	);

	const goToPreviousPage = useCallback(() => {
		setCurrentPage((p) => Math.max(p - 1, 1));
	}, []);

	const goToNextPage = useCallback(() => {
		setCurrentPage((p) => p + 1);
	}, []);

	const goToPage = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	return (
		<div className="relative w-full overflow-auto scrollbar-hidden max-h-[70vh] 2xl:max-h-[75vh] flex flex-col gap-4">
			<div className="w-full flex flex-col gap-2 sticky top-0 bg-white z-50 pb-2">
				<Label className="text-3xl font-bold tracking-normal text-center py-4 sticky m-0 top-0 w-full z-50 border-y-2 border-secondary border-dashed">
					Avail our{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Services{" "}
					</span>
				</Label>
			</div>

			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-2 2xl:gap-4">
				<div className="col-span-2 2xl:col-span-3">
					<div className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-2 gap-2 2xl:gap-4">
						{currentServices.map((service) => {
							const isServiceLoading = loadingAction === `add-${service._id}`;

							return (
								<div
									key={service._id}
									className={isServiceLoading ? "opacity-50" : ""}
								>
									<ServiceAccordionCard
										id={service._id}
										category={service.category}
										name={service.name}
										description={service.description}
										price={service.price}
										duration_minutes={service.duration_minutes}
										oldPrice={service.old_price}
										images={service.service_gallery}
										disabled={
											!formData.is_customized || formData.is_booking_sent
										}
										onBook={() =>
											handleBook({
												_id: service._id,
												quantity: 1,
												price_per_unit: service.price,
												total_price: service.price,
												duration_minutes: service.duration_minutes ?? 120,
											} as BookingService)
										}
									/>
								</div>
							);
						})}
					</div>

					{/* Pagination */}
					{!formData.is_booking_sent && (
						<div className="flex justify-center mt-6 space-x-2">
							<Button
								variant="ghost"
								size="icon"
								className="size-8 rounded-full text-2xs"
								disabled={currentPage === 1}
								onClick={goToPreviousPage}
							>
								<ChevronLeft />
							</Button>
							{Array.from({ length: totalPages }, (_, i) => (
								<Button
									key={i}
									variant={currentPage === i + 1 ? "default" : "ghost"}
									className="size-8 rounded-full text-2xs"
									onClick={() => goToPage(i + 1)}
								>
									{i + 1}
								</Button>
							))}
							<Button
								variant="ghost"
								size="icon"
								className="size-8 rounded-full text-2xs"
								disabled={currentPage === totalPages}
								onClick={goToNextPage}
							>
								<ChevronRight />
							</Button>
						</div>
					)}
				</div>

				{/* Booked Services Card */}
				<div className="space-y-2">
					<Card className="col-span-1 max-h-[28em] h-full border overflow-hidden">
						<CardHeader>
							<div className="flex flex-row justify-between items-center w-full">
								<CardTitle className="text-2xl">
									Services{" "}
									{formData.services.length > 0 && (
										<span className="text-secondary">
											({formData.services.length})
										</span>
									)}
								</CardTitle>

								<Button
									className={`bg-secondary text-xs ${
										formData.is_booking_sent && "hidden"
									}`}
									onClick={() => {
										if (formData.is_customized) {
											setFieldImmediate("is_customized", false);
											resetForm();
										} else {
											setFieldImmediate("is_customized", true);
										}
									}}
								>
									{!formData.is_customized ? "Customize" : "Cancel"}
								</Button>
							</div>

							{formData.services.length > 0 && (
								<div className="flex flex-col gap-2 p-0 ">
									{!isLoading ? (
										<>
											<Label className="text-xs text-gray-600 h-2">
												Total: {formatToPeso(formData.total_amount.toFixed(2))}
											</Label>
											<Label className="text-xs text-gray-600 h-2">
												Session duration:{" "}
												{formatDuration(formData.session_duration_minutes)}
											</Label>
										</>
									) : (
										<div className="flex items-center space-x-2 mt-2">
											<Loader2 className="h-4 w-4 animate-spin text-primary" />
											<span className="text-primary text-xs font-medium">
												Please wait! Computing amount and time.
											</span>
										</div>
									)}
								</div>
							)}
						</CardHeader>
						<Separator />
						<CardContent className="max-h-[20em] h-full overflow-y-auto">
							<ol className="list-decimal list-inside space-y-1">
								{formData.services.length > 0 ? (
									formData.services.map((service) => {
										const foundService = ALL_SERVICES.find(
											(s) => s._id === service._id
										);
										if (!foundService) return null;

										const isServiceRemoving =
											loadingAction === `remove-${service._id}`;

										return (
											<li
												key={service._id}
												className={`relative border-border border-[1px] rounded-lg p-4 flex justify-between items-center list-decimal list-inside overflow-hidden ${
													isServiceRemoving ? "opacity-50" : ""
												}`}
											>
												<div className="flex flex-col gap-1 w-[85%]">
													{/* Service Name */}
													<Label className="text-xs truncate">
														{foundService.name}
													</Label>

													{/* Price Section */}
													<div className="flex items-center whitespace-nowrap">
														{/* Old Price (if exists) */}
														{foundService.old_price && (
															<span className="text-3xs 2xl:text-2xs text-gray-400 line-through">
																{formatToPeso(
																	foundService.old_price.toFixed(2)
																)}
															</span>
														)}
														{/* Base Price */}
														<span className="text-2xs 2xl:text-xs font-bold text-black opacity-80 mx-1">
															{formatToPeso(foundService.price.toFixed(2))}
														</span>
														<span className="text-2xs 2xl:text-xs font-bold text-black opacity-80">
															x {service.quantity} =
														</span>
														{/* Total Price */}
														<span className=" text-2xs 2xl:text-xs font-semibold text-destructive ml-1">
															{formatToPeso(service.total_price.toFixed(2))}
														</span>
													</div>

													{/* Duration */}
													<Label className="text-2xs font-normal text-gray-300 [&_svg]:size-3 [&_svg]:shrink-0 flex gap-1 items-center">
														<Clock />{" "}
														{formatDuration(
															foundService.duration_minutes ?? 120
														)}
													</Label>

													{/* Quantity Input */}
													{(formData.is_customized ||
														formData.is_booking_sent) && (
														<div className="flex items-center gap-1">
															<button
																type="button"
																onClick={() =>
																	updateServiceQuantity(service._id, 1)
																}
																className={`h-[24px] w-[32px] rounded border xl:text-2xs 2xl:text-xs ${
																	service.quantity === 1
																		? "border-primary bg-primary/20 text-primary"
																		: "border-gray-300 bg-white hover:bg-gray-50"
																}`}
															>
																1
															</button>

															<button
																type="button"
																onClick={() =>
																	updateServiceQuantity(service._id, 2)
																}
																className={`h-[24px] w-[32px] rounded border xl:text-2xs 2xl:text-xs ${
																	service.quantity === 2
																		? "border-primary bg-primary/20 text-primary"
																		: "border-gray-300 bg-white hover:bg-gray-50"
																}`}
															>
																2
															</button>

															<button
																type="button"
																onClick={() =>
																	updateServiceQuantity(service._id, 3)
																}
																className={`h-[24px] w-[32px] rounded border xl:text-2xs 2xl:text-xs ${
																	service.quantity === 3
																		? "border-primary bg-primary/20 text-primary"
																		: "border-gray-300 bg-white hover:bg-gray-50"
																}`}
															>
																3
															</button>

															<span className="ml-1 text-gray-400 xl:text-2xs 2xl:text-xs">
																qty
															</span>
														</div>
													)}
												</div>

												{/* Remove Button */}
												<Button
													variant="icon"
													size="icon"
													className="[&_svg]:size-4 [&_svg]:shrink-0 right-0 absolute bg-destructive h-full rounded-none text-white border-border hover:bg-red-400"
													onClick={() => removeBookedService(service)}
													disabled={
														isLoading ||
														!formData.is_customized ||
														formData.is_booking_sent
													}
												>
													{isServiceRemoving ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<Trash2 />
													)}
												</Button>
											</li>
										);
									})
								) : (
									<div className="flex items-center justify-center w-full">
										<Label className="text-base font-light">
											No service yet
										</Label>
									</div>
								)}
							</ol>
						</CardContent>
					</Card>
					{formData.is_customized && (
						<Card className="col-span-1 max-h-[16em] h-full border overflow-hidden">
							<CardHeader>
								<CardTitle className="text-2xl">Customization Notes</CardTitle>
							</CardHeader>
							<Separator />
							<CardContent className="h-full overflow-y-auto p-2">
								<Textarea
									className="h-full rounded-none border-none"
									placeholder="Drop your customization notes here."
									disabled={formData.is_booking_sent}
									value={customizationNotes}
									onChange={(e) => {
										setCustomizationNotes(e.target.value);
										setField("customization_notes", e.target.value);
									}}
								/>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default StepOneForm;
