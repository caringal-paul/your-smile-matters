import { GetAllBookingsResponseAmi } from "./booking-response.ami.types";

export type BookingAmiTableType = {
	[K in keyof GetAllBookingsResponseAmi]: GetAllBookingsResponseAmi[K];
} & {
	action?: string;
	booking_duration?: string;
};
