import { cn } from "@/core/lib/utils";
import { PropsWithChildren, Ref } from "react";
import { Separator } from "../../../../core/components/base/separator";

type SectionHeaderProps = PropsWithChildren & {
	className?: string;
	ref?: Ref<HTMLDivElement>;
	hasSeparator?: boolean;
};

const SectionHeader = ({
	className,
	ref,
	children,
	hasSeparator = false,
	...props
}: SectionHeaderProps) => {
	return (
		<div
			ref={ref}
			className={cn("sticky top-0 z-10 bg-background p-1", className)}
			{...props}
		>
			{/* \ flex-wrap */}
			<div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:justify-between items-center sm:h-9 sm:max-h-9">
				{children}
			</div>

			{hasSeparator && (
				<Separator
					orientation="horizontal"
					className="bg-accent mt-4 md:my-6"
				/>
			)}
		</div>
	);
};

export default SectionHeader;
