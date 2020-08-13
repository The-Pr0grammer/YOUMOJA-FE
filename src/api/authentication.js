import { post } from "./fetch";
import * as firebase from "firebase";

export const login = (email, password) => {
	
	return post("/users/login", {
		user: { email, password },
	});
};

export const createAccount = (
	email,
	password,
	password_confirmation,
	username
) => {
	return post("/users", {
		user: { email, password, password_confirmation, username },
	});
};
