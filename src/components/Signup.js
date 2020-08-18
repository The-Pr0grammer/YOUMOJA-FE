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
import { setUser } from "../redux/actions/bizAction";
import { createAccount } from "../api/authentication";
import Form from "./forms/Form";
import { setToken } from "../api/token";
import {
	validateContent,
	validateLength,
	passwordMatch,
	emailCheck,
	passwordCheck,
} from "./forms/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const CreateAccount = (props) => {
	const navigation = useNavigation();
	const [spinner, spinnerTogg] = useState("");
	const handleResult = async (result) => {
		if (result.ok && result.data) {
			await setToken(result.data.auth_token);
			console.log("result body is", result.body);
			try {
				firebase
					.auth()
					.createUserWithEmailAndPassword(
						result.body.user.email,
						result.body.user.opaque
					)
					.then(() => {
						try {
							firebase
								.auth()
								.signInWithEmailAndPassword(
									result.body.user.email,
									result.body.user.opaque
								)
								.then(() => {
									firebase.auth().onAuthStateChanged(function (user) {
										if (!user.emailVerified) {
											props.setUser({
												id: result.data.id,
												email: user.email,
												emailVerified: user.emailVerified,
												timeSent: moment().utcOffset("-04:00"),
												opaque: result.body.user.opaque,
											});
											user.sendEmailVerification();
										} else {
											props.setUser({
												id: result.data.id,
												email: result.data.email,
												emailVerified: user.emailVerified,
											});
											console.log("Verified?👀");
										}
									});
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

			setTimeout(() => navigation.navigate("Email Confirmation"), 2500);
		} else if (result.status === 422 && result.messChars === 44) {
			// console.log(result);
			throw new Error("That email is already registered");
		} else if (result.status === 422 && result.messChars === 34) {
			throw new Error("That username is taken.");
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.inner}>
				<Form
					action={createAccount}
					afterSubmit={handleResult}
					buttonText="Create Account"
					buttonSpinner={spinner}
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
							validators: [validateContent, passwordCheck],
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
				<View style={{ zIndex: 4 }}>
					<Button
						title="Change Email"
						buttonStyle={{
							backgroundColor: "transparent",
							borderRadius: 18,
						}}
						style={{ alignSelf: "flex-end" }}
						titleStyle={{ color: "gray" }}
						onPress={() => {
							props.setUser({ email: "yo", emailVerified: false });
							navigation.navigate("Email Confirmation");
						}}
					/>
				</View>
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
						style={styles.background}
						source={require("../images/blackpower.gif")}
					></ImageBackground>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default connect(mapStateToProps, { setUser })(CreateAccount);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
	},
	background: {
		flex: 1,
		height: vh(100),
		width: vw(100),
		alignItems: "center",
	},
	inner: {
		flex: 1,
		padding: vh(10),
		justifyContent: "space-around",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
