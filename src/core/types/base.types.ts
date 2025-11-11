export type MetaData = {
	_id: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
	retrieved_at?: string | null;
	is_active?: boolean;
	created_by?: string;
	updated_by?: string;
	deleted_by?: string;
	retrieved_by?: string;
	version?: number;
};

export type BaseResponseDto<T> = {
	status: number;
	message: string;
	data: T | null;
	error?: string;
};

export type Gender = "Male" | "Female" | "Other";

export type RatableType = "Service" | "Package";

export enum RatableEnum {
	SERVICE = "Service",
	PACKAGE = "Package",
}
