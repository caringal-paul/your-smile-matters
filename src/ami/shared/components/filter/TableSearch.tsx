import SearchIcon from "@/ami/shared/assets/icons/SearchIcon";
import { Input } from "../../../../core/components/base/input";
import { cn } from "@/core/lib/utils";
import { X } from "lucide-react";

interface TableSearchProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

const TableSearch = ({
	value,
	onChange,
	placeholder = "Search",
	className = "",
}: TableSearchProps) => {
	return (
		<div className="relative w-full">
			<SearchIcon
				className="h-5 w-5 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-border-button"
				fill="#2D2F2F"
			/>
			<Input
				className={cn(
					"w-full sm:w-64 md:w-80 md:text-xs md:placeholder:text-xs h-9 rounded-full border-2 border-border- pl-10 2xl:pl-11 text-2xs placeholder:text-2xs leading-none shadow-none tracking-tight pr-8",
					className
				)}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>

			{value && (
				<button
					className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-border-button"
					onClick={() => onChange("")}
				>
					<X className="h-3 w-3 text-black" />
				</button>
			)}
		</div>
	);
};

export default TableSearch;
