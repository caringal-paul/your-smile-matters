import { BookingResponseSf } from "@/store-front/features/booking/utils/types/booking-response.sf.types";

export type MyBookingsSfTableType = {
	[K in keyof BookingResponseSf]: BookingResponseSf[K];
} & {
	action?: string;
	booking_duration?: string;
	photographer_name?: string;
	customer_name?: string;
};
