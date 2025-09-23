import { useLocation, Link } from "react-router-dom";

const PageHeader = () => {
	const location = useLocation();
	const segments = location.pathname.split("/").filter(Boolean);

	// Convert 'service-details' → 'Service Details'
	const formatSegment = (segment: string) =>
		segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

	return (
		<div className="relative">
			<section className="px-6 py-16 text-white bg-foreground">
				<div className="container mx-auto">
					<div className="space-y-6">
						{/* Main Title */}
						{segments.length > 0 && (
							<h1 className="text-4xl font-bold lg:text-5xl">
								{formatSegment(segments[segments.length - 1])}
							</h1>
						)}

						{/* Breadcrumb Navigation */}
						<nav className="flex items-center gap-2 text-base">
							<Link
								to="/"
								className="text-gray-300 transition-colors hover:text-white"
							>
								Home
							</Link>
							{segments.map((segment, idx) => {
								const path = "/" + segments.slice(0, idx + 1).join("/");
								const isLast = idx === segments.length - 1;
								return (
									<span key={path} className="flex items-center gap-2">
										<span>/</span>
										{isLast ? (
											<span className="font-medium text-white">
												{formatSegment(segment)}
											</span>
										) : (
											<Link
												to={path}
												className="text-gray-300 transition-colors hover:text-white"
											>
												{formatSegment(segment)}
											</Link>
										)}
									</span>
								);
							})}
						</nav>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PageHeader;
