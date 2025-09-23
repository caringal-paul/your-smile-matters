import { Card, CardContent } from "@/core/components/base/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CategoriesFilterCard = () => {
	const [expandedSections, setExpandedSections] = useState(false);

	const categories = [
		{ name: "All", count: 202 },
		{ name: "Photography", count: 68 },
		{ name: "Beauty", count: 102 },
		{ name: "Styling", count: 22 },
		{ name: "Equipment", count: 32 },
		{ name: "Other", count: 15 },
	];

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	return (
		<Card>
			<CardContent className="bg-white shadow-md py-4 overflow-hidden rounded-xl">
				<div
					className="flex items-center justify-between cursor-pointer"
					onClick={() => setExpandedSections((prev) => !prev)}
				>
					<h3 className="text-lg font-semibold">Categories</h3>
					{expandedSections ? (
						<ChevronUp size={20} />
					) : (
						<ChevronDown size={20} />
					)}
				</div>
				{expandedSections && (
					<div className="space-y-3 mt-2">
						{categories.map((category) => (
							<div
								key={category.name}
								className="flex items-center justify-between"
								onClick={() => handleCategoryChange(category.name)}
							>
								<label className="flex items-center space-x-2 cursor-pointer">
									<div className="flex items-center justify-center w-3 h-3 border-2 border-primary rounded-full">
										{selectedCategories.includes(category.name) && (
											<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
										)}
									</div>
									<span className="text-sm">{category.name}</span>
								</label>
								<span className="text-xs text-gray-500">
									({category.count})
								</span>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CategoriesFilterCard;
