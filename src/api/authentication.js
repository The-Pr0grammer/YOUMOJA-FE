import { post } from "./fetch";

export const login = (email, opaque) => {
	return post("/users/login", {
		user: { email, opaque },
	});
};

export const createAccount = (email, opaque, opaque_two, username) => {
	return post("/users", {
		user: { email, opaque, opaque_two, username },
	});
};
