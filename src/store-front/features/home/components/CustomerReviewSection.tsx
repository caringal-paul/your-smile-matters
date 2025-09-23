import { Star } from "lucide-react";
import { useState } from "react";

const CustomerReviewSection = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	const testimonials = [
		{
			id: 1,
			name: "Hames Rodrigo",
			service: "Wedding Photography",
			avatar:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",

			rating: 4,
			totalReviews: 20,
			review:
				"The photographer captured every moment beautifully. The shots were natural, elegant, and truly told the story of our wedding day. Highly recommend for couples who want memories that last forever.",
		},
		{
			id: 2,
			name: "Sarah Johnson",
			service: "Bridal Makeup",
			avatar:
				"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face",
			rating: 5,
			totalReviews: 15,
			review:
				"The makeup service was flawless! My bridal look stayed perfect all day and night. The artist listened carefully to what I wanted and delivered beyond expectations.",
		},
		{
			id: 3,
			name: "John Doe",
			service: "Camera Rentals",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
			rating: 5,
			totalReviews: 10,
			review:
				"Great rental experience. The camera and lighting equipment were in excellent condition and made our shoot smooth and professional. Affordable rates and reliable service!",
		},
	];

	const currentReview = testimonials[currentTestimonial];

	return (
		<section className="py-16 overflow-hidden bg-gray-50">
			<div className="container px-6 mx-auto">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					{/* Left Content */}
					<div className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-4xl font-bold leading-tight text-gray-800 lg:text-5xl whitespace-nowrap">
								What Customers Say About
								<br />
								Our Booking Systems
							</h2>
							<p className="max-w-lg leading-6 text-gray-600">
								Our clients love the simplicity and reliability of our booking
								system. From seamless scheduling to hassle-free confirmations,
								it’s designed to make every appointment smooth and stress-free.
								Hear what they have to say about their experience with us.
							</p>
						</div>

						{/* Testimonial Card */}
						<div className="max-w-md p-8 bg-white shadow-lg rounded-2xl">
							{/* User Info */}
							<div className="flex items-center gap-4 mb-6">
								<img
									src={currentReview.avatar}
									alt={currentReview.name}
									className="object-cover w-12 h-12 border-2 rounded-full"
									style={{ borderColor: "#846e62" }}
								/>
								<div>
									<h4 className="text-base font-semibold text-gray-800">
										{currentReview.name}
									</h4>
									<p className="text-xs text-gray-500">
										{currentReview.service}
									</p>
								</div>
							</div>

							{/* Rating */}
							<div className="flex items-center gap-3 mb-6">
								<div className="flex gap-1">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											size={16}
											className={
												star <= currentReview.rating ? "fill-current" : ""
											}
											style={{
												color:
													star <= currentReview.rating ? "#d4a574" : "#e5e7eb",
											}}
										/>
									))}
								</div>
								<span className="text-xs text-gray-500">
									{currentReview.rating} star of {currentReview.totalReviews}{" "}
									review
								</span>
							</div>

							{/* Review Text */}
							<div className="relative">
								<div
									className="absolute top-0 left-0 w-1 h-full rounded-full"
									style={{ backgroundColor: "#846e62" }}
								></div>
								<blockquote className="pl-6 overflow-hidden line-clamp-4 text-ellipsis text-sm italic leading-relaxed text-gray-600 max-h-[140px]">
									"{currentReview.review}"
								</blockquote>
							</div>
						</div>

						{/* Pagination Dots */}
						<div className="flex gap-3">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentTestimonial(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentTestimonial
											? "w-8"
											: "opacity-50 hover:opacity-75"
									}`}
									style={{
										backgroundColor:
											index === currentTestimonial ? "#846e62" : "#d1d5db",
									}}
								/>
							))}
						</div>
					</div>

					{/* Right Illustration */}
					<div className="relative flex items-center justify-center">
						<div className="absolute flex items-center justify-center w-[70vw] h-screen z-0 mb-28">
							<img
								src="/sf/customer-review-vector.svg"
								alt="Homepage Catchphrase"
								className="object-contain w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerReviewSection;
