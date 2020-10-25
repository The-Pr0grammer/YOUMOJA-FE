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
	if (text && text.length < 6) {
		return "Must be 6 characters or more.";
	}
};

export const lengthCap = (text) => {
	if (text && text.length > 64) {
		return "Cannot exceed 64 characters";
	}
};

export const nameCheck = (name) => {
	if (/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(name)) {
		// console.log("valid name");
	}
	if (
		!/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
			name
		)
	) {
		// console.log("no emojis");
	} else {
		return "Enter a valid name";
	}
};

export const usernameCheck = (username) => {
	if (/^\w+$/.test(username)) {
		return;
	} else {
		return "Contains invalid characters";
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
		return "must be more than 6 characters, contain at least one numeric digit and a special character";
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

export const urlCheck = (url) => {
	if (
		/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
			url
		)
	) {
		return;
	} else {
		return "Enter a valid url ie twitter.com/Y0UM0JA";
	}
};

export const phoneNumberCheck = (number) => {
	if (/^\d{10}$/.test(number)) {
		return;
	} else {
		return "Enter a 10 digit telephone number";
	}
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
