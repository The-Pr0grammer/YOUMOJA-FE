export const validateContent = (text, values, key) => {
	if (!text && key == "passwordConf") {
		return `Reenter your password`;
	}
	if (!text && key == "email") {
		return `Enter an email`;
	}
	if (!text) {
		return `Enter a ${key}`;
	}
};

export const validateLength = (text) => {
	if (text && text.length < 4) {
		return "Must be 4 characters or more.";
	}
};

export const passwordMatch = (conf, values) => {
	if (conf === values.password) {
		return;
	} else {
		return "Passwords do not match";
	}
};

export const emailCheck = (email) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email)) {
		return;
	} else {
		return "Enter a valid email";
	}
};

export const passwordCheck = (password) => {
	if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password)) {
		return;
	} else {
		return "must be between 7 to 16 characters, contain at least one numeric digit and a special character"
	}
};

export const validateField = (validators, value, values, key) => {
	let error = "";
	validators.forEach((validator) => {
		const validationError = validator(value, values, key);
		if (validationError) {
			error = validationError;
		}
	});
	return error;
};

export const validateFields = (fields, values) => {
	// console.log("Values are:", values);
	// console.log("Fields are:", fields);
	// console.log("FieldKeys are:", fieldKeys);
	const errors = {};
	const fieldKeys = Object.keys(fields);

	fieldKeys.forEach((key) => {
		const field = fields[key];
		const validators = field.validators;
		const value = values[key];

		if (validators && validators.length > 0) {
			const error = validateField(validators, value, values, key);

			if (error) {
				errors[key] = error;
			}
		}
	});
	// console.log("ERRORS OBJECT:", errors);

	return errors;
};

export const hasValidationError = (errors) => {
	return Object.values(errors).find((error) => error.length > 0);
};
