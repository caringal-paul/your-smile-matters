import React from "react";
import { Outlet } from "react-router-dom";
import BookingFormModal from "../components/BookingFormModal";

const BookingLayout = () => {
	return (
		<>
			<BookingFormModal />

			<Outlet />
		</>
	);
};

export default BookingLayout;
