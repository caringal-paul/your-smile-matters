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

const services = [
	{
		id: 1,
		category: "Photography" as ServiceCategory,
		title: "Studio Portrait Photoshoot",
		location: "Calamba Studio, Calamba, Laguna, Philippines",
		price: 120.0,
		oldPrice: 150.0,
		image:
			"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
		authorName: "Emily Carter",
		authorAvatar:
			"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop&crop=face",
	},
	{
		id: 2,
		category: "Beauty" as ServiceCategory,
		title: "Bridal Makeup Package",
		location: "Santa Rosa Salon, Santa Rosa, Laguna, Philippines",
		price: 250.0,
		oldPrice: 300.0,
		image:
			"https://images.unsplash.com/photo-1600185365483-26d7a4a3bafe?w=400&h=300&fit=crop",
		authorName: "Sophia Martinez",
		authorAvatar:
			"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
	},
	{
		id: 3,
		category: "Styling" as ServiceCategory,
		title: "Event Wardrobe Styling",
		location: "Nuvali Lifestyle Center, Santa Rosa, Laguna, Philippines",
		price: 180.0,
		oldPrice: 220.0,
		image:
			"https://images.unsplash.com/photo-1520975918319-95c963b44c33?w=400&h=300&fit=crop",
		authorName: "David Kim",
		authorAvatar:
			"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop&crop=face",
	},
	{
		id: 4,
		category: "Equipment" as ServiceCategory,
		title: "Camera & Lighting Rental",
		location: "Binan City Center, Biñan, Laguna, Philippines",
		price: 90.0,
		oldPrice: 120.0,
		image:
			"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
		authorName: "Michael Lee",
		authorAvatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
	},
	{
		id: 5,
		category: "Other" as ServiceCategory,
		title: "Birthday Party Setup",
		location: "Paseo de Sta. Rosa, Santa Rosa, Laguna, Philippines",
		price: 400.0,
		oldPrice: 500.0,
		image:
			"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
		authorName: "Jessica Brown",
		authorAvatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
	},
];

const TopServicesSection = () => {
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
								key={service.id}
								className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
							>
								<ServiceCard
									category={service.category}
									title={service.title}
									location={service.location}
									price={service.price}
									oldPrice={service.oldPrice}
									image={service.image}
									onBook={() => console.log(`Booking ${service.title}`)}
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
