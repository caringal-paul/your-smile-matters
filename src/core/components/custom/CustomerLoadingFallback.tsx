import { Spinner } from "../base/spinner";

interface CustomerLoadingFallbackProps {
	message?: string;
	description?: string;
}

const CustomerLoadingFallback = ({
	message = "Loading Data",
	description = "Please wait while we ready your data...",
}: CustomerLoadingFallbackProps) => {
	return (
		<div className="text-center space-y-4">
			{/* Animated Icon */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="size-14 lg:size-16 2xl:size-20 border-4 border-[#846e62]/20 rounded-full"></div>
				</div>
				<div className="relative flex items-center justify-center">
					<div className="size-14 lg:size-16 2xl:size-20 border-4 border-t-[#846e62] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
				</div>
			</div>

			{/* Loading Text */}
			<div className="space-y-2">
				<h3 className="text-xl font-semibold text-[#846e62]">{message}</h3>
				<p className="text-sm text-gray-500">{description}</p>
			</div>

			{/* Animated Dots */}
			<div className="flex items-center justify-center gap-2">
				<div className="w-2 h-2 bg-[#846e62] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="w-2 h-2 bg-[#a7a29c] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="w-2 h-2 bg-[#846e62] rounded-full animate-bounce"></div>
			</div>
		</div>
	);
};

export default CustomerLoadingFallback;
