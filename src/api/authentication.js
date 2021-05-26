import { post } from "./fetch";

export const login = (email, opaque) => {
	return post("/users/login", {
		user: { email, opaque },
	});
};

export const createAccount = (
	email,
	linkedin,
	name,
	opaque,
	opaque_two,
	twitter,
	username
) => {
	return post("/users", {
		user: {
			email,
			linkedin,
			name,
			opaque,
			opaque_two,
			twitter,
			username,
		},
	});
};
