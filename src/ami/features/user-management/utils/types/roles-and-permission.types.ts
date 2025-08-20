export type Permission = {
	permission_id: number;
	name: string;
	status: boolean;
};

type Submodule = {
	submodule_id: number;
	name: string;
	permissions: Permission[];
};

export type Module = {
	id: number;
	name: string;
	permissions?: Permission[];
	submodules?: Submodule[];
};
