import { post } from "./fetch";

export const login = (email, opaque) => {
	return post("/users/login", {
		user: { email, opaque },
	});
};

export const createAccount = (email, name, opaque, opaque_two, username) => {
	return post("/users", {
		user: { email, name, opaque, opaque_two, username },
	});
};
