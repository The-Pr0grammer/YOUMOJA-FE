import { API_URL } from "../../secrets.js";

// import { getToken } from "./token";

// export const getHeaders = async () => {
// 	const token = await getToken();
// 	// console.log("token is", token);
// 	const headers = {
// 		Accept: "application/json",
// 		"Content-Type": "application/json",
// 	};

// 	if (token) {
// 		headers.Authorization = `Bearer ${token}`;
// 	}

// 	return headers;
// };

export const post = async (destination, body) => {
	// const headers = await getHeaders();
	console.log("BODY IS", body);
	const result = await fetch(`${API_URL}${destination}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const formattedResult = await formatResult(result, body);
	// console.log(formattedResult);
	return formattedResult;
};

export const get = async (destination) => {
	// const headers = await getHeaders();

	const result = await fetch(`${API_URL}${destination}`, {
		method: "GET",
	});

	const formattedResult = await formatResult(result);
	// console.log(formattedResult);

	return formattedResult;
};

const formatResult = async (result, body) => {
	const formatted = {
		status: result.status,
		ok: result.ok,
		messChars: result._bodyInit.data.size,
		body: body,
	};

	if (result.ok) {
		formatted.data = await result.json();
	}

	return formatted;
};
