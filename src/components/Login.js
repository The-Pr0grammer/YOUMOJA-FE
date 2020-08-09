import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { login } from "../api/authentication.js";
import { setToken } from "../api/token";
import Form from "./forms/Form";
import { validateContent, validateLength } from "./forms/validation";

const Login = ({ navigation }) => {
	useFocusEffect(
		React.useCallback(() => {
			logOut();
		}, [])
	);
	const [errorMessage, setErrorMessage] = useState("");
	// const loginUser = async (email, password) => {
	// 	// setErrorMessage("");
	// 	login(email, password)
	// 		.then(async (res) => {
	// 			console.log(result);

	// 			await setToken(res.auth_token);
	// 			navigation.navigate("Home", { screen: "Home" });
	// 		})
	// 		.catch((err) => setErrorMessage(err.message));
	// };

	const logOut = async () => {
		await setToken("");
	};

	const handleResult = async (result) => {
		if (result.ok && result.data) {
			console.log("result data is", result.data);
			await setToken(result.data.auth_token);
			navigation.navigate("Home");
		} else if (result.status === 401) {
			throw new Error("Invalid login.");
		} else {
			throw new Error("Something went wrong.");
		}
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.inner}>
				<View
					style={{
						flex: 1,
						height: vh(100),
						justifyContent: "center",
						alignItems: "center",
						opacity: 1,
						zIndex: 1,
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
							backgroundColor: "black",
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

					{/* <TextInput
						textAlign
						clearTextOnFocus={true}
						placeholder="username or email"
						placeholderTextColor="#D50000"
						style={{
							height: vh(6),
							width: vw(55),
							fontSize: 20,
							borderRadius: 30,
							color: "black",
							borderWidth: 3.5,
							backgroundColor: "maroon",
							marginVertical: vh(1),
						}}
					/>
					<TextInput
						textAlign
						clearTextOnFocus={true}
						// defaultValue="password"
						textContentType={"password"}
						secureTextEntry={true}
						placeholder="password"
						placeholderTextColor="#D50000"
						style={{
							height: vh(6),
							width: vw(55),
							fontSize: 20,
							borderRadius: 30,
							color: "black",
							borderWidth: 3.5,
							backgroundColor: "maroon",
						}}
					/>
					<Button
						buttonStyle={{ backgroundColor: "black", borderRadius: 18 }}
						style={{
							color: "black",
							position: "relative",
							borderRadius: 20,
							height: vh(10),
							width: vw(30),
							marginTop: vh(2.5),
						}}
						titleStyle={{ color: "red" }}
						title="Log In"
						onPress={loginUser}
					></Button>
					 */}

					<Form
						action={login}
						afterSubmit={handleResult}
						buttonText="Submit"
						fields={{
							email: {
								label: "Email",
								validators: [validateContent],
								inputProps: {
									keyboardType: "email-address",
								},
							},
							password: {
								label: "Password",
								validators: [validateLength],
								inputProps: {
									secureTextEntry: true,
								},
							},
						}}
					/>

					<View
						style={{
							top: vh(4.5),
							width: vw(77),
							height: vh(0.5),
							backgroundColor: "black",
						}}
					></View>
					<TouchableWithoutFeedback
						style={{
							marginTop: vh(5),
							width: vw(92.5),
							height: vh(5),
						}}
						onPress={() => navigation.navigate("Home", { screen: "Signup" })}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 20,
								color: "red",
								backgroundColor: "black",
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
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
		padding: vh(10),
		flex: 1,
		justifyContent: "space-around",
		backgroundColor: "black",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return { isLogged: state.isLogged };
}

function mapDispatchToProps(dispatch) {
	return {
		signIn: () => dispatch({ type: "SIGN IN" }),
	};
}
