import { Card, CardContent } from "@/core/components/base/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CategoriesFilterCardProps {
	selectedCategories: string[];
	onCategoriesChange: (categories: string[]) => void;
	allServices?: any[]; // Optional: to calculate real counts
}

const CategoriesFilterCard = ({
	selectedCategories,
	onCategoriesChange,
	allServices = [],
}: CategoriesFilterCardProps) => {
	const [expandedSections, setExpandedSections] = useState(true);

	// Calculate category counts from actual services
	const getCategoryCount = (categoryName: string) => {
		if (categoryName === "All") {
			return allServices.length;
		}
		return allServices.filter((service) => service.category === categoryName)
			.length;
	};

	const categories = [
		{ name: "All", count: getCategoryCount("All") },
		{ name: "Photography", count: getCategoryCount("Photography") },
		{ name: "Beauty", count: getCategoryCount("Beauty") },
		{ name: "Styling", count: getCategoryCount("Styling") },
		{ name: "Equipment", count: getCategoryCount("Equipment") },
		{ name: "Other", count: getCategoryCount("Other") },
	];

	const handleCategoryChange = (category: string) => {
		if (category === "All") {
			// If "All" is selected, clear all categories
			onCategoriesChange([]);
		} else {
			// Toggle the category
			const newCategories = selectedCategories.includes(category)
				? selectedCategories.filter((c) => c !== category)
				: [...selectedCategories, category];
			onCategoriesChange(newCategories);
		}
	};

	// "All" is selected when no specific categories are selected
	const isAllSelected = selectedCategories.length === 0;

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
						{categories.map((category) => {
							const isSelected =
								category.name === "All"
									? isAllSelected
									: selectedCategories.includes(category.name);

							return (
								<div
									key={category.name}
									className="flex items-center justify-between"
									onClick={() => handleCategoryChange(category.name)}
								>
									<label className="flex items-center space-x-2 cursor-pointer">
										<div className="flex items-center justify-center w-3 h-3 border-2 border-primary rounded-full">
											{isSelected && (
												<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
											)}
										</div>
										<span className="text-sm">{category.name}</span>
									</label>
								</div>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CategoriesFilterCard;
