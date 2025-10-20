// src/store-front/store/useMyCredentials.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MyCredentials = {
	_id: string;
	customer_no?: string;
	profile_image?: string | null;
	email: string;
	first_name: string;
	last_name: string;
	mobile_number: string;
	gender: string;
	is_active?: boolean;
	created_at?: Date;
	updated_at?: Date;
};

type MyCredentialsState = {
	myCredentials: MyCredentials | null;
	setMyCredentials: (data: MyCredentials) => void;
	clearMyCredentials: () => void;
};

export const useMyCredentials = create<MyCredentialsState>()(
	persist(
		(set) => ({
			myCredentials: null,
			setMyCredentials: (data) => set({ myCredentials: data }),
			clearMyCredentials: () => set({ myCredentials: null }),
		}),
		{
			name: "customer-logged-in",
		}
	)
);
