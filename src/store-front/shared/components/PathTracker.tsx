// src/components/PathTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePathStore } from "@/store-front/store/usePathStore";

export const PathTracker = () => {
	const location = useLocation();
	const updatePath = usePathStore((state) => state.updatePath);
	const currentPath = usePathStore((state) => state.currentPath);

	useEffect(() => {
		const newPath = location.pathname + location.search + location.hash;
		if (newPath !== currentPath) {
			updatePath(newPath);
		}
	}, [location, currentPath, updatePath]);

	return null; // doesn't render anything
};
