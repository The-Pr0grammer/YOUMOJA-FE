export const validateContent = (text, values, key) => {
	if (!text && key == "passwordConf") {
		return `Reenter your password`;
	}
	if (!text && key == "email") {
		return `Enter an email`;
	}
	if (!text && key == "currentPassword") {
		return `For security purposes you must enter your current password`;
	}
	if (!text) {
		return `Enter a ${key}`;
	}
};

export const validateLength = (text) => {
	if (text && text.length < 6) {
		return "Must be 6 characters or more";
	}
};

export const nameCheck = (name) => {
	if (
		!/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
			name
		)
	) {
		// console.log("no emojis");
		if (/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(name)) {
			// console.log("valid name");
			if (/^ *$/.test(name)) {
				console.log("not blank");
				return "Can't be blank";
			}
			return;
		} else {
			return "Contains invalid characters";
		}
	} else {
		return "Enter a valid name";
	}
};

export const emojiCheck = (name) => {
	if (
		!/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
			name
		)
	) {
		// console.log("no emojis✅ 🔥");

		return;
	} else {
		return "Contains invalid characters";
	}
};

export const usernameCheck = (username) => {
	if (
		!/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
			username
		)
	) {
		if (/\s/.test(username)) {
			return "No spaces allowed";
		}
		if (!/^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/.test(username)) {
			return "Contains invalid characters";
		}
		if (/^ *$/.test(username)) {
			return "Can't be blank";
		}
		return;
	} else {
		return "Contains invalid characters";
	}
};

export const lengthCap = (text, values, key) => {
	if (text && text.length > 24) {
		return "Cannot exceed 24 characters";
	}
};

export const passwordMatch = (conf, values) => {
	if (conf === values.password) {
		return;
	} else {
		return "Try again. Your passwords do not match";
	}
};

export const emailCheck = (email, purpose) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email)) {
		return true;
	} else {
		// return "Enter a valid email";
		return purpose == "contact" ? "Enter a valid phone number or email address" : "Enter a valid email";
	}
};

export const passwordCheck = (password) => {
	if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password)) {
		console.log("valid");
		return;
	} else {
		return "must be more than 6 characters, contain at least one numeric digit and a special character";
	}
};

export const urlCheck = (url, values, key) => {
	if (
		/((ftp|http|https):\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
			url
		)
	) {
		if (url) {
			if (key == "website") {
				return;
			} else {
				urlLower = url.toLowerCase();
				if (urlLower.includes(`${key}.com`)) {
					return;
				} else {
					return `Enter a valid ${key} url ie ${key}.com/username`;
				}
			}
		}
	} else {
		key == "website"
			? `Enter a valid ${key} url ie youmoja.com`
			: `Enter a valid ${key} url ie ${key}.com/username`;
	}
};

export const phoneNumberCheck = (number) => {
	if (/^\d{10}$/.test(number)) {
		return;
	} else {
		return "Enter a 10 digit telephone number";
	}
};

export const contactCheck = (contact) => {
	if (/^ *[0-9][0-9 ]*$/.test(contact)) {
		return phoneNumberCheck(contact);
	} else {
		return emailCheck(contact, "contact");
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
