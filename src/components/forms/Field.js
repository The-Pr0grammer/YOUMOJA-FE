import React, { useState, useEffect, createRef } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useFocusEffect } from "@react-navigation/native";

const Field = ({
	fieldName,
	field,
	value,
	onChangeText,
	error,
	clearError,
	keyRef,
	nextRef,
	lastKey,
	firstError,
	submitInc,
}) => {
	const [hideToggle, setHideToggle] = useState(
		field.inputProps.secureTextEntry
	);

	const pwField = fieldName.toLowerCase().includes("password");

	// useEffect(() => {
	// 	let keyRef = fieldName;
	// 	keyRef = createRef();

	// 	console.log("🔑", keyRef);
	// 	return () => {
	// 		console.log("I'm a field:", fieldName);
	// 	};
	// }, []);

	useEffect(() => {
		{
			firstError && keyRef.current && keyRef.current.focus();
		}

		return () => {
			// console.log("I'm a field:", fieldName);
		};
	}, [submitInc]);

	// const inputRef = useRef(null);

	// console.log("password field:", fieldName.toLowerCase().includes("password"));
	// console.log(field.inputProps);
	// console.log("error status:", fieldName, error ? true : false);

	// const reference = fieldName.toLowerCase();

	// console.log(nextRef);
	// console.log("field label is 😁", field.label);
	// console.log("field name is 🖋", fieldName);
	// console.log("🔑", keyRef);
	// console.log("❶:", fieldName, firstError);
	// console.log("submit Inc", submitInc);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{field.label}</Text>
			<TextInput
				ref={keyRef}
				multiline={fieldName == "summary" && true}
				autoFocus={firstError ? true : false}
				style={[field.label !== "Summary" ? styles.input : styles.summaryInput]}
				{...field.inputProps}
				secureTextEntry={hideToggle}
				value={value}
				onChangeText={(text) => onChangeText(fieldName, text)}
				blurOnSubmit={false}
				returnKeyType={"next"}
				onSubmitEditing={() => {
					// field.label !== "Summary" && Keyboard.dismiss();

					if (field.label !== "Summary" && !lastKey) {
						nextRef.current && nextRef.current.focus();
					}

					if (lastKey) {
						Keyboard.dismiss();
					}
				}}
				onFocus={clearError}
			/>
			{pwField && (
				<TouchableOpacity
					onPress={() => {
						setHideToggle(!hideToggle);
					}}
				>
					<Icon
						name={hideToggle ? "eye" : "eye-with-line"}
						type="entypo"
						color="rgb(59,89,152)"
						size={24}
					/>
				</TouchableOpacity>
			)}
			<Text style={styles.error}>{error}</Text>
			{/* {error ? inputRef.current.focus() : false} */}
			{/* {console.log(reference)} */}
		</View>
	);
};

export default Field;

const styles = StyleSheet.create({
	input: {
		height: vh(6.5),
		width: vw(90),
		borderRadius: 30,
		paddingHorizontal: vw(3),
		backgroundColor: "transparent",
		// backgroundColor: "green",
		lineHeight: vh(2.5),
		borderBottomWidth: 3.5,
		color: "olivedrab",
		textAlign: "center",
	},
	summaryInput: {
		height: vh(6.5),
		width: vw(90),
		borderRadius: 30,
		paddingHorizontal: vw(5),
		paddingTop: vw(3.5),
		backgroundColor: "maroon",
		lineHeight: vh(2.5),
	},
	inputContainer: {
		// flex: 1,
		paddingTop: vh(0.5),
		alignItems: "center",
		width: vw(90),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	label: {
		paddingLeft: vw(1.1),
		color: "darkslategray",
		alignSelf: "flex-start",
	},
	error: { textAlign: "center", color: "red", width: vw(85) },
});
