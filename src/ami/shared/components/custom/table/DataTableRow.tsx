import { cn } from "@/core/lib/utils";

type DataTableRowProps = {
	value: any;
	className?: string;
};

export const DataTableRow = ({ value, className }: DataTableRowProps) => {
	return (
		<div className={cn("font-normal text-xs truncate", className)}>
			{String(value)}
		</div>
	);
};
