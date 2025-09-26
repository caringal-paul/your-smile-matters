import { Button } from "@/core/components/base/button";
import { Separator } from "@/core/components/base/separator";
import { Sparkles, Palette } from "lucide-react";

type PackageCustomizationCardProps = {
	onCustomize?: () => void;
};

const PackageCustomizationCard = ({
	onCustomize,
}: PackageCustomizationCardProps) => {
	return (
		<div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-dashed border-primary/30 rounded-lg p-6 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-4 right-4 opacity-10">
				<Sparkles size={48} className="text-primary" />
			</div>
			<div className="absolute bottom-4 left-4 opacity-5">
				<Palette size={64} className="text-primary" />
			</div>

			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-2">
						<div>
							<h3 className="text-lg leading-none tracking-tight font-bold text-gray-900">
								Create Your Custom Package
							</h3>
							<p className="text-xs text-sf-dark-bg mt-1">
								Mix and match services to create the perfect package for your
								needs
							</p>
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="grid grid-cols-2 gap-4 mb-6">
					<div className="flex items-start space-x-2">
						<span className="size-[6px] bg-primary rounded-full mt-2 flex-shrink-0" />
						<div>
							<p className="text-xs font-medium text-foreground">
								Choose Any Services
							</p>
							<p className="text-2xs text-gray-500">
								Photography, Beauty, Styling & More
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-2">
						<span className="size-[6px] bg-primary rounded-full mt-2 flex-shrink-0" />
						<div>
							<p className="text-xs font-medium text-foreground">
								Flexible Pricing
							</p>
							<p className="text-2xs text-gray-500">
								Pay only for what you need
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-2">
						<span className="size-[6px] bg-primary rounded-full mt-2 flex-shrink-0" />
						<div>
							<p className="text-xs font-medium text-foreground">
								Bundle Discounts
							</p>
							<p className="text-2xs text-gray-500">
								Your customized package request may get discount
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-2">
						<span className="size-[6px] bg-primary rounded-full mt-2 flex-shrink-0" />
						<div>
							<p className="text-xs font-medium text-foreground">
								Priority Support
							</p>
							<p className="text-2xs text-gray-500">
								Dedicated consultation included
							</p>
						</div>
					</div>
				</div>

				{/* Button */}
				<div className="flex flex-col items-center justify-between pt-4 border-t border-primary/20">
					{/* Steps */}
					<h1 className="text-xs font-medium text-foreground mb-2">
						Booking process:
					</h1>
					<div className="mb-4 text-2xs w-full text-gray-600 space-y-1">
						<ol className="list-decimal list-inside space-y-1">
							<li>Choose photographer</li>
							<li>Choose time and day</li>
							<li>Choose payment method</li>
							<li>Wait for confirmation</li>
							<li>Check email for updates</li>
							<li>Send down payment</li>
						</ol>
					</div>

					<Separator className="bg-primary/20 mb-4" />

					<Button
						onClick={onCustomize}
						className="px-6 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
					>
						<Sparkles size={16} className="mr-2" />
						Customize Yours Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PackageCustomizationCard;
