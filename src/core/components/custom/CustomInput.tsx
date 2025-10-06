import { useEffect, useRef, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/core/components/base/popover";
import { Button } from "@/core/components/base/button";
import { Badge } from "@/core/components/base/badge";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { SelectOptions } from "@/core/types/option.types";
import { Input } from "../base/input";
import { cn } from "@/core/lib/utils";

type MultipleSelectInput = {
	placeholder?: string;
	className?: string;
	options: SelectOptions[];
	value?: string[];
	onChange?: (
		selectedValues: string[],
		selectedOptions: SelectOptions[]
	) => void;
	disabled?: boolean;
	readOnly?: boolean;
	maxSelections?: number;
	searchPlaceholder?: string;
};

const MultipleSelectInput = ({
	placeholder = "Select items",
	options = [],
	value = [],
	onChange,
	disabled,
	readOnly,
	maxSelections,
	searchPlaceholder = "Search options",
}: MultipleSelectInput) => {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [selectedValues, setSelectedValues] = useState<string[]>(value);

	const filteredOptions = options.filter(
		(option) =>
			option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
			option.value.toLowerCase().includes(searchValue.toLowerCase())
	);

	const selectedOptions = options.filter((option) =>
		selectedValues.includes(option.value)
	);

	const handleSelect = (optionValue: string) => {
		if (readOnly || disabled) return;

		let newSelectedValues: string[];

		if (selectedValues.includes(optionValue)) {
			newSelectedValues = selectedValues.filter((val) => val !== optionValue);
		} else {
			if (maxSelections && selectedValues.length >= maxSelections) {
				return;
			}
			newSelectedValues = [...selectedValues, optionValue];
		}

		setSelectedValues(newSelectedValues);

		if (onChange) {
			const newSelectedOptions = options.filter((option) =>
				newSelectedValues.includes(option.value)
			);
			onChange(newSelectedValues, newSelectedOptions);
		}
	};

	const handleRemove = (optionValue: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (readOnly || disabled) return;

		const newSelectedValues = selectedValues.filter(
			(val) => val !== optionValue
		);
		setSelectedValues(newSelectedValues);

		if (onChange) {
			const newSelectedOptions = options.filter((option) =>
				newSelectedValues.includes(option.value)
			);
			onChange(newSelectedValues, newSelectedOptions);
		}
	};

	const clearSearch = () => {
		setSearchValue("");
	};

	useEffect(() => {
		setSelectedValues(value || []);
	}, [value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					className={`h-auto min-h-[32px] w-full pl-2 pr-3 py-[5px]
							justify-between text-left
							text-sm text-input font-medium
							bg-transparent shadow-none
							border-input-border border-[1px] rounded-lg hover:bg-transparent
						`}
					disabled={disabled || readOnly}
				>
					<div className="flex flex-wrap flex-1 w-full gap-2">
						{selectedValues.length === 0 ? (
							<span className="ml-1 font-normal text-gray-400 text-2xs">
								{placeholder}
							</span>
						) : (
							selectedOptions.map((option) => (
								<Badge
									key={option.value}
									variant="secondary"
									className={`h-6 px-2 py-1 
											text-2xs text-white font-medium
											border-input-border border-[1px]
										`}
								>
									{option.label}
									{!readOnly && !disabled && (
										<button
											className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
											onMouseDown={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
											type={"button"}
											onClick={(e) => handleRemove(option.value, e)}
										>
											<X className="size-1 text-muted-foreground hover:text-foreground" />
										</button>
									)}
								</Badge>
							))
						)}
					</div>
					<ChevronDown />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="z-50 p-0 overflow-hidden" align="start">
				<div className="flex flex-col">
					<div className="flex items-center px-3 py-2 bg-white">
						<Search className="mr-2 opacity-50 size-3 shrink-0" />
						<input
							placeholder={searchPlaceholder}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							className="w-full h-6 px-0 py-1 text-xs focus:outline-none placeholder:text-2xs"
						/>
						{searchValue && (
							<Button
								variant="ghost"
								size="sm"
								className="w-6 h-6 p-0 hover:bg-transparent"
								onClick={clearSearch}
							>
								<X className="w-3 h-3" />
							</Button>
						)}
					</div>

					<div className="overflow-auto max-h-60">
						{filteredOptions.length === 0 ? (
							<div className="px-3 py-2 text-xs text-muted-foreground">
								No options found
							</div>
						) : (
							filteredOptions.map((option) => {
								const isSelected = selectedValues.includes(option.value);
								const isDisabled =
									maxSelections &&
									!isSelected &&
									selectedValues.length >= maxSelections;

								return (
									<div
										key={option.value}
										className={`relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none
											${
												isDisabled
													? "opacity-50 cursor-not-allowed"
													: "hover:bg-background hover:text-admin-primary"
											}
											${isSelected ? "bg-accent" : ""}
										`}
										onClick={() => !isDisabled && handleSelect(option.value)}
									>
										<Check
											className={`mr-2 size-3 ${
												isSelected ? "opacity-100" : "opacity-0"
											}`}
										/>
										<span className="text-xs truncate text-foreground">
											{option.label}
										</span>
										{!!option.status && (
											<Badge className={`ml-2`}>{option.status}</Badge>
										)}
									</div>
								);
							})
						)}
					</div>

					{/* Footer with selection info */}
					{maxSelections && (
						<div className="px-3 py-2 text-xs border-t text-muted-foreground">
							{selectedValues.length}/{maxSelections} selected
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};

type PricingInputProps = {
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	readOnly?: boolean;
	prefix?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PricingInput: React.FC<PricingInputProps> = ({
	className,
	placeholder,
	disabled,
	readOnly,
	prefix = "PHP",
	value,
	onChange,
	...props
}) => {
	const [displayValue, setDisplayValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	// Format number with commas but preserve decimals as user types them
	const formatWithCommas = (value: string): string => {
		// Remove all commas first to get clean value
		const cleanValue = value.replace(/,/g, "");

		// Split by decimal point
		const parts = cleanValue.split(".");

		// Add commas to integer part
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		// Join back with decimal part if it exists
		return parts.join(".");
	};

	// Sync external value with internal display state
	useEffect(() => {
		if (value !== undefined && value !== null) {
			const formattedValue = formatWithCommas(value.toString());
			setDisplayValue(formattedValue);
		}
	}, [value]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Allow: backspace, delete, tab, escape, enter, period, and numbers
		if (
			[8, 9, 27, 13, 46, 190].includes(e.keyCode) ||
			// Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z (Windows/Linux)
			(e.keyCode === 65 && e.ctrlKey) ||
			(e.keyCode === 67 && e.ctrlKey) ||
			(e.keyCode === 86 && e.ctrlKey) ||
			(e.keyCode === 88 && e.ctrlKey) ||
			(e.keyCode === 90 && e.ctrlKey) ||
			// Allow Cmd+A, Cmd+C, Cmd+V, Cmd+X, Cmd+Z (Mac)
			(e.keyCode === 65 && e.metaKey) ||
			(e.keyCode === 67 && e.metaKey) ||
			(e.keyCode === 86 && e.metaKey) ||
			(e.keyCode === 88 && e.metaKey) ||
			(e.keyCode === 90 && e.metaKey) ||
			// Allow home, end, left, right arrows
			(e.keyCode >= 35 && e.keyCode <= 39)
		) {
			return;
		}

		// Block 'e', 'E', and other special characters except comma (we'll handle comma in formatting)
		if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
			e.preventDefault();
			return;
		}

		// Only allow numbers and one decimal point
		if (!/[\d.]/.test(e.key)) {
			e.preventDefault();
		}

		// Prevent multiple decimal points
		if (
			e.key === "." &&
			e.currentTarget.value.replace(/,/g, "").includes(".")
		) {
			e.preventDefault();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const cursorPosition = e.target.selectionStart || 0;

		// Clean number (no commas, no extra chars)
		const cleanValue = inputValue.replace(/[^\d.]/g, "");
		const parts = cleanValue.split(".");
		const finalCleanValue =
			parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleanValue;

		// Format for display
		const formattedValue = formatWithCommas(finalCleanValue);

		// Adjust cursor after formatting
		const commasBefore = (
			inputValue.substring(0, cursorPosition).match(/,/g) || []
		).length;
		const commasAfter = (
			formattedValue.substring(0, cursorPosition).match(/,/g) || []
		).length;
		const newCursorPosition = cursorPosition + (commasAfter - commasBefore);

		setDisplayValue(formattedValue);

		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(
					newCursorPosition,
					newCursorPosition
				);
			}
		}, 0);

		if (onChange) {
			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					value: finalCleanValue ? `${finalCleanValue}` : "",
				},
			};
			onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const paste = e.clipboardData.getData("text");
		const cleanPaste = paste.replace(/[^\d.]/g, "");

		if (cleanPaste) {
			const formattedValue = formatWithCommas(cleanPaste);
			setDisplayValue(formattedValue);

			if (onChange) {
				// Round to 2 decimal places
				const numericValue = parseFloat(cleanPaste) || 0;
				const roundedValue = Math.round(numericValue * 100) / 100;
				const roundedString = roundedValue.toFixed(2);

				const syntheticEvent = {
					target: { value: roundedString },
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}
		}
	};

	return (
		<div
			className={`
		  flex items-center h-[32px] rounded-md border-[1px] border-input-border 
		  bg-input-background text-sm text-input font-medium
		  focus-within:outline-2 focus-within:outline focus-within:outline-blue-700
		  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
		  ${className}
		`}
		>
			<span className="pl-3 pr-0 text-xs font-normal text-gray-400">
				{prefix}
			</span>
			<input
				ref={inputRef}
				type="text"
				inputMode="decimal"
				className={`
					flex-1 h-full pl-2 pr-3 py-1 bg-transparent placeholder:font-normal
					xs:text-2xs text-base
					focus:outline-none
					${readOnly ? "text-gray-400" : ""}
				`}
				placeholder={placeholder ?? "Enter amount"}
				disabled={disabled}
				readOnly={readOnly}
				value={displayValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
				{...props}
			/>
		</div>
	);
};

type InputWithSuffixProps = React.InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	readOnly?: boolean;
	suffix?: string;
	value?: string | number;
	type: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithSuffix = ({
	className,
	placeholder,
	disabled,
	readOnly,
	suffix,
	value,
	onChange,
	type = "text",
	...props
}: InputWithSuffixProps) => {
	return (
		<div className="flex flex-row relative">
			<Input
				type={type}
				readOnly={readOnly}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				className={cn(`text-[11px] w-full pr-11`, className)}
				onChange={onChange}
				{...props}
			/>

			<span className="absolute right-3 top-1/2 -translate-y-1/2  text-2xs 2xl:text-xs text-gray-200">
				{suffix}
			</span>
		</div>
	);
};

export { MultipleSelectInput, PricingInput, InputWithSuffix };
