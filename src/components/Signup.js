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
import { createAccount } from "../api/authentication";
import Form from "./forms/Form";
import { setToken } from "../api/token";
import {
	validateContent,
	validateLength,
	passwordMatch,
	emailCheck,
} from "./forms/validation";
import * as firebase from "firebase";

const CreateAccount = ({ navigation }) => {
	const handleResult = async (result) => {
		if (result.ok && result.data) {
			await setToken(result.data.auth_token);

			try {
				firebase
					.auth()
					.createUserWithEmailAndPassword(
						result.body.user.email,
						result.body.user.password
					)
					.then((user) => {
						try {
							firebase
								.auth()
								.signInWithEmailAndPassword(
									result.body.user.email,
									result.body.user.password
								)
								.then((user) => {
									console.log(user);
								})
								.catch((error) => {
									console.log(error.message);
								});
						} catch (error) {
							console.log(error.message);
						}
					})
					.catch((error) => {
						console.log(error.message);
					});
			} catch (error) {
				console.log(error.message);
			}

			navigation.navigate("Home");
		} else if (result.status === 422 && result.messChars === 44) {
			// console.log(result);
			throw new Error("That email is already registered");
		} else if (result.status === 422 && result.messChars === 34) {
			throw new Error("That username is taken.");
		}
	};

	return (
		<KeyboardAvoidingView behavior="height" style={styles.container}>
			<View style={styles.inner}>
				<Form
					action={createAccount}
					afterSubmit={handleResult}
					buttonText="Create Account"
					type="Signup"
					fields={{
						email: {
							label: "Email",
							validators: [validateContent, emailCheck],
							inputProps: {
								keyboardType: "email-address",
								autoCapitalize: "none",
								keyboardType: "email-address",
								placeholder: "enter your email address",
								placeholderTextColor: "#D50000",
								textAlign: "center",
							},
						},
						username: {
							label: "Username",
							validators: [validateContent],
							inputProps: {
								placeholder: "choose a username",
								placeholderTextColor: "#D50000",
								textAlign: "center",
							},
						},
						password: {
							label: "Password",
							validators: [validateContent],
							inputProps: {
								textContentType: "newPassword",
								secureTextEntry: true,
								placeholder: "choose a password",
								placeholderTextColor: "#D50000",
								textAlign: "center",
							},
						},
						passwordConf: {
							label: "Confirm Password",
							validators: [validateContent, passwordMatch],
							inputProps: {
								textContentType: "newPassword",
								secureTextEntry: true,
								placeholder: "confirm your password",
								placeholderTextColor: "#D50000",
								textAlign: "center",
							},
						},
					}}
				/>
				<View
					style={{
						position: "absolute",
						flex: 1,
						height: vh(100),
						width: vw(100),
					}}
				>
					<ImageBackground
						style={styles.background}
						source={require("../images/blackpower.gif")}
					></ImageBackground>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default CreateAccount;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
	},
	background: {
		flex: 1,
		height: vh(100),
		width: vw(100),
		alignItems: "center",
	},
	inner: {
		flex: 1,
		padding: vh(5),
		justifyContent: "space-around",
		backgroundColor: "gold",
		alignItems: "center",
	},
});
