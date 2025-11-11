import { BookingRequestResponse } from "@/core/types/base-response.types";

export type MyBookingRequestsSfTableType = {
	[K in keyof BookingRequestResponse]: BookingRequestResponse[K];
} & {
	action?: string;
	booking_reference?: string;
	reason: string | null;
	booking: string;
};
