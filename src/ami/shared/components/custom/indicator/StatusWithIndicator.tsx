import { cn } from "@/core/lib/utils";
import RolloverIndicatorIcon from "@/ami/shared/assets/icons/RolloverIndicatorIcon";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/base/tooltip";
import InfoIcon from "@/ami/shared/assets/icons/InfoIcon";

type StatusWithIndicatorProps<T extends string> = {
	className?: string;
	textClassName?: string;
	value: T;
	colorMap: Record<T, string>;
	reason?: string;
};

const StatusWithIndicator = <T extends string>({
	className,
	textClassName,
	value,
	colorMap,
	reason,
}: StatusWithIndicatorProps<T>) => {
	return (
		<div
			className={cn("font-normal text-xs flex items-center gap-2", className)}
		>
			<div className={cn(`h-2 w-2 rounded-full`, colorMap[value])} />
			{value == "Invested Rollover" ? (
				<span className={`${textClassName} flex flex-row gap-1`}>
					{value.split(" ")[0]} <RolloverIndicatorIcon className="h-4 w-4" />
				</span>
			) : (
				<span className={`${textClassName} truncate`}>{value}</span>
			)}

			{value == "Terminated" && !!reason ? (
				<Tooltip delayDuration={200}>
					<TooltipTrigger asChild className="cursor-pointer">
						<div>
							<InfoIcon className="h-3 w-3" fill="black" />
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>{reason}</p>
					</TooltipContent>
				</Tooltip>
			) : null}
		</div>
	);
};

export default StatusWithIndicator;
