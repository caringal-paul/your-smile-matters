import { LabelHTMLAttributes, PropsWithChildren, Ref } from "react";
import { Label } from "../../../../../core/components/base/label";
import { Separator } from "../../../../../core/components/base/separator";
import { cn } from "@/core/lib/utils";

type FormCardProp = PropsWithChildren & {
	className?: string;
};

const FormCard = ({ children, className }: FormCardProp) => {
	return (
		<div
			className={cn(
				"mt-4 py-4 px-5 h-full w-full bg-white border-border border-2 rounded-lg",
				className
			)}
		>
			{children}
		</div>
	);
};

type FormCardTitleProps = PropsWithChildren & {
	className?: string;
	hasSeparator?: boolean;
};

const FormCardTitle = ({
	children,
	className,
	hasSeparator = true,
}: FormCardTitleProps) => {
	return (
		<div>
			<div className={cn("text-md font-semibold", className)}>{children}</div>

			{hasSeparator && (
				<Separator
					orientation="horizontal"
					className="bg-accent h-[1.5px] mt-2 md:my-3"
				/>
			)}
		</div>
	);
};

type FormCardBodyProps = PropsWithChildren & {
	className?: string;
};

const FormCardBody = ({ children, className }: FormCardBodyProps) => {
	return <div className={cn("space-y-2 my-4", className)}>{children}</div>;
};

type FormCardFooterProps = PropsWithChildren & {
	className?: string;
};

const FormCardFooter = ({ children, className }: FormCardFooterProps) => {
	return (
		<div className={cn("flex gap-2 justify-end", className)}>{children}</div>
	);
};

type FormCardFieldProps = PropsWithChildren & {
	className?: string;
};

const FormCardField = ({ children, className }: FormCardFieldProps) => {
	return (
		//
		<div
			className={cn(
				"w-full h-fit gap-1 items-center grid grid-cols-1 md:grid-cols-[20%_1fr]",
				className
			)}
		>
			{children}
		</div>
	);
};

type FormCardLabelProps = PropsWithChildren &
	LabelHTMLAttributes<HTMLLabelElement> & {
		className?: string;
		ref?: Ref<HTMLLabelElement>;
	};

const FormCardLabel = ({
	className,
	ref,
	children,
	...props
}: FormCardLabelProps) => {
	return (
		<Label
			ref={ref}
			{...props}
			className={cn("text-[11px] font-semibold", className)}
		>
			{children}
		</Label>
	);
};

FormCard.Title = FormCardTitle;
FormCard.Body = FormCardBody;
FormCard.Label = FormCardLabel;
FormCard.Field = FormCardField;
FormCard.Footer = FormCardFooter;

export default FormCard;
