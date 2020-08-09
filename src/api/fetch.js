import { API_URL } from "../../secrets.js";
import { getToken } from "./token";

const getHeaders = async () => {
	const token = await getToken();
	console.log("token is", token);
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return headers;
};

export const post = async (destination, body) => {
	const headers = await getHeaders();

	const result = await fetch(`${API_URL}${destination}`, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const formattedResult = await formatResult(result);
	// console.log(formattedResult);
	return formattedResult;
};

export const get = async (destination) => {
	const headers = await getHeaders();

	const result = await fetch(`${API_URL}${destination}`, {
		method: "GET",
		headers,
	});

	const formattedResult = await formatResult(result);
	console.log(formattedResult);

	return formattedResult;
};

const formatResult = async (result) => {
	const formatted = {
		status: result.status,
		ok: result.ok,
	};

	if (result.ok) {
		formatted.data = await result.json();
	}

	return formatted;
};
