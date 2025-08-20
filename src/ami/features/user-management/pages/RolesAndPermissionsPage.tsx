import RoleOptionButtons from "../components/RoleOptionButtons";
import RolesAndPermissionsForm from "../components/RolesAndPermissionsForm";

const RolesAndPermissionsPage = () => {
	return (
		<div className="w-full h-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 overflow-y-hidden">
			<RoleOptionButtons />

			<RolesAndPermissionsForm />
		</div>
	);
};

export default RolesAndPermissionsPage;
