import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[13px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  disabled:bg-disabled disabled:text-text disabled:border-[1px] disabled:border-border-background disabled:border-button-disabled",
	{
		variants: {
			variant: {
				admin_sidebar:
					"h-fit py-1 px-2 justify-start rounded-md bg-transparent hover:bg-admin-primary-foreground [&_svg]:size-3 [&_svg]:shrink-0",

				sf: "bg-gradient-to-r from-primary to-primary/65 hover:opacity-90 text-white",

				default:
					"bg-primary text-white hover:bg-primary/80 disabled:bg-primary disabled:text-white disabled:opacity-20 shadow-md [&_svg]:size-4 [&_svg]:shrink-0",
				secondary:
					"shadow-md bg-secondary text-white hover:bg-secondary-hover disabled:bg-secondary-disabled disabled:text-white disabled:opacity-20",
				nav: "bg-button text-white shadow",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				sidebar:
					"h-fit py-1 px-2 justify-start rounded-md hover:bg-primary-foreground [&_svg]:size-3 [&_svg]:shrink-0",

				link: "truncate flex flex-row items-center gap-1 hover:text-primary hover:underline",

				// NOT USED?
				icon: "bg-transparent hover:bg-accent text-foreground border-none disabled:bg-transparent",
				role: "w-full justify-between rounded-[13px] shadow-none border-2 bg-white hover:bg-white-foreground",
				roleSelected:
					"w-full justify-between rounded-[13px] shadow-none border-2 text-white bg-primary-foreground",

				ghost: "hover:bg-accent hover:text-accent-foreground",
				edit: "text-2xs text-foreground gap-1 hover:border-b-[1px] hover:border-secondary rounded-none shadow-none [&_svg]:size-3 [&_svg]:shrink-0",

				dismiss:
					"border-2 border-dismiss-border bg-dismiss text-dismiss-secondary rounded-2xl",
				confirm:
					"bg-primary text-primary-button-text rounded-2xl hover:bg-primary-hover disabled:bg-primary disabled:text-white disabled:opacity-20 shadow-md [&_svg]:size-4 [&_svg]:shrink-0",

				undefined: "",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3  text-[10px] sm:text-2xs",
				lg: "h-10 px-8",
				icon: "h-9 w-9 [&_svg]:size-4 [&_svg]:shrink-0",
				edit: "h-5 w-fit p-0",
				confirm: "h-14 w-full px-4",
				dismiss: "h-14 w-fit px-4",
				undefined: "",
				link: "font-normal text-2xs 2xl:text-xs w-fit p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
