import RolesAndPermissionsTable from "../components/RolesAndPermissionsTable";

const RolesAndPermissionsPage = () => {
	return (
		<div className="w-full h-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 overflow-y-hidden pb-8">
			{/* <RoleOptionButtons />

			<RolesAndPermissionsForm /> */}
			<RolesAndPermissionsTable />
		</div>
	);
};

export default RolesAndPermissionsPage;
