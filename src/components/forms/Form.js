import React, { useState } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Keyboard,
	ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { hasValidationError, validateFields } from "./validation";
import Field from "./Field";

const getInitialState = (fieldKeys) => {
	const state = {};
	fieldKeys.forEach((key) => {
		state[key] = "";
	});

	return state;
};

const Form = ({ fields, buttonText, action, afterSubmit, type }) => {
	useFocusEffect(
		React.useCallback(() => {
			setValues("");
			setValidationErrors("");
			setErrorMessage("");
		}, [])
	);

	const fieldKeys = Object.keys(fields);
	const [values, setValues] = useState(getInitialState(fieldKeys));
	const [errorMessage, setErrorMessage] = useState("");
	const [validationErrors, setValidationErrors] = useState(
		getInitialState(fieldKeys)
	);
	const onChangeValue = (key, value) => {
		const newState = { ...values, [key]: value };
		setValues(newState);

		if (validationErrors[key]) {
			const newErrors = { ...validationErrors, [key]: "" };
			setValidationErrors(newErrors);
		}
	};
	const getValues = () => {
		return fieldKeys.sort().map((key) => values[key]);
	};
	const submit = async () => {
		setErrorMessage("");
		setValidationErrors(getInitialState(fieldKeys));

		const errors = validateFields(fields, values);
		if (hasValidationError(errors)) {
			// console.log(errors);
			return setValidationErrors(errors);
		}
		try {
			const result = await action(...getValues());
			// console.log("RESULT IS", result);
			await afterSubmit(result);
		} catch (e) {
			// console.log(e.message);
			setErrorMessage(e.message);
		}
	};

	return (
		<View style={styles.container}>
			{type == "Signup" && (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
					}}
				>
					{/* {errorMessage !== "" && (
						<Text style={styles.signupError}>{errorMessage}</Text>
					)} */}

					<Text style={styles.signupError}>{errorMessage}</Text>

					<ScrollView
						enableAutoAutomaticScroll={false}
						contentContainerStyle={{
							alignItems: "center",
							paddingVertical: vh(2.5),
						}}
						style={{
							flex: 1,
							zIndex: 1,
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							width: vw(85),
							height: vw(70),
							marginTop: vh(0.1),
						}}
					>
						{fieldKeys.map((key) => {
							return (
								<Field
									key={key}
									fieldName={key}
									field={fields[key]}
									error={validationErrors[key]}
									dupError={errorMessage}
									onChangeText={onChangeValue}
									value={values[key]}
								/>
							);
						})}
						<Button
							title={buttonText}
							buttonStyle={{
								backgroundColor: "black",
								borderRadius: 18,
							}}
							style={styles.createButton}
							titleStyle={{ color: "red" }}
							onPress={submit}
						/>
					</ScrollView>
				</View>
			)}

			{type == "Login" && (
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
					}}
				>
					{fieldKeys.map((key) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								dupError={errorMessage}
								onChangeText={onChangeValue}
								value={values[key]}
							/>
						);
					})}

					{type == "Login" && (
						<Text style={styles.loginError}>{errorMessage}</Text>
					)}

					<Button
						title={buttonText}
						buttonStyle={{
							backgroundColor: "black",
							borderRadius: 18,
						}}
						style={[type == "Login" ? styles.loginButton : styles.createButton]}
						titleStyle={{ color: "red" }}
						onPress={submit}
					/>
				</View>
			)}
		</View>
	);
};

export default Form;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
	createButton: {
		color: "black",
		position: "relative",
		borderRadius: 20,
		width: vw(38),
		height: vh(7),
		marginTop: vh(17.5),
	},
	loginButton: {
		color: "black",
		position: "relative",
		borderRadius: 20,
		width: vw(35),
		height: vh(6),
		marginBottom: vh(2.2),
	},
	loginError: {
		marginBottom: vh(1),
		height: vh(3),
		width: vw(85),
		position: "relative",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
	signupError: {
		// marginTop: vh(6),
		// marginBottom: vh(1),
		height: vh(3),
		width: vw(85),
		position: "relative",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
});
