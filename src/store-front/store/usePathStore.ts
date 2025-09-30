// src/store-front/store/usePathStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PathState = {
	currentPath: string | null;
	lastPath: string | null;
	updatePath: (newPath: string) => void;
	clearPaths: () => void;
};

export const usePathStore = create<PathState>()(
	persist(
		(set, get) => ({
			currentPath: null,
			lastPath: null,
			updatePath: (newPath) => {
				const { currentPath } = get();
				set({
					lastPath: currentPath, // move current → last
					currentPath: newPath, // set new current
				});
			},
			clearPaths: () => set({ currentPath: null, lastPath: null }),
		}),
		{
			name: "path-key",
		}
	)
);
