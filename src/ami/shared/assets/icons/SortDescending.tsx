const SortDescending = ({
	fill = "none",
	className,
}: {
	fill?: string;
	className?: string;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill={fill}
			className={className}
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m3 16 4 4 4-4" />
			<path d="M7 20V4" />
			<path d="M11 4h4" />
			<path d="M11 8h7" />
			<path d="M11 12h10" />
		</svg>
	);
};

export default SortDescending;
