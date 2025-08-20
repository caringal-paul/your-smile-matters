/**
 * ? Sample params (e.g 'answer', 'id', 'created_by')
 * @returns Answer, Id, Created By
 * */
export const formatToProperText = (key: string): string => {
	return key
		.split(/[_-]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
