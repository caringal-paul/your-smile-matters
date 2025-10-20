import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const labelVariants = cva(
	"tracking-tight leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			variant: {
				gradient:
					"text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80",

				sf: "text-foreground",

				undefined: "",
			},
			size: {
				undefined: "",

				"sf-normal": "text-sm font-light",

				default: "text-sm font-medium",
			},
		},
		defaultVariants: {
			variant: "undefined",
			size: "default",
		},
	}
);

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
