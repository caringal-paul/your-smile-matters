import { useState, useMemo, useCallback, useEffect } from "react";
import {
	BookingFormService,
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
import { formatDurationByMinutes } from "@/store-front/shared/helpers/formatDuration";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import ServiceAccordionCard from "@/store-front/shared/components/ServiceAccordionCard";
import { Textarea } from "@/core/components/base/textarea";
import { Spinner } from "@/core/components/base/spinner";
import { GetAllServiceResponseSf } from "../../service/utils/types/service-response.sf.types";

type StepOneFormProps = {
	allServices: GetAllServiceResponseSf[];
	isPending: boolean;
};

const StepOneForm = ({ allServices, isPending }: StepOneFormProps) => {
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
			allServices.filter(
				(s) => !formData.services.some((service) => service._id === s._id)
			),
		[formData.services, allServices]
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
		async (service: BookingFormService) => {
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
		async (serviceToRemove: BookingFormService) => {
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

	if (isPending) {
		return <>Loading</>;
	}

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
											} as BookingFormService)
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
											<div className="flex items-baseline space-x-2">
												<Label className="text-xs text-gray-600 h-2">
													Total:
												</Label>
												<Label className="text-xs text-gray-600 h-2">
													{formatToPeso(formData.total_amount.toFixed(2))}
												</Label>

												{formData.old_amount && !formData.is_customized ? (
													<Label className="text-3xs text-gray-600 h-2 line-through">
														{formatToPeso(formData.old_amount.toFixed(2))}
													</Label>
												) : null}
											</div>

											<Label className="text-xs text-gray-600 h-2">
												Session duration:{" "}
												{formatDurationByMinutes(
													formData.session_duration_minutes
												)}
											</Label>
										</>
									) : (
										<div className="flex items-center space-x-2 mt-2">
											<Spinner />

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
										const foundService = allServices.find(
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
												<div className="flex flex-col gap-1 w-full">
													{/* Service Name */}
													<Label className="text-xs truncate">
														{foundService.name}
													</Label>

													{/* Price Section */}
													<div className="flex items-center whitespace-nowrap overflow-auto scrollbar-small">
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
														{formatDurationByMinutes(
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
									className="h-full rounded-none border-none focus-visible:ring-0 focus:ring-0"
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
