// export type RoleNames =
// 	| "Super Admin"
// 	| "Admin"
// 	| "Customer Experience"
// 	| "Audit";

import { AvailabilityStatus } from "@/ami/shared/types/status.types";

type User = {
	id: number;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	mobileNumber: number;
	isActive: boolean;
	// role: RoleNames;
	updated_date: string;
};

export type UserTableType = {
	[K in keyof User]: string;
} & {
	activeStatus: AvailabilityStatus;
	fullName?: string;
	action?: string;
};

export type UserFilters = Partial<Record<keyof UserTableType, string[]>>;
