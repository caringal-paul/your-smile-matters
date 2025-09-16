export type Permission = {
	_id: string;
	module: string;
	action: string;
	key: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

export type Role = {
	_id: string;
	name: string;
	description: string;
	permissions: string[]; // Array of permission keys like "user:create"
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

export type RoleTableType = {
	[K in keyof Role]: Role[K];
} & {
	action?: string;
	version?: number;
};

export type OldPermission = {
	permission_id: number;
	name: string;
	status: boolean;
};

type OldSubmodule = {
	submodule_id: number;
	name: string;
	permissions: OldPermission[];
};

export type OldModule = {
	id: number;
	name: string;
	permissions?: OldPermission[];
	submodules?: OldSubmodule[];
};
