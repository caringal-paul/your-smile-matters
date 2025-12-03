import { SectionContainer } from "../pages/HomePage.sf";
import { Card, CardContent } from "@/core/components/base/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/core/components/base/carousel";
import Autoplay from "embla-carousel-autoplay";

const categories = [
	{
		id: 1,
		name: "Photography",
		phrase: "Capture moments that last forever",
		icon: "📸",
		gradient: "from-orange-400 to-red-500",
	},
	{
		id: 2,
		name: "Beauty",
		phrase: "Look your best for every occasion",
		icon: "💄",
		gradient: "from-pink-400 to-rose-500",
	},
	{
		id: 3,
		name: "Styling",
		phrase: "Bring your vision to life",
		icon: "🧵",
		gradient: "from-purple-500 to-indigo-600",
	},
	{
		id: 4,
		name: "Equipment",
		phrase: "Get the tools you need, hassle-free",
		icon: "🎥",
		gradient: "from-cyan-400 to-blue-600",
	},
	{
		id: 5,
		name: "Other",
		phrase: "From parties to events, we’ve got you covered",
		icon: "✨",
		gradient: "from-teal-400 to-green-500",
	},
];

const CategoriesSection = () => {
	return (
		<SectionContainer className={" h-fit "}>
			<div className="w-full max-w-6xl py-12 mx-auto h-fit">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-4xl font-bold text-gray-900">
						Check our categories
					</h2>
				</div>

				<Carousel
					className="w-full"
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
					opts={{
						align: "start",
						loop: true,
					}}
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{categories.map((category) => (
							<CarouselItem
								key={category.id}
								className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/3"
							>
								<div className="h-full p-1">
									<Card className="h-full transition-all duration-300 border-0 shadow-lg hover:shadow-xl group">
										<CardContent className="flex flex-col items-center justify-between h-full p-6 text-center">
											{/* Icon container with gradient background */}
											<div
												className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
											>
												<div className="text-white opacity-90">
													{category.icon}
												</div>
											</div>

											{/* Category name */}
											<h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
												{category.name}
											</h3>

											{/* Phrase */}
											<p className="text-sm font-medium text-gray-500">
												{category.phrase}
											</p>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex" />
					<CarouselNext className="hidden md:flex" />
				</Carousel>
			</div>{" "}
		</SectionContainer>
	);
};

export default CategoriesSection;
