import { useRef, useEffect } from "react";

export const useDebounce = (
	callback: () => void,
	delay: number,
	deps: any[]
) => {
	const handler = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (handler.current) clearTimeout(handler.current);

		handler.current = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			if (handler.current) clearTimeout(handler.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);
};
