import React, { useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Button,
	ImageBackground,
	KeyboardAvoidingView,
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/bizAction";
import Form from "./forms/Form";
import { validateContent, emailCheck } from "./forms/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = (props) => {
	let test = "";
	const navigation = useNavigation();
	const [spinner, spinnerTogg] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const handleReset = async (email) => {
		test = "";
		setErrorMessage("");
		spinnerTogg(true);
		try {
			await firebase
				.auth()
				.sendPasswordResetEmail(email)
				.catch((error) => {
					test = error.message;
					setErrorMessage(error.message);
					return error.message;
				});
		} catch (error) {
			setErrorMessage(error.message);
			return error.message;
		}
	};
	const handleResult = async (result) => {
		// console.log("Test is", test);
		// console.log("Error Message is", errorMessage);
		if (test.length < 1 && errorMessage.length < 1) {
			setTimeout(() => {
				spinnerTogg(false);
				navigation.navigate("Login");
			}, 5000);
			throw new Error("Sent! Check your email.");
		} else if (test.includes("deleted") || errorMessage.includes("deleted")) {
			spinnerTogg(false);
			throw new Error("No profiles match that email.");
		} else {
			spinnerTogg(false);
			throw new Error("Something went wrong. Try again.");
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.inner}>
				<Form
					action={handleReset}
					afterSubmit={handleResult}
					buttonText="Confirm"
					buttonSpinner={spinner}
					type="Login"
					fields={{
						password: {
							label: "Email",
							validators: [validateContent, emailCheck],
							inputProps: {
								placeholder: "Enter your email address",
								placeholderTextColor: "#D50000",
								textAlign: "center",
							},
						},
					}}
				/>{" "}
				<View
					style={{
						position: "absolute",
						flex: 1,
						height: vh(100),
						width: vw(100),
						opacity: 0.1,
					}}
				>
					<ImageBackground
						resizeMode="stretch"
						style={styles.background}
						source={require("../images/BlackDollarsMatter.jpeg")}
					></ImageBackground>{" "}
				</View>{" "}
			</View>{" "}
		</KeyboardAvoidingView>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
})(ResetPassword);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
	},
	inner: {
		flex: 1,
		padding: vh(10),
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: vh(8),
	},
	background: {
		flex: 1,
		height: vh(100),
		width: vw(100),
		alignItems: "center",
		resizeMode: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
