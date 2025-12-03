import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/core/components/base/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, CalendarCheck, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/core/components/base/button";
import { useNavigate } from "react-router-dom";

const AppointmentProcessSection = () => {
	const navigate = useNavigate();

	return (
		<div className="text-white min-h-2xl bg-slate-800">
			{/* Main Hero Section */}
			<div className="container px-0 py-16 mx-auto">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					{/* Left Content */}
					<div className="space-y-8">
						<h1 className="text-4xl font-bold leading-tight tracking-wide lg:text-5xl">
							How appointment{" "}
							<span className="text-white">Booking System Works</span>
						</h1>

						<p className="max-w-lg text-base leading-relaxed tracking-wide text-white">
							Discover how easy it is to book your next photoshoot or service.
							From choosing a location to selecting your package, our system
							makes scheduling seamless and stress-free.
						</p>

						<Button
							className="flex items-center gap-2 px-6 py-8 font-semibold text-white transition-all scale-100 rounded-lg duration-3000 bg-gradient-to-r from-secondary/80 from-60% to-secondary to-100% hover:scale-110"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
								navigate("/packages");
							}}
						>
							<Calendar size={20} />
							Book Now
						</Button>
					</div>

					{/* Right Content - Feature Cards */}
					<div className="space-y-6">
						<Carousel
							className="w-full"
							plugins={[
								Autoplay({
									delay: 3000, // autoplay every 3s
								}),
							]}
							opts={{
								align: "start",
								loop: true,
								slidesToScroll: 1,
							}}
						>
							<CarouselContent className="-ml-2 md:-ml-4">
								<CarouselItem className="pl-2 md:pl-4 basis-1/2">
									<div className="h-full p-8 bg-gradient-to-l from-blue-400 to-blue-700 rounded-2xl">
										<div className="flex flex-col items-start gap-4">
											<div className="p-3 rounded-full bg-white/20">
												<MapPin size={24} className="text-white" />
											</div>
											<div>
												<h3 className="mb-3 text-2xl font-bold">
													Set Location
												</h3>
												<div className="w-12 h-px mb-4 bg-white/30"></div>
												<p className="leading-relaxed text-blue-100">
													Set your location to find services or shops for
													appointment booking.
												</p>
											</div>
										</div>
									</div>
								</CarouselItem>

								<CarouselItem className="pl-2 md:pl-4 basis-1/2">
									<div className="h-full p-8 bg-gradient-to-l from-purple-400 to-purple-700 rounded-2xl">
										<div className="flex flex-col items-start gap-4">
											<div className="p-3 rounded-full bg-white/20">
												<CheckCircle size={24} className="text-white" />
											</div>
											<div>
												<h3 className="mb-3 text-2xl font-bold">
													Find Services
												</h3>
												<div className="w-12 h-px mb-4 bg-white/30"></div>
												<p className="leading-relaxed text-purple-100">
													Browse and discover services tailored to your needs.
												</p>
											</div>
										</div>
									</div>
								</CarouselItem>

								<CarouselItem className="pl-2 md:pl-4 basis-1/2">
									<div className="h-full p-8 bg-gradient-to-l from-pink-400 to-pink-700 rounded-2xl">
										<div className="flex flex-col items-start gap-4">
											<div className="p-3 rounded-full bg-white/20">
												<CalendarCheck size={24} className="text-white" />
											</div>
											<div>
												<h3 className="mb-3 text-2xl font-bold">Booking</h3>
												<div className="w-12 h-px mb-4 bg-white/30"></div>
												<p className="leading-relaxed text-pink-100">
													Easily book appointments with just a few clicks.
												</p>
											</div>
										</div>
									</div>
								</CarouselItem>
							</CarouselContent>
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentProcessSection;
