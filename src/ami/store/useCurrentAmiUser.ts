// src/store-front/store/useCurrentAmiUser.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AmiRolePermission = {
	name: string;
	description: string;
	permissions: string[];
};

export type CurrentAmiUserModel = {
	_id: string;
	email: string;
	first_name: string;
	last_name: string;
	username: string;
	mobile_number: string;
	role_id: string;
	is_photographer: boolean;
	role_and_permissions: AmiRolePermission;
	// optional
	profile_image?: string | null;
};

type CurrentAmiUserState = {
	currentUser: CurrentAmiUserModel | null;
	setCurrentUser: (data: CurrentAmiUserModel) => void;
	clearCurrentUser: () => void;
};

export const useCurrentAmiUser = create<CurrentAmiUserState>()(
	persist(
		(set) => ({
			currentUser: null,

			setCurrentUser: (data) => set({ currentUser: data }),

			clearCurrentUser: () => set({ currentUser: null }),
		}),
		{
			name: "ami-current-user",
		}
	)
);
