import { Card, CardContent, CardHeader } from "@/core/components/base/card";
import { Button } from "@/core/components/base/button";
import { Book, Clock, Eye, Heart, MapPin } from "lucide-react";
import { formatToPeso } from "@/ami/shared/helpers/formatCurrency";
import { formatDurationByMinutes } from "../helpers/formatDuration";
import { Badge } from "@/core/components/base/badge";
import { Label } from "@/core/components/base/label";

interface ServiceCardProps {
	category: string;
	title: string;
	duration_minutes?: number;
	price: number;
	oldPrice?: number;
	image: string;
	onBook?: () => void;
	onView?: () => void;
}

export function ServiceCard({
	category,
	title,
	duration_minutes,
	price,
	oldPrice,
	image,
	onBook,
	onView,
}: ServiceCardProps) {
	return (
		<Card className="max-w-xs overflow-hidden transition shadow-md rounded-2xl hover:shadow-lg flex flex-col">
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

			<CardContent className="p-4 pb-6 flex flex-col flex-1">
				<div className="space-y-1">
					<Label className="text-2xl font-bold tracking-normal">{title}</Label>
					<div className="flex gap-2 items-center">
						<Badge className="hover:bg-secondary bg-secondary">
							{category}
						</Badge>

						<div className="flex items-center gap-1 text-2xs text-gray-400">
							<Clock size={12} className="shrink-0" />
							<span className="truncate">
								{formatDurationByMinutes(duration_minutes ?? 120)}
							</span>
						</div>
					</div>

					<div className="flex flex-row items-center justify-start gap-2 tracking-tight">
						<span className="text-lg font-semibold ">
							{formatToPeso(price.toFixed(2))}
						</span>
						{oldPrice ? (
							<span className="text-sm text-gray-400 line-through">
								{formatToPeso(oldPrice.toFixed(2))}
							</span>
						) : null}
					</div>
				</div>

				<div className="flex items-center justify-between pt-3 mt-auto">
					<Button
						onClick={onBook}
						className="text-2xs bg-gradient-to-r from-primary to-primary/65 hover:opacity-90 px-4"
					>
						<Book />
						Book Service
					</Button>
					<Button
						onClick={onView}
						className="text-2xs bg-gradient-to-r from-primary to-primary/65 hover:opacity-90 px-4"
					>
						<Eye /> View Service
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
