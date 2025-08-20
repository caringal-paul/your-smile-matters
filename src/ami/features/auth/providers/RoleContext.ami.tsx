import { createContext, useState, ReactNode } from "react";

type ModulePermissionAccess = {
	module_id: number;
	permission_id: number;
	status: boolean;
};

type RolePermission = {
	role_id: number;
	permissions: ModulePermissionAccess[];
};

export type Role = {
	id: number;
	name: string;
	description: string;
	role_permissions?: RolePermission[];
};

type RoleContextType = {
	selectedRole: Role | null;
	setSelectedRole: (role: Role | null) => void;
};

const RoleContext = createContext<RoleContextType | null>(null);

type RoleProviderProps = {
	children: ReactNode;
};

const RoleProvider = ({ children }: RoleProviderProps) => {
	const [selectedRole, setSelectedRole] = useState<Role | null>({
		id: 1,
		name: "Super Admin",
		description:
			"Full access to all system settings, user management, and business configurations. Responsible for overseeing and managing all platform operations.",
	});

	return (
		<RoleContext value={{ selectedRole, setSelectedRole }}>
			{children}
		</RoleContext>
	);
};

export { RoleContext, RoleProvider };
