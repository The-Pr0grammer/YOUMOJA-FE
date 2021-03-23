import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Keyboard } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useFocusEffect } from "@react-navigation/native";

const Field = ({
	fieldName,
	field,
	value,
	onChangeText,
	error,
	clearError,
}) => {
	// console.log(fieldName);
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{field.label}</Text>
			<TextInput
				multiline={fieldName == "summary" && true}
				style={[field.label !== "Summary" ? styles.input : styles.summaryInput]}
				{...field.inputProps}
				value={value}
				onChangeText={(text) => onChangeText(fieldName, text)}
				blurOnSubmit={false}
				onSubmitEditing={() => {
					field.label !== "Summary" && Keyboard.dismiss();
					// console.log("field name is 😁", field.label);
				}}
				onFocus={clearError}
			/>

			<Text style={styles.error}>{error}</Text>
		</View>
	);
};

export default Field;

const styles = StyleSheet.create({
	input: {
		height: vh(6.5),
		width: vw(87),
		borderRadius: 30,
		paddingHorizontal: vw(3),
		backgroundColor: "transparent",
		lineHeight: vh(2.5),
		borderBottomWidth: 3.5,
		color: "olivedrab",
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
