import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/core/components/base/card";
import { divide } from "lodash";

type MetricCardProps = {
	title: string;
	subTitle?: string;
	value: number | string | undefined;
	change?: number;
	icon: React.ComponentType<{ className?: string }>;
	prefix?: string;
	suffix?: string;
	description?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	subTitle,
	value,
	change,
	icon: Icon,
	prefix = "",
	suffix = "",
	description = "",
}) => {
	const isPositive = change ? change >= 0 : false;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="flex flex-col gap-0 text-sm font-medium text-gray-600">
					{title}
					{subTitle && (
						<span className="text-xs text-gray-400">{subTitle}</span>
					)}
				</CardTitle>

				<Icon className="h-4 w-4 text-gray-400" />
			</CardHeader>
			<CardContent className="flex flex-col gap-0 justify-end">
				<div className="text-2xl font-bold text-foreground">
					{prefix}
					{typeof value === "number" ? value.toLocaleString() : value}
					{suffix}
				</div>
				{change !== undefined ? (
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
				) : null}

				{description ? (
					<div className="text-xs text-gray-500 mt-1">{description}</div>
				) : null}
			</CardContent>
		</Card>
	);
};

export default MetricCard;
