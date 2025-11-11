import { RatableType } from "./base.types";

export interface CreateRatingPayload {
	booking_id: string;
	ratable_type: RatableType;
	ratable_id: string;
	rating: number;
	comment?: string;
}

export interface UpdateRatingPayload {
	rating?: number;
	comment?: string;
}
