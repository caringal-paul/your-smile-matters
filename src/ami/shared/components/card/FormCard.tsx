import { Label } from "@/core/components/base/label";
import { Separator } from "@/core/components/base/separator";
import { cn } from "@/core/lib/utils";
import { LabelHTMLAttributes, PropsWithChildren, Ref } from "react";

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
	return <div className={cn("space-y-4 my-4", className)}>{children}</div>;
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
		<div
			className={cn(
				"w-full h-fit grid grid-cols-1 gap-1 items-center md:grid-cols-[20%_1fr]",
				className
			)}
		>
			{children}
		</div>
	);
};

type FormCardDescriptionProps = PropsWithChildren & {
	className?: string;
};

const FormCardDescription = ({
	children,
	className,
}: FormCardDescriptionProps) => {
	return (
		<Label
			className={cn(
				"ml-1 text-gray-400 font-light tracking-tighter text-2xs italic",
				className
			)}
		>
			{children}
		</Label>
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
			className={cn("text-2xs 2xl:text-xs font-semibold", className)}
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
FormCard.Description = FormCardDescription;

export default FormCard;
