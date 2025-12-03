import React from "react";
import { Outlet } from "react-router-dom";
import BookingFormModal from "../components/BookingFormModal";

const BookingLayout = () => {
	return <Outlet />;
};

export default BookingLayout;
