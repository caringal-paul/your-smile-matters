export type MetaData = {
	_id: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
	retrieved_at?: string | null;
	is_active?: boolean;
	created_by?: string;
	updated_by?: string;
	deleted_by?: string;
	retrieved_by?: string;
	version?: number;
};
