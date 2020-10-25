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

const Form = ({
	fields,
	buttonText,
	action,
	afterSubmit,
	type,
	buttonSpinner,
	handleChange,
}) => {
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
		handleChange && handleChange(key, value);
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
		const result = await action(...getValues());
		await afterSubmit(result);
		// TEST SHIT

		Keyboard.dismiss();
		setErrorMessage("");
		setValidationErrors(getInitialState(fieldKeys));

		const errors = validateFields(fields, values);
		if (hasValidationError(errors)) {
			console.log(errors);
			return setValidationErrors(errors); //VALIDATIONSSSSSSS
		}
		try {
			const result = await action(...getValues());
			// console.log("RESULT IS", result);
			await afterSubmit(result);
		} catch (e) {
			setErrorMessage(e.message);
		}
	};

	// const submit = async () => {
	// 	Keyboard.dismiss();
	// 	setErrorMessage("");
	// 	setValidationErrors(getInitialState(fieldKeys));

	// 	const errors = validateFields(fields, values);
	// 	if (hasValidationError(errors)) {
	// 		console.log(errors);
	// 		return setValidationErrors(errors); //VALIDATIONSSSSSSS
	// 	}
	// 	try {
	// 		const result = await action(...getValues());
	// 		// console.log("RESULT IS", result);
	// 		await afterSubmit(result);
	// 	} catch (e) {
	// 		setErrorMessage(e.message);
	// 	}
	// }; WORKING TRIGGERRRRRR 🔫

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
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={{
							alignItems: "center",
							// paddingVertical: vh(2.5),
						}}
						style={{
							flex: 1,
							zIndex: 1,
							// backgroundColor: "blue",
							// backgroundColor: "rgba(0, 0, 0, 0.8)",
							width: vw(95),
							height: vh(70),
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
									onChangeText={onChangeValue}
									value={values[key]}
									// handleChange={props.handleChange}
								/>
							);
						})}
						<View style={{ top: vh(1) }}>
							<Button
								title={buttonText}
								buttonStyle={{
									backgroundColor: "transparent",
									borderRadius: 18,
								}}
								style={styles.createButton}
								titleStyle={{ color: "gray" }}
								onPress={submit}
								loading={buttonSpinner}
								loadingProps={{ color: "green", size: "large" }}
							/>
						</View>
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
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
							/>
						);
					})}

					{type == "Login" && (
						<Text style={styles.loginError}>{errorMessage}</Text>
					)}
					<View style={{ bottom: vh(1) }}>
						<Button
							title={buttonText}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={[
								type == "Login" ? styles.loginButton : styles.createButton,
							]}
							titleStyle={{ color: "gray" }}
							onPress={submit}
							loading={buttonSpinner}
							loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				</View>
			)}

			{type == "NewBusiness" && (
				<View
					style={{
						flex: 1,
						position: "relative",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1,
						// top: vh(36.75),
					}}
				>
					{fieldKeys.map((key) => {
						return (
							<Field
								key={key}
								fieldName={key}
								field={fields[key]}
								error={validationErrors[key]}
								clearError={() => setErrorMessage("")}
								onChangeText={onChangeValue}
								value={values[key]}
							/>
						);
					})}

					<View
						style={{
							flex: 1,
							// marginTop: vh(4),
							// backgroundColor: "green",
							// height: vh(10),
						}}
					>
						<Button
							title={"Post Business"}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							// style={[styles.createButton]}
							titleStyle={{ color: "gray" }}
							onPress={submit}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
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
	},
	loginButton: {
		position: "relative",
		borderRadius: 20,
		width: vw(35),
		height: vh(7),
		marginBottom: vh(2.2),
	},
	loginError: {
		// flex: 1,
		marginBottom: vh(1),
		height: vh(3),
		// backgroundColor: "red",
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
	signupError: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
	},
});
