import { Card, CardContent } from "@/core/components/base/card";
import { Input } from "@/core/components/base/input";
import { Label } from "@/core/components/base/label";
import { Slider } from "@/core/components/base/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const PricingFilterCard = () => {
	const [expandedSections, setExpandedSections] = useState(false);

	const [priceRange, setPriceRange] = useState([200, 500]);

	return (
		<Card>
			<CardContent className="bg-white shadow-md py-4 overflow-hidden rounded-xl">
				<div
					className="flex items-center justify-between cursor-pointer"
					onClick={() => setExpandedSections((prev) => !prev)}
				>
					<h3 className="text-lg font-semibold">Pricing</h3>
					{expandedSections ? (
						<ChevronUp size={20} />
					) : (
						<ChevronDown size={20} />
					)}
				</div>
				{expandedSections && (
					<div className="space-y-4">
						<div className="flex gap-2">
							<div>
								<Label className="text-2xs text-gray-400">Minimum</Label>
								<Input type="number" value="200.00" className="text-sm" />
							</div>
							<div>
								<Label className="text-2xs text-gray-400">Maximum</Label>
								<Input type="number" value="500.00" className="text-sm" />
							</div>
						</div>
						<div className="px-2">
							<Slider
								value={priceRange}
								onValueChange={setPriceRange}
								max={1000}
								min={0}
								step={10}
								className="w-full"
							/>
							<div className="flex justify-between mt-2 text-xs text-gray-500">
								<span>₱{priceRange[0]}.00</span>
								<span>₱{priceRange[1]}.00</span>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default PricingFilterCard;
