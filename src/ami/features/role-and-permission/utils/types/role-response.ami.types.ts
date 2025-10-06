import { RoleModel } from "@/core/models/role.model";

export type GetAllRolesResponseAmi = Pick<
	RoleModel,
	"name" | "description" | "permissions" | "_id" | "is_active"
>;
