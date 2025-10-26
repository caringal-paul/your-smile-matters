import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";

type MetricCardProps = {
	title: string;
	value: number | string | undefined;
	change: number | undefined;
	icon: React.ComponentType<{ className?: string }>;
	prefix?: string;
	suffix?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	change = 0,
	icon: Icon,
	prefix = "",
	suffix = "",
}) => {
	const isPositive = change >= 0;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-gray-600">
					{title}
				</CardTitle>
				<Icon className="h-4 w-4 text-gray-400" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-foreground">
					{prefix}
					{typeof value === "number" ? value.toLocaleString() : value}
					{suffix}
				</div>
				{change !== undefined && (
					<div className="flex items-center text-sm mt-1">
						{isPositive ? (
							<TrendingUp className="h-4 w-4 text-green-500 mr-1" />
						) : (
							<TrendingDown className="h-4 w-4 text-red-500 mr-1" />
						)}
						<span className={isPositive ? "text-green-600" : "text-red-600"}>
							{Math.abs(change)}%
						</span>
						<span className="text-gray-500 ml-1">vs last month</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default MetricCard;
