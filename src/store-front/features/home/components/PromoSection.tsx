import { Gift } from "lucide-react";
import { SectionContainer } from "../pages/HomePage.sf";

const PromoSection = () => {
	return (
		<SectionContainer>
			<section
				className="relative overflow-hidden bg-gradient-to-br from-stone-800 via-stone-700 to-amber-900 rounded-3xl"
				style={{
					background:
						"linear-gradient(135deg, #3c3530 0%, #4a3f37 50%, #846e62 100%)",
				}}
			>
				{/* Background decorative elements */}
				<div className="absolute inset-0">
					{/* Gradient orbs */}
					<div
						className="absolute w-32 h-32 rounded-full top-20 left-1/4 blur-xl"
						style={{ backgroundColor: "rgba(132, 110, 98, 0.2)" }}
					></div>
					<div
						className="absolute w-24 h-24 rounded-full bottom-20 left-1/3 blur-lg"
						style={{ backgroundColor: "rgba(180, 140, 100, 0.3)" }}
					></div>
					<div
						className="absolute w-16 h-16 rounded-full top-1/2 left-10 blur-md"
						style={{ backgroundColor: "rgba(160, 130, 110, 0.2)" }}
					></div>

					{/* Dotted pattern */}
					<div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
						<div className="grid h-full gap-2 grid-cols-20">
							{[...Array(100)].map((_, i) => (
								<div key={i} className="w-1 h-1 bg-white rounded-full"></div>
							))}
						</div>
					</div>
				</div>

				<div className="relative grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
					{/* Left Content */}
					<div className="z-10 space-y-6">
						<h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
							Promo Hunt Awaits <br />
							<span className="text-[#d4a574]">Your Deal</span>
							<br />
							Will Appear Soon
						</h2>

						<p className="max-w-lg text-base tracking-tight text-gray-300 leading-2">
							Get ready! Exclusive discounts and special offers are just around
							the corner. Promo Hunt is designed to bring you handpicked deals
							that you won’t want to miss. Keep checking back, because your next
							big saving could appear here at any moment.
						</p>

						<button
							className="flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg rounded-xl hover:scale-105"
							style={{
								background: "linear-gradient(135deg, #846e62 0%, #a08776 100%)",
								boxShadow: "0 10px 25px rgba(132, 110, 98, 0.3)",
							}}
						>
							<Gift />
							Find it now
						</button>
					</div>

					{/* Right Content - Gift Boxes Illustration */}
					<div className="relative flex items-center justify-center">
						{/* Main discount circle */}
						<div className="relative">
							{/* Background circle with pulse animation */}
							<div
								className="absolute inset-0 w-48 h-48 rounded-full animate-pulse opacity-90"
								style={{
									background:
										"linear-gradient(135deg, #d4a574 0%, #c49660 100)",
								}}
							></div>

							{/* Main discount text */}
							<div
								className="relative flex flex-col items-center justify-center w-48 h-48 text-white transform rounded-full rotate-12"
								style={{
									background:
										"linear-gradient(135deg, #d4a574 0%, #c49660 100%)",
								}}
							>
								<span className="text-4xl font-bold">50%</span>
								<span className="text-2xl font-bold">off!</span>
							</div>

							{/* Limited time banner */}
							<div className="absolute transform -translate-x-1/2 -bottom-0 left-1/2">
								<div
									className="px-6 py-2 text-sm font-semibold text-white rounded-full shadow-lg"
									style={{
										background:
											"linear-gradient(135deg, #846e62 0%, #a08776 100%)",
									}}
								>
									<span className="text-xs italic font-script whitespace-nowrap">
										Limited time only!
									</span>
								</div>
							</div>
						</div>

						{/* Gift Boxes */}
						{/* Large gift box - bottom left */}
						<div className="absolute transform -bottom-8 -left-12 rotate-12 animate-bounce">
							<div
								className="w-20 h-16 rounded-lg shadow-xl"
								style={{
									background:
										"linear-gradient(135deg, #d4a574 0%, #c49660 100%)",
								}}
							>
								<div
									className="w-full h-3 rounded-t-lg"
									style={{
										background:
											"linear-gradient(90deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
								<div
									className="absolute top-0 w-3 h-full transform -translate-x-1/2 left-1/2"
									style={{
										background:
											"linear-gradient(180deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
								<div className="absolute transform -translate-x-1/2 -top-1 left-1/2">
									<div
										className="w-6 h-4 rounded-full"
										style={{
											border: "2px solid #846e62",
											backgroundColor: "#d4a574",
										}}
									></div>
								</div>
							</div>
						</div>

						{/* Medium gift box - top right */}
						<div
							className="absolute transform -top-6 right-8 -rotate-12 animate-bounce"
							style={{ animationDelay: "0.5s" }}
						>
							<div className="w-16 rounded-lg shadow-xl h-14 bg-gradient-to-br from-white to-gray-100">
								<div
									className="w-full h-3 rounded-t-lg"
									style={{
										background:
											"linear-gradient(90deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
								<div
									className="absolute top-0 w-2 h-full transform -translate-x-1/2 left-1/2"
									style={{
										background:
											"linear-gradient(180deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
								<div className="absolute transform -translate-x-1/2 -top-1 left-1/2">
									<div
										className="w-5 h-3 rounded-full"
										style={{
											border: "2px solid #846e62",
											backgroundColor: "#d4a574",
										}}
									></div>
								</div>
							</div>
						</div>

						{/* Small gift box - top left */}
						<div
							className="absolute transform rotate-45 top-2 -left-8 animate-bounce"
							style={{ animationDelay: "1s" }}
						>
							<div className="w-12 h-10 rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-100">
								<div
									className="w-full h-2 rounded-t-lg"
									style={{
										background:
											"linear-gradient(90deg, #a08776 0%, #846e62 100%)",
									}}
								></div>
								<div
									className="absolute top-0 w-2 h-full transform -translate-x-1/2 left-1/2"
									style={{
										background:
											"linear-gradient(180deg, #a08776 0%, #846e62 100%)",
									}}
								></div>
								<div className="absolute transform -translate-x-1/2 -top-1 left-1/2">
									<div
										className="w-4 h-2 rounded-full"
										style={{
											border: "1px solid #846e62",
											backgroundColor: "#d4a574",
										}}
									></div>
								</div>
							</div>
						</div>

						{/* Extra small gift - right side */}
						<div
							className="absolute transform bottom-4 right-2 -rotate-12 animate-bounce"
							style={{ animationDelay: "1.5s" }}
						>
							<div className="w-10 h-8 rounded-md shadow-lg bg-gradient-to-br from-white to-gray-100">
								<div
									className="w-full h-2 rounded-t-md"
									style={{
										background:
											"linear-gradient(90deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
								<div
									className="absolute top-0 w-1 h-full transform -translate-x-1/2 left-1/2"
									style={{
										background:
											"linear-gradient(180deg, #846e62 0%, #a08776 100%)",
									}}
								></div>
							</div>
						</div>

						{/* Sparkle effects */}
						<div
							className="absolute top-8 right-16 animate-pulse"
							style={{ color: "#d4a574" }}
						>
							✨
						</div>
						<div
							className="absolute bottom-12 left-4 animate-pulse"
							style={{ animationDelay: "0.7s", color: "#d4a574" }}
						>
							⭐
						</div>
						<div
							className="absolute top-16 left-16 animate-pulse"
							style={{ animationDelay: "1.2s", color: "#d4a574" }}
						>
							✨
						</div>

						{/* Accent floating orb */}
						<div
							className="absolute w-4 h-4 rounded-full bottom-8 right-16 animate-ping"
							style={{ backgroundColor: "#c49660" }}
						></div>
					</div>
				</div>

				{/* Additional decorative accent orb in bottom right */}
				<div
					className="absolute w-16 h-16 rounded-full bottom-12 right-12 blur-sm opacity-60 animate-pulse"
					style={{
						background: "linear-gradient(135deg, #c49660 0%, #a08776 100%)",
					}}
				></div>
			</section>
		</SectionContainer>
	);
};

export default PromoSection;
