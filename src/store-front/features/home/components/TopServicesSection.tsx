import { useCallback, useEffect, useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/core/components/base/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/core/components/base/button";
import { ServiceCard } from "@/store-front/shared/components/ServiceCard";
import { ServiceCategory } from "@/core/models/service.model";
import { useGetRecommendedServicesQuery } from "../queries/getRecommendedServices.sf.query";
import { useBookingFormStore } from "@/store-front/store/useBookingFormStore";
import { useMyCredentials } from "@/store-front/store/useMyCredentials";
import { formatToUtc } from "@/ami/shared/helpers/formatDate";
import { useNavigate } from "react-router-dom";

const TopServicesSection = () => {
	const navigate = useNavigate();

	const { openModal, saveOriginalForm } = useBookingFormStore();
	const { myCredentials } = useMyCredentials();

	const { data: services = [] } = useGetRecommendedServicesQuery();

	const [api, setApi] = useState<EmblaCarouselType | null | undefined>(null);
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	// Initialize carousel when API is available
	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		const onSelect = () => setCurrent(api.selectedScrollSnap());

		api.on("select", onSelect);

		return () => {
			api.off("select", onSelect); // ✅ cleanup
		};
	}, [api]);

	// Navigation functions
	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const scrollTo = useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api]
	);

	return (
		<section className="py-16 bg-gray-50">
			<div className="container px-6 mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<h2 className="text-4xl font-bold text-gray-800 lg:text-5xl">
						Our Top Featured Services
					</h2>

					{/* Custom Navigation Buttons */}
					<div className="flex gap-2">
						<Button
							onClick={scrollPrev}
							size="icon"
							className="w-12 h-12 text-white rounded-lg hover:text-white"
						>
							<ChevronLeft size={20} />
						</Button>
						<Button
							onClick={scrollNext}
							size="icon"
							className="w-12 h-12 text-white rounded-lg"
						>
							<ChevronRight size={20} />
						</Button>
					</div>
				</div>

				{/* Carousel */}
				<Carousel
					setApi={setApi}
					plugins={[
						Autoplay({
							delay: 5000, // autoplay every 3s
						}),
					]}
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="pb-2 -ml-2 md:-ml-4">
						{services.map((service) => (
							<CarouselItem
								key={service._id}
								className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
							>
								<ServiceCard
									key={service._id}
									category={service.category}
									title={service.name}
									duration_minutes={service.duration_minutes}
									price={service.price}
									oldPrice={service.old_price}
									image={service.service_gallery[0]}
									onBook={() => {
										const initialData = {
											services: [
												{
													_id: service._id,
													quantity: 1,
													price_per_unit: service.price,
													total_price: service.price,
													duration_minutes: service.duration_minutes,
												},
											],
											is_customized: false,
											customer_id: myCredentials?._id,
											customization_notes: null,
											package_id: null,
											booking_date: formatToUtc(new Date()),
											start_time: "",
											end_time: "",
											session_duration_minutes: 0,
											location: "",
											photographer_id: "",
											photographer_name: null,
											theme: null,
											special_requests: null,
											total_amount: service.price,
											discount_amount: 0,
											promo_id: null,
											final_amount: service.price,
											amount_paid: 0,
											method_of_payment: null,
											payment_images: [],
											is_booking_sent: false,
											status: "Pending" as const,
											booking_reference: "",
										};
										openModal();
										saveOriginalForm(initialData);
									}}
									onView={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
										navigate(
											`/services/service/${service._id}/service-details`
										);
									}}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				{/* Pagination Dots */}
				<div className="flex justify-center gap-2 mt-8">
					{Array.from({ length: count }, (_, index) => (
						<button
							key={index}
							onClick={() => scrollTo(index)}
							className={`w-3 h-3 rounded-full transition-colors ${
								index === current
									? "bg-primary"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TopServicesSection;
