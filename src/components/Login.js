import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Keyboard,
} from "react-native";
import {
	Input,
	ThemeProvider,
	Button,
	Icon,
	Text,
	Image,
} from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
// import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/bizAction";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { login } from "../api/authentication.js";
// import { setToken } from "../api/token";
import Form from "./forms/Form";
import {
	validateContent,
	validateLength,
	emailCheck,
} from "./forms/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const Login = (props) => {
	const navigation = useNavigation();
	const [spinner, spinnerTogg] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	useFocusEffect(
		React.useCallback(() => {
			// logOut();
			props.setUserInfo(false);
			// firebase
			// 	.auth()
			// 	.signOut()
			// 	.then(function () {
			// 		console.log("Sign-out successful.");
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});
			Keyboard.dismiss();
		}, [])
	);

	// const logOut = async () => {
	// 	await setToken("");
	// };

	const handleResult = async (result) => {
		// console.log(result);
		let test = false;
		spinnerTogg(true);
		console.log("🎱🎱🎱", result);
		if (result.ok && result.data) {
			// await setToken(result.data.auth_token);
			try {
				await firebase
					.auth()
					.signInWithEmailAndPassword(
						result.data.email,
						result.body.user.opaque
					)
					.then(() => {
						firebase.auth().onAuthStateChanged(function (user) {
							if (!user.emailVerified) {
								setErrorMessage(""),
									props.setUserInfo({
										id: result.data.id,
										email: result.data.email,
										emailVerified: false,
										opaque: result.body.user.opaque,
									});

								setTimeout(() => {
									spinnerTogg(false);
									navigation.navigate("Email Confirmation", {
										purpose: "Signup",
									}),
										5000;
								});
								console.log("Not Verified🚫", user.email);
							} else {
								setErrorMessage(""),
									props.setUserInfo({
										id: result.data.id,
										email: result.data.email,
										emailVerified: user.emailVerified,
									});

								setTimeout(() => {
									spinnerTogg(false);
									navigation.navigate("Welcome Splash"), 5000;
								});
								console.log("Verified😎", user.email);
							}
						});
					})
					.catch((error) => {
						test = true;
						// console.log("E.message is", error.message);
						setErrorMessage(error.message);
					});
			} catch (error) {
				test = true;
				setErrorMessage(error.message);
			}

			if (errorMessage !== "") {
				if (errorMessage.includes("password")) {
					spinnerTogg(false);
					throw new Error("Invalid login");
				} else if (errorMessage.includes("later")) {
					spinnerTogg(false);
					throw new Error("Too many failed attempts. Try again later");
				} else if (errorMessage.includes("deleted")) {
					spinnerTogg(false);
					throw new Error("No profile matches that username/email");
				} else {
					spinnerTogg(false);
					throw new Error("Something went wrong. Try again");
				}
			} else if (test) {
				spinnerTogg(false);
				throw new Error("Invalid login");
			}
		} else if (result.status === 401) {
			spinnerTogg(false);
			throw new Error("No profile matches that username/email");
		} else if (errorMessage.length > 1) {
			spinnerTogg(false);
			throw new Error("Something went wrong. Try again");
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.inner}>
				<View
					style={{
						flex: 1,
						height: vh(60),
						justifyContent: "center",
						alignItems: "center",
						opacity: 1,
						zIndex: 3,
					}}
				>
					<View
						style={{
							marginTop: vh(10),
							height: vh(9.5),
							width: vw(85),
							justifyContent: "center",
							alignItems: "center",
							opacity: 1,
							zIndex: 1,
							// backgroundColor: "black",
							borderRadius: 6,
						}}
					>
						<Image
							style={{
								height: vh(20),
								width: vw(75),
								resizeMode: "contain",
							}}
							source={require("../images/name.png")}
						></Image>
					</View>
					<Image
						style={{
							height: vh(7.5),
							width: vw(15),
							zIndex: 1,
							resizeMode: "stretch",
							marginVertical: vh(1),
						}}
						source={require("../images/LOGO.png")}
					></Image>

					<View
						style={{
							// flex: 1,
							height: vh(24),
							justifyContent: "center",
							alignItems: "center",
							zIndex: 1,
							// backgroundColor: "rgba(0, 0, 0, 0.8)",
							paddingTop: vh(12.3),
							marginVertical: vh(10.5),
						}}
					>
						<Form
							action={login}
							afterSubmit={handleResult}
							buttonText="Login"
							buttonSpinner={spinner}
							type="Login"
							fields={{
								email: {
									label: "Username or Email",
									validators: [validateContent],
									inputProps: {
										keyboardType: "email-address",
										autoCapitalize: "none",
										textContentType: "username",
										placeholder: "Enter a username or email",
										placeholderTextColor: "#D50000",
										textAlign: "center",
									},
								},
								password: {
									label: "Password",
									validators: [validateContent],
									inputProps: {
										secureTextEntry: true,
										textContentType: "password",
										placeholder: "password",
										placeholderTextColor: "#D50000",
										textAlign: "center",
									},
								},
							}}
						/>
					</View>

					<View
						style={{
							top: vh(0.5),
							width: vw(77),
							height: vh(0.45),
							backgroundColor: "black",
						}}
					></View>
					<TouchableWithoutFeedback
						style={{
							marginTop: vh(1),
							width: vw(92.5),
							height: vh(4),
							alignItems: "center",
							justifyContent: "center",
							zIndex: 2,
						}}
						onPress={() => navigation.navigate("Signup")}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 20,
								color: "red",
								// backgroundColor: "rgba(0, 0, 0, 0.8)",
							}}
						>
							Don't have an account? Sign up 🔑
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback
						style={{
							marginTop: vh(1),
							width: vw(92.5),
							height: vh(4),
							alignItems: "center",
							justifyContent: "center",
							zIndex: 2,
						}}
						onPress={() => navigation.navigate("Password Reset")}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 20,
								color: "red",
								// backgroundColor: "rgba(0, 0, 0, 0.8)",
							}}
						>
							Forgot password? 💭
						</Text>
					</TouchableWithoutFeedback>
				</View>
				<View
					style={{
						position: "absolute",
						flex: 1,
						height: vh(100),
						width: vw(100),
						opacity: 0.1,
						zIndex: 2,
					}}
				>
					<ImageBackground
						style={styles.background}
						source={require("../images/tulsa.jpeg")}
					></ImageBackground>
					<ImageBackground
						style={styles.background}
						source={require("../images/TulsaRiot.jpg")}
					></ImageBackground>
					<ImageBackground
						style={styles.background}
						source={require("../images/tulsaAftermath.jpeg")}
					></ImageBackground>
					<ImageBackground
						style={styles.background}
						source={require("../images/TulsaBookerTWashHighBand.jpg")}
					></ImageBackground>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default connect(mapStateToProps, { setUserInfo })(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
	},
	background: {
		flex: 1,
		height: vh(25),
		width: vw(100),
		alignItems: "center",
	},
	name: {},
	inputView: {},
	input: {},
	logo: {},
	loginButton: {},
	signupMess: {},
	inner: {
		flex: 1,
		padding: vh(18),
		justifyContent: "space-around",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return { userInfo: state.userInfo };
}
