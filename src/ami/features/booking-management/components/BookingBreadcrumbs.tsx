import BackIcon from "@/ami/shared/assets/icons/BackIcon";
import { Button } from "@/core/components/base/button";
import { Label } from "@/core/components/base/label";
import SectionHeader from "@/ami/shared/components/header/SectionHeader";
import { ChevronRight } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const BookingBreadcrumbs = () => {
	const navigate = useNavigate();

	return (
		<div>
			<SectionHeader className="flex justify-start mb-4">
				<div>
					<Label className="flex flex-row flex-wrap items-center gap-1 font-normal text-md">
						<Button
							variant={"icon"}
							onClick={() => navigate("/admin/ami/booking-management/bookings")}
							className="px-2 font-normal hover:bg-transparent text-md"
						>
							<BackIcon fill="#1C1B1F" className="w-4 h-4" /> Customer Bookings
						</Button>
						<ChevronRight className="w-4 h-4" />{" "}
						<span className="text-admin-secondary">Booking Details</span>
					</Label>
				</div>
			</SectionHeader>

			<Outlet />
		</div>
	);
};

export default BookingBreadcrumbs;
