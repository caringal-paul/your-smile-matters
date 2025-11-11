import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/core/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type = "text", ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);
		const isPasswordType = type === "password";
		const inputType = isPasswordType && showPassword ? "text" : type;

		return (
			<div className="relative w-full">
				<input
					type={inputType}
					className={cn(
						"flex h-7 py-1 w-full rounded-md border-border border-[1px] font-normal px-3 tracking-tight leading-none xs:text-2xs text-base placeholder:text-2xs placeholder:font-normal disabled:px-0 disabled:shadow-none disabled:h-fit disabled:border-none disabled:bg-transparent disabled:hover:cursor-default disabled:text-gray-500 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
						isPasswordType && "pr-10",
						className
					)}
					ref={ref}
					{...props}
				/>
				{isPasswordType && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						tabIndex={-1}
						disabled={props.disabled}
					>
						{showPassword ? (
							<EyeOff className="size-4" />
						) : (
							<Eye className="size-4" />
						)}
					</button>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
