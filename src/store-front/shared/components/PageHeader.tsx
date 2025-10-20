import { Button } from "@/core/components/base/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const PageHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const segments = location.pathname.split("/").filter(Boolean);

	// Check if a segment looks like an ID (MongoDB ObjectId pattern or UUID)
	const isId = (segment: string) => {
		// MongoDB ObjectId: 24 hex characters
		const mongoIdPattern = /^[a-f0-9]{24}$/i;
		// UUID pattern
		const uuidPattern =
			/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
		// Generic long hex string (adjust length as needed)
		const hexPattern = /^[a-f0-9]{20,}$/i;

		return (
			mongoIdPattern.test(segment) ||
			uuidPattern.test(segment) ||
			hexPattern.test(segment)
		);
	};

	// Convert 'service-details' → 'Service Details'
	const formatSegment = (segment: string) =>
		segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

	// Filter out IDs before rendering
	const breadcrumbSegments = segments.filter((segment) => !isId(segment));

	return (
		<div className="relative">
			<section className="px-6 py-16 text-white bg-foreground">
				<div className="container xl:mx-auto">
					<div className="space-y-6">
						<div className="flex flex-row items-center">
							<Button
								className="p-4 h-fit w-fit bg-inherit hover:bg-transparent hover:scale-125"
								onClick={() => navigate(-1)}
							>
								<ArrowLeft className="size-12" />
							</Button>
							{breadcrumbSegments.length > 0 && (
								<h1 className="text-4xl font-bold lg:text-5xl">
									{formatSegment(segments[segments.length - 1])}
								</h1>
							)}
						</div>

						{/* Breadcrumb Navigation */}
						<nav className="flex items-center gap-2 text-base ml-10">
							<Link
								to="/"
								className="text-gray-300 transition-colors hover:text-white"
							>
								Home
							</Link>
							{breadcrumbSegments.map((segment, idx) => {
								const path = "/" + segments.slice(0, idx + 1).join("/");
								const isLast = idx === segments.length - 1;
								return (
									<span key={path} className="flex items-center gap-2">
										<span>/</span>
										{isLast ? (
											<span className="font-medium text-white whitespace-nowrap">
												{formatSegment(segment)}
											</span>
										) : (
											<span className="text-gray-300 transition-colors hover:text-white whitespace-nowrap">
												{formatSegment(segment)}
											</span>
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
