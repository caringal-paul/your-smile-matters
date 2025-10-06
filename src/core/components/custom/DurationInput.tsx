import { Input } from "../base/input";
import { durationSchema } from "@/store-front/features/booking/utils/schemas/session-duration.schema";
import { useState } from "react";

interface DurationInputProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	hideError?: boolean;
}

export default function DurationInput({
	value,
	onChange,
	disabled = false,
	hideError = false,
}: DurationInputProps) {
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange(newValue);

		setError(null);
		try {
			if (newValue !== "") {
				durationSchema.parse(Number(newValue));
			}
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Invalid value");
		}
	};

	const handleBlur = () => {
		if (value === "") return;

		const num = Number(value);
		if (isNaN(num)) return;

		// Snap to nearest 30 only when leaving the field
		if (num % 30 !== 0) {
			const rounded = Math.round(num / 30) * 30;
			onChange(String(rounded));

			try {
				durationSchema.parse(rounded);
				setError(null);
			} catch (err: any) {
				setError(err.errors?.[0]?.message || "Invalid value");
			}
		}
	};

	return (
		<div className="flex flex-col gap-1">
			<Input
				type="number"
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				min={30}
				max={1440}
				disabled={disabled}
				step={30}
				placeholder="Enter minutes (e.g., 90)"
				className={`bg-background border rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
					error
						? "border-red-500 focus-visible:ring-red-500"
						: "border-input focus-visible:ring-ring"
				}`}
			/>
			{!hideError && error ? (
				<p className="text-sm text-red-500">{error}</p>
			) : null}
		</div>
	);
}
