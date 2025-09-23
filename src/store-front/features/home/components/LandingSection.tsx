import { SectionContainer } from "../pages/HomePage.sf";

const LandingSection = () => {
	return (
		<SectionContainer className="relative flex items-center pt-32 overflow-hidden h-[80vh]">
			{/* Left side: text content */}
			<div className="relative z-10 flex flex-col justify-center w-full gap-8 pb-20 pr-4 lg:w-3/5 xl:w-2/3 lg:pr-12">
				<h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-6xl">
					Booking Made <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
						Simple
					</span>{" "}
					for <br />
					Every Occasion.
				</h1>

				<p className="max-w-xl text-base leading-relaxed text-primary lg:text-xl">
					From photoshoots to makeup and event setups enjoy seamless booking
					with flexible packages and special deals.
				</p>

				<div className="flex flex-col max-w-[34rem] gap-3 p-6 bg-white border shadow-xl border-border sm:flex-row rounded-2xl">
					<input
						type="text"
						placeholder="Search Location"
						className="flex-1 px-1 py-3 transition-all rounded-lg outline-none text-foreground focus:border-none focus:ring-0"
					/>
					<input
						type="text"
						placeholder="Search Services"
						className="flex-1 px-1 py-3 transition-all rounded-lg outline-none text-foreground focus:border-none focus:ring-0"
					/>
					<button className="px-5 py-3 text-sm font-semibold text-white transition-all duration-200 transform rounded-lg shadow-lg whitespace-nowrap bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/80 hover:scale-105 hover:shadow-xl">
						Find Now
					</button>
				</div>
			</div>

			{/* Right side: illustration, positioned behind */}
			<div className="absolute right-0 flex items-center justify-center w-[60vw] h-[90vh] z-0 mb-28 mr-8">
				<img
					src="/sf/homepage-catchphrase-vector.svg"
					alt="Homepage Catchphrase"
					className="object-contain w-full h-full"
				/>
			</div>
		</SectionContainer>
	);
};

export default LandingSection;
