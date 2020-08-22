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
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{field.label}</Text>
			<TextInput
				style={styles.input}
				{...field.inputProps}
				value={value}
				onChangeText={(text) => onChangeText(fieldName, text)}
				blurOnSubmit={false}
				onSubmitEditing={() => Keyboard.dismiss()}
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
		width: vh(45.5),
		borderRadius: 30,
		paddingHorizontal: vw(5),
		backgroundColor: "maroon",
	},
	inputContainer: {
		paddingTop: vh(0.7),
		alignItems: "center",
		width: vh(47.5),
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
		color: "red",
		alignSelf: "flex-start",
	},
	error: { textAlign: "center", color: "red", width: vw(80) },
});
