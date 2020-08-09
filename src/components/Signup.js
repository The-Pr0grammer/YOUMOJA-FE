import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { createAccount } from "../api/authentication";
import Form from "./forms/Form";
import { setToken } from "../api/token";

import { validateContent, validateLength } from "./forms/validation";

const CreateAccount = ({ navigation }) => {
	const handleResult = async (result) => {
		if (result.ok && result.data) {
			await setToken(result.data.auth_token);
			navigation.navigate("Home");
		} else if (result.status === 401) {
			throw new Error("Invalid login.");
		} else {
			throw new Error("Something went wrong.");
		}
	};
	return (
		<Form
			action={createAccount}
			afterSubmit={handleResult}
			buttonText="Submit"
			fields={{
				email: {
					label: "Email",
					validators: [validateContent],
					inputProps: {
						keyboardType: "email-address",
					},
				},
				password: {
					label: "Password",
					validators: [validateLength],
					inputProps: {
						secureTextEntry: true,
					},
				},
			}}
		/>
	);
};

export default CreateAccount;
