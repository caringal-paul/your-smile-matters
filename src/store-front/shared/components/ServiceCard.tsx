import { Card, CardContent, CardHeader } from "@/core/components/base/card";
import { Button } from "@/core/components/base/button";
import { Heart, MapPin } from "lucide-react";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { Label } from "@/core/components/base/label";

interface ServiceCardProps {
	category: string;
	title: string;
	location: string;
	price: number;
	oldPrice?: number;
	image: string;
	onBook?: () => void;
}

export function ServiceCard({
	category,
	title,
	location,
	price,
	oldPrice,
	image,
	onBook,
}: ServiceCardProps) {
	return (
		<Card className="max-w-xs overflow-hidden transition shadow-md rounded-2xl hover:shadow-lg">
			{/* Image */}
			<CardHeader className="relative p-0">
				<img
					src={image || "/sf/ysm-card-fallback.png"}
					alt={title}
					className="object-cover w-full h-52"
					onError={(e) => {
						e.currentTarget.src = "/sf/ysm-card-fallback.png";
					}}
				/>
				<button className="absolute p-2 bg-white rounded-lg shadow top-3 right-3 hover:bg-gray-100">
					<Heart size={18} className="text-gray-600" />
				</button>
			</CardHeader>

			{/* Content */}
			<CardContent className="p-5 space-y-3">
				<p className="text-sm text-gray-500">{category}</p>
				<h3 className="text-lg font-semibold">{title}</h3>

				{/* Location */}
				<div className="flex items-center gap-2 text-sm text-gray-600 w-[17em]">
					<MapPin size={16} className="shrink-0" />
					<span className="truncate">{location}</span>
				</div>

				{/* Price + Button */}
				<div className="flex items-center justify-between pt-3">
					<div className="flex flex-col justify-start gap-2">
						<span className="text-xl font-bold">
							{formatToPeso(price.toFixed(2))}
						</span>
						{oldPrice && (
							<span className="text-sm text-gray-400 line-through">
								{formatToPeso(oldPrice.toFixed(2))}
							</span>
						)}
					</div>
					<Button
						onClick={onBook}
						className="px-6 bg-gradient-to-r from-primary to-primary/65 hover:opacity-90"
					>
						View Service
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
