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
import { setUser } from "../redux/actions/bizAction";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { login } from "../api/authentication.js";
import { setToken } from "../api/token";
import Form from "./forms/Form";
import {
	validateContent,
	validateLength,
	emailCheck,
} from "./forms/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Login = (props) => {
	const navigation = useNavigation();
	useFocusEffect(
		React.useCallback(() => {
			logOut();
			Keyboard.dismiss();
		}, [])
	);

	const [errorMessage, setErrorMessage] = useState("");

	const logOut = async () => {
		await setToken("");
	};

	const handleResult = async (result) => {
		if (result.ok && result.data) {
			await setToken(result.data.auth_token);
			try {
				firebase
					.auth()
					.signInWithEmailAndPassword(
						result.data.email,
						result.body.user.opaque
					)
					.then(() => {
						firebase.auth().onAuthStateChanged(function (user) {
							if (!user.emailVerified) {
								props.setUser({
									id: result.data.id,
									email: result.data.email,
									emailVerified: user.emailVerified,
									opaque: result.body.user.opaque,
								});
								return navigation.navigate("Email Confirmation");
							} else {
								props.setUser({
									id: result.data.id,
									email: result.data.email,
									emailVerified: user.emailVerified,
								});
								console.log("Verified😎", user.email);
							}
						});
					})
					.catch((error) => {
						console.log(error.message);
					});
			} catch (error) {
				console.log(error.message);
			}

			{
				(await props.userInfo.emailVerified) &&
					setTimeout(
						() => navigation.navigate("DrawerNav", { screen: "Home" }),
						2500
					);
			}
		} else if (result.status === 401) {
			throw new Error("Invalid login");
		} else {
			throw new Error("Something went wrong");
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
								resizeMode: "cover",
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
							type="Login"
							fields={{
								email: {
									label: "Email",
									validators: [validateContent],
									inputProps: {
										keyboardType: "email-address",
										autoCapitalize: "none",
										textContentType: "username",
										placeholder: "email address or username",
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
							height: vh(0.5),
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
								backgroundColor: "rgba(0, 0, 0, 0.8)",
							}}
						>
							Don't have an account? Sign up for free.
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

export default connect(mapStateToProps, { setUser })(Login);

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
