import React, { useState } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Keyboard,
	ScrollView,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import {
	hasValidationError,
	usernameCheck,
	validateFields,
} from "./validation";
import Field from "./Field";
import { sub } from "react-native-reanimated";

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
	handleCancel,
	type,
	buttonSpinner,
	handleChange,
	userInfo,
}) => {
	useFocusEffect(
		React.useCallback(() => {
			setValues("");
			setValidationErrors("");
			setErrorMessage("");

			// type == "ProfileEdit" && setValues(userInfo);
		}, [])
	);

	const fieldKeys = Object.keys(fields);
	const [values, setValues] = useState(getInitialState(fieldKeys));
	const [errorMessage, setErrorMessage] = useState("");
	const [allowEmails, setAllowEmails] = useState(userInfo.allow_emails);
	const [validationErrors, setValidationErrors] = useState(
		getInitialState(fieldKeys)
	);
	const onChangeValue = (key, value) => {
		handleChange && handleChange(key, value);
		const newState = { ...values, [key]: value };
		type == "ProfileEdit"
			? setValues(removeEmptyStrings(newState))
			: setValues(newState);

		if (validationErrors[key]) {
			const newErrors = { ...validationErrors, [key]: "" };
			setValidationErrors(newErrors);
		}
	};

	const getValues = () => {
		return fieldKeys.sort().map((key) => values[key]);
	};

	const removeEmptyStrings = (obj) => {
		let newObj = {};
		Object.keys(obj).forEach((prop) => {
			if (obj[prop] !== "") {
				newObj[prop] = obj[prop];
			}
		});
		newObj.allow_emails == userInfo.allow_emails && delete newObj.allow_emails;
		return newObj;
	};

	const trimValues = (obj) => {
		let newObj = {};
		Object.keys(obj).forEach((prop) => {
			console.log(prop);
			newObj[prop] = prop == "allow_emails" ? obj[prop] : obj[prop].trim();
		});
		return newObj;
	};

	const submit = async () => {
		Keyboard.dismiss();
		setErrorMessage("");
		setValidationErrors(getInitialState(fieldKeys));

		let newFields = { ...fields };
		if (type == "ProfileEdit") {
			for (var key in newFields) {
				if (!Object.keys(values).includes(key)) {
					delete newFields[key];
				}
			}
		}

		let errors = [];
		type == "ProfileEdit"
			? (errors = validateFields(newFields, trimValues(values)))
			: (errors = validateFields(fields, values));

		if (hasValidationError(errors)) {
			console.log(errors);

			// console.log(fields);
			return setValidationErrors(errors); //VALIDATIONSSSSSSS
		}

		try {
			type == "ProfileEdit"
				? (result = await action(trimValues(values)))
				: (result = await action(...getValues()));

			if (type == "ProfileEdit" && result.status !== "200") {
				// console.log("result is", result);
				// console.log("result is", result);

				var parsedData = JSON.parse(result);

				let newObj = {};

				for (let [k, v] of Object.entries(parsedData)) {
					k == "username"
						? (newObj[k] = `that ${k} ${v[0]}`)
						: (newObj[k] = `that ${k} is associated with another account`);
				}

				// console.log("newObj is ", newObj);

				{
					!Object.keys(newObj).includes("email") &&
						!Object.keys(newObj).includes("username") &&
						setErrorMessage("Something went wrong. Please try again later");
				}

				setValidationErrors(newObj);
				return;
			}

			afterSubmit(result);
		} catch (e) {
			console.log("caught error IN THE FORM ‼️", e);
			setErrorMessage("Something went wrong. Please try again later");
		}
	};

	console.log("VALUES:", values);
	// console.log(removeEmptyStrings(userInfo));
	// console.log("eM:", errorMessage);

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
								titleStyle={{ color: "lightslategray" }}
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
							titleStyle={{ color: "lightslategray" }}
							onPress={submit}
							loading={buttonSpinner}
							loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				</View>
			)}

			{type == "NewListing" && (
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
							titleStyle={{ color: "lightslategray" }}
							onPress={submit}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				</View>
			)}

			{type == "ProfileEdit" && (
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
						}}
					>
						<CheckBox
							title="Allow other users to email you?"
							checked={allowEmails}
							containerStyle={{
								width: vw(70),
								backgroundColor: "transparent",
								borderWidth: 0,
							}}
							checkedColor="olivedrab"
							activeOpacity={1}
							onPress={() => {
								setAllowEmails(!allowEmails);
								onChangeValue("allow_emails", !allowEmails);
							}}
						/>
						<Button
							title={"Save Changes"}
							activeOpacity={Object.keys(values).length > 0 ? 0.1 : 1}
							buttonStyle={{
								backgroundColor: "transparent",
							}}
							titleStyle={
								Object.keys(values).length > 0
									? { color: "lightslategray" }
									: { color: "rgb(64,64,64)" }
							}
							onPress={() => {
								Object.keys(values).length > 0 && submit();
							}}
						/>

						<Button
							title={"Cancel"}
							buttonStyle={{
								backgroundColor: "transparent",
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={handleCancel}
						/>
						<Text
							style={{
								// width: vw(85),
								position: "relative",
								color: "red",
								textAlign: "center",
								zIndex: -1,
							}}
						>
							{errorMessage}
						</Text>
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
