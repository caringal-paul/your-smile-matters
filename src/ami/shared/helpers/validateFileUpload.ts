export const validateFileSize = ({
	file,
	form,
	errorMessage,
	fieldName,
	sizeLimit,
}: {
	file: File;
	form?: any;
	errorMessage: string;
	fieldName: string;
	sizeLimit: number;
}) => {
	const convertToMb = (sizeLimit: number) => {
		return sizeLimit * 1024 * 1024 * 1024 * 1024 * 1024;
	};

	if (file.size > convertToMb(sizeLimit)) {
		form.setError(fieldName, {
			message: errorMessage,
		});
		return false;
	}

	return true;
};

export const validateFileExtension = ({
	file,
	form,
	errorMessage,
	fieldName,
	validExtensions,
}: {
	file: File;
	form?: any;
	errorMessage: string;
	fieldName: string;
	validExtensions: string[];
}) => {
	if (!validExtensions.includes(file.type)) {
		form.setError(fieldName, {
			message: errorMessage,
		});
		return false;
	}

	return true;
};
