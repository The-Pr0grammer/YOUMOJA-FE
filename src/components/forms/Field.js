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
import { ThemeProvider, useFocusEffect } from "@react-navigation/native";
import { addListener } from "expo-updates";
let offset = 0;

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
	purpose,
	handleOffset,
	scrollRef,
	trackFocusAndBlur,
}) => {
	const [hideToggle, setHideToggle] = useState(
		field.inputProps.secureTextEntry
	);
	const [scroll, setScroll] = useState(true);
	// const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	const pwField = fieldName.toLowerCase().includes("password");

	// const inputRef = useRef(null);

	useEffect(() => {
		{
			firstError && keyRef.current && keyRef.current.focus();
		}

		// const keyboardDidShowListener = Keyboard.addListener(
		// 	'keyboardDidShow',
		// 	() => {
		// 	  setKeyboardVisible(true); // or some other action
		// 	}
		//   );

		// const keyboardDidHideListener =
		// 	fieldName == "summary" &&
		// 	Keyboard.addListener("keyboardDidHide", () => {
		// 		setScroll(true);
		// 		console.log("⌨️ CLOSED");
		// 	});

		// // ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️
		// // Do not remove any code pertaining to scroll or this damn keyboard addListener.
		// // Without it, scrollRef stops working ⁉️ update: newlisting needs a rerender to pass ref
		// // ❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️

		return () => {
			// keyboardDidShowListener.remove();
			// keyboardDidHideListener.remove();
			// 	fieldName == "summary" && keyboardDidHideListener.remove();
			// console.log("I'm a field:", fieldName);
		};
	}, [submitInc]);

	// 	console.log("🔑", keyRef);
	// console.log("password field:", fieldName.toLowerCase().includes("password"));
	// console.log(field.inputProps);
	// console.log("error status:", fieldName, error ? true : false);
	// console.log(nextRef);
	// console.log("field label is 😁", field.label);
	// console.log("field name is 🖋", fieldName);
	// console.log("🔑", keyRef);
	// console.log("❶:", fieldName, firstError);
	// console.log("submit Inc", submitInc);
	// console.log("scrooooooll is 📜", scroll);
	// console.log("scroooooollREF is 📜", scrollRef);

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.label}>{field.label}</Text>
			<TextInput
				ref={keyRef}
				{...field.inputProps}
				value={value && value.replace(/\s/g, "").length ? value : ""}
				multiline={fieldName == "summary" && true}
				// scrollEnabled={fieldName == "summary"}
				numberOfLines={fieldName == "summary" ? 3 : 1}
				autoFocus={firstError ? true : false}
				style={[field.label !== "Summary" ? styles.input : styles.summaryInput]}
				secureTextEntry={hideToggle}
				onChangeText={(text) => onChangeText(fieldName, text)}
				blurOnSubmit={true}
				returnKeyType={"next"}
				onSubmitEditing={() => {
					// 🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗
					if (fieldName == "summary") {
						// setScroll(true);
						setTimeout(() => {
							nextRef.current && nextRef.current.focus();
						}, 100);
					}

					// if (scroll) {
					if (!lastKey) {
						nextRef.current && nextRef.current.focus();
					}

					if (lastKey) {
						Keyboard.dismiss();
					}
					// }
					// 🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗🆗
				}}
				// onFocus={clearError}
				onFocus={() => {
					// fieldName == "summary" && setScroll(false);
					// trackFocusAndBlur("focus", fieldName);

					fieldName == "summary" &&
						scrollRef.scrollTo({ x: 0, y: vh(30), animated: true });

					fieldName == "name" &&
						purpose == "NewListing" &&
						scrollRef.scrollTo({ x: 0, y: vh(30), animated: true });

					clearError;
				}}
				onBlur={() => {
					// fieldName == "summary" && setScroll(true);
					fieldName == "summary" &&
						!value == "" &&
						trackFocusAndBlur("blur", fieldName);
					fieldName == "name" &&
						!value == "" &&
						trackFocusAndBlur("blur", fieldName);
				}}
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
			<Text style={fieldName == "summary" ? styles.summError : styles.error}>
				{error}
			</Text>
		</View>
	);
};

export default Field;

const styles = StyleSheet.create({
	input: {
		// flex: 1,
		height: vh(6.5),
		width: vw(90),
		borderRadius: 30,
		paddingHorizontal: vw(3),
		backgroundColor: "transparent",
		lineHeight: vh(2.5),
		borderBottomWidth: 3.5,
		color: "olivedrab",
		textAlign: "center",
		paddingBottom: vh(0),
	},
	summaryInput: {
		height: vh(6.5),
		width: vw(90),
		paddingHorizontal: vw(3),

		borderRadius: 30,
		borderBottomWidth: 3.5,

		paddingTop: vw(3.5),
		backgroundColor: "transparent",
		color: "olivedrab",
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
		minHeight: 25,
	},
	error: { textAlign: "center", color: "red", width: vw(85) },
	summError: {
		textAlign: "center",
		color: "red",
		width: vw(85),
		height: vh(2),
		// backgroundColor: "green",
	},
});
