const EditIcon = ({
	fill = "#1C1B1F",
	className,
}: {
	fill?: string;
	className?: string;
}) => {
	return (
		<svg
			viewBox="0 0 30 30"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<mask
				id="mask0_7209_56173"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="24"
				height="24"
			>
				<rect width="24" height="24" fill="#D9D9D9" />
			</mask>
			<g mask="url(#mask0_7209_56173)">
				<path
					d="M4.19768 20.9754C3.84768 21.0587 3.54351 20.9712 3.28518 20.7129C3.02684 20.4546 2.93934 20.1504 3.02268 19.8004L3.89768 15.5504L8.44767 20.1004L4.19768 20.9754ZM10.0727 18.8754L5.12268 13.9254L15.4477 3.60039C15.831 3.21706 16.306 3.02539 16.8727 3.02539C17.4393 3.02539 17.9143 3.21706 18.2977 3.60039L20.3977 5.70039C20.781 6.08372 20.9727 6.55872 20.9727 7.12539C20.9727 7.69206 20.781 8.16706 20.3977 8.55039L10.0727 18.8754Z"
					fill={fill}
				/>
			</g>
		</svg>
	);
};

export default EditIcon;
