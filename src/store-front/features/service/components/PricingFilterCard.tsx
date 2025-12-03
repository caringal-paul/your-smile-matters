import { Card, CardContent } from "@/core/components/base/card";
import { Input } from "@/core/components/base/input";
import { Label } from "@/core/components/base/label";
import { Slider } from "@/core/components/base/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PricingFilterCardProps {
	priceRange: { min: number; max: number };
	onPriceRangeChange: (range: { min: number; max: number }) => void;
}

const PricingFilterCard = ({
	priceRange,
	onPriceRangeChange,
}: PricingFilterCardProps) => {
	const [expandedSections, setExpandedSections] = useState(true);

	// Local state for slider values [min, max]
	const [sliderValues, setSliderValues] = useState([
		priceRange.min === 0 ? 0 : priceRange.min,
		priceRange.max === Infinity ? 10000000 : priceRange.max,
	]);

	const handleSliderChange = (values: number[]) => {
		setSliderValues(values);
		onPriceRangeChange({ min: values[0], max: values[1] });
	};

	const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value) || 0;
		const newMin = Math.min(value, sliderValues[1]);
		setSliderValues([newMin, sliderValues[1]]);
		onPriceRangeChange({ min: newMin, max: sliderValues[1] });
	};

	const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value) || 10000;
		const newMax = Math.max(value, sliderValues[0]);
		setSliderValues([sliderValues[0], newMax]);
		onPriceRangeChange({ min: sliderValues[0], max: newMax });
	};

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
					<div className="space-y-4 mt-2">
						<div className="flex gap-2">
							<div className="flex-1">
								<Label className="text-2xs text-gray-400">Minimum</Label>
								<Input
									type="number"
									value={sliderValues[0]}
									onChange={handleMinInputChange}
									className="text-sm"
									min={0}
									max={sliderValues[1]}
								/>
							</div>
							<div className="flex-1">
								<Label className="text-2xs text-gray-400">Maximum</Label>
								<Input
									type="number"
									value={sliderValues[1]}
									onChange={handleMaxInputChange}
									className="text-sm"
									min={sliderValues[0]}
								/>
							</div>
						</div>
						<div className="px-2">
							<Slider
								value={sliderValues}
								onValueChange={handleSliderChange}
								max={10000}
								min={0}
								step={50}
								className="w-full"
							/>
							<div className="flex justify-between mt-2 text-xs text-gray-500">
								<span>₱{sliderValues[0].toFixed(2)}</span>
								<span>₱{sliderValues[1].toFixed(2)}</span>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default PricingFilterCard;
