import * as React from "react";

import { cn } from "@/core/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type = "text", ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-7 py-1 w-full rounded-md border-input-border border-[1px] font-normal px-3 tracking-tight leading-none xs:text-2xs text-base placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent  disabled:hover:cursor-default disabled:text-foreground disabled:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
