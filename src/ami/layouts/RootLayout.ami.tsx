import { Outlet } from "react-router-dom";
import ResponsiveSidebar from "../shared/components/sidebar/ResponsiveSidebar";
import { useGetCurrentUserLoggedInQuery } from "../features/account-settings/queries/getCurrentUserLoggedIn.ami.query";
import {
	CurrentAmiUserModel,
	useCurrentAmiUser,
} from "../store/useCurrentAmiUser";

const RootLayout = () => {
	const { data: currUserLoggedIn, isLoading: isUserDataFetching } =
		useGetCurrentUserLoggedInQuery();

	const setCurrentUser = useCurrentAmiUser((state) => state.setCurrentUser);
	const clearCurrentUser = useCurrentAmiUser((state) => state.clearCurrentUser);

	if (!currUserLoggedIn && !isUserDataFetching) {
		clearCurrentUser();
	} else {
		try {
			setCurrentUser(currUserLoggedIn as unknown as CurrentAmiUserModel);
		} catch (error) {
			clearCurrentUser();
		}
	}

	return (
		<div className="relative w-screen min-h-screen overflow-hidden xl:flex font-poppins">
			<ResponsiveSidebar />

			<div className="relative flex flex-col w-full h-screen p-4 xl:px-12 xl:pt-12 xl:pb-0">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
