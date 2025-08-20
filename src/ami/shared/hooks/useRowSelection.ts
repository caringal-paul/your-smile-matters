// hooks/useRowSelection.ts
import { useMemo, useState } from "react";

export const useRowSelection = <T extends { id: string }>(rows: T[]) => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const allIds = useMemo(() => rows.map((row) => row.id), [rows]);

	const isAllSelected = useMemo(
		() => allIds.length > 0 && allIds.every((id) => selectedRows.includes(id)),
		[allIds, selectedRows]
	);

	const isSomeSelected = useMemo(
		() => selectedRows.length > 0 && !isAllSelected,
		[isAllSelected, selectedRows]
	);

	const handleSelectAll = (checked: boolean) => {
		setSelectedRows(checked ? allIds : []);
	};

	const handleSelectRow = (id: string, checked: boolean) => {
		setSelectedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
		);
	};

	return {
		selectedRows,
		setSelectedRows,
		isAllSelected,
		isSomeSelected,
		handleSelectAll,
		handleSelectRow,
	};
};
