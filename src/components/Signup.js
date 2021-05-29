import React, { useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Button,
	ImageBackground,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/bizAction";
// import { createAccount } from "../api/authentication";
import Form from "./forms/Form";
// import { setToken } from "../api/token";
import {
	validateContent,
	validateLength,
	passwordMatch,
	emailCheck,
	lengthCap,
	usernameCheck,
	nameCheck,
	urlCheck,
	passwordCheck,
} from "./forms/validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import moment from "moment";
import axios from "axios";

const CreateAccount = (props) => {
	const navigation = useNavigation();
	const [spinner, spinnerTogg] = useState(false);

	const apiPost = async (data) => {
		// console.log("boutta create. data is::::", postData);

		// let inc = "email" in data;

		// inc ? (data["email_verified"] = false) : null;

		let imageArray = [
			{
				image: data.image[0].uri,
				file_name: data.image[0].file_name,
			},
		];

		let postData = {};

		Object.keys(data).map((prop) => {
			prop !== "image"
				? (postData[prop] = data[prop])
				: (postData[prop] = imageArray);
		});

		console.log("boutta create. postData is::::", postData);

		return await axios
			.post(`http://192.168.1.211:3000/users`, postData)
			.then((res) => {
				// props.setUserInfo(res.data);
				// console.log("RES is ", res.data);
				// console.log("EMAIL CHANGED:", inc);
				// return { status: "200", email: inc };
				let result = {
					data: res.data.user,
					inputs: data,
					status: "200",
				};

				return handleCreate(result);
			})
			.catch((error) => {
				// error.response.data.errors.includes("username") ? "username" : null;
				// return "username";

				// return error;
				// return JSON.stringify(errors);
				// return JSON.stringify(error.response);
				// return JSON.stringify(error);
				return JSON.stringify(error.response.data.errors);
			});
	};

	const handleCreate = async (result) => {
		// console.log("res from api::::", result);
		spinnerTogg(true);

		if (result.status === "200") {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(
					result.data.email,
					result.inputs.password
				)
				.then(() => {
					firebase
						.auth()
						.signInWithEmailAndPassword(
							result.data.email,
							result.inputs.password
						)
						.then(() => {
							firebase.auth().onAuthStateChanged(function (user) {
								if (!user.email_verified) {
									// console.log("RESULT DATA IS", result.data);
									// props.setUserInfo({
									// 	id: result.data.user.id,
									// 	email: user.email,
									// 	email_verified: user.email_verified,
									// 	timeSent: moment().utcOffset("-04:00"),
									// 	opaque: result.body.user.opaque,
									// });
									user.sendEmailVerification();
									setTimeout(() => {
										spinnerTogg(false);
										navigation.navigate("Email Confirmation", {
											purpose: "Signup",
											result: result,
										});
									}, 2500);
								} else {
									// props.setUserInfo({
									// 	id: result.data.id,
									// 	email: result.data.email,
									// 	email_verified: user.email_verified,
									// });
									console.log("Verified?👀");
								}
							});
						})
						.catch((error) => {
							// test = true;
							console.log(error.message);
							return error;
						});
				})
				.catch((error) => {
					console.log(error.message);
					return error;
				});
		}

		// 	if (true) {
		// 		// spinnerTogg(false);
		// 		// throw new Error("Something went wrong. Please try again.");
		// 	}

		// 	setTimeout(() => {
		// 		spinnerTogg(false);
		// 		navigation.navigate("Email Confirmation", { purpose: "Signup" });
		// 	}, 2500);
		// } else if (result.status === 422 && result.messChars === 44) {
		// 	// console.log(result);
		// 	spinnerTogg(false);
		// 	throw new Error("That email is already registered");
		// } else if (result.status === 422 && result.messChars === 34) {
		// 	spinnerTogg(false);
		// 	throw new Error("That username is taken.");
		// }

		return result;
	};

	const handleResult = async (result) => {
		let test = false;
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.inner}>
				{/* <View
					styles={{
						// flexDirection: "column-reverse",
						height: vh(30),
						width: vw(100),
						up: vh(20),
						backgroundColor: "blue",
						position: "absolute",
					}}
				>
					<TouchableOpacity
						styles={{
							// flexDirection: "column-reverse",
							height: vh(30),
							width: vw(30),
							// backgroundColor: "blue",
							position: "absolute",
						}}
						onPress={() => console.log("yerrrr")}
					>
						<Icon name="camera" type="feather" color="red" size={55} />
					</TouchableOpacity>
				</View> */}
				<Form
					action={apiPost}
					afterSubmit={handleResult}
					buttonText="Create Account"
					buttonSpinner={spinner}
					type="Signup"
					fields={{
						name: {
							label: "Name",
							validators: [validateContent, nameCheck],
							inputProps: {
								// autoCapitalize: "words",
								placeholder: "Who are you?",
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},
						username: {
							label: "Username",
							validators: [validateContent, usernameCheck, lengthCap],
							inputProps: {
								autoCapitalize: "none",
								placeholder: "choose a username",
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},
						email: {
							label: "Email",
							validators: [validateContent, emailCheck],
							inputProps: {
								keyboardType: "email-address",
								autoCapitalize: "none",
								keyboardType: "email-address",
								placeholder: "enter your email address",
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},

						linkedin: {
							label: "Linkedin",
							validators: [urlCheck],
							inputProps: {
								placeholder: `enter your LinkedIn page url (recommended)`,
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},
						twitter: {
							label: "Twitter",
							validators: [urlCheck],
							inputProps: {
								placeholder: `enter your Twitter page url (recommended)`,
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},
						password: {
							label: "Password",
							validators: [validateContent, validateLength],
							inputProps: {
								textContentType: "newPassword",
								secureTextEntry: true,
								placeholder: "choose a password",
								placeholderTextColor: "lightslategray",
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
								placeholderTextColor: "lightslategray",
								textAlign: "center",
							},
						},
					}}
				/>

				{/* <View style={{ zIndex: 4 }}>
					<Button
						title="Change Email"
						buttonStyle={{
							backgroundColor: "transparent",
							borderRadius: 18,
						}}
						style={{ alignSelf: "flex-end" }}
						titleStyle={{ color: "lightslategray" }}
						onPress={() => {
							props.setUserInfo({ email: "yo", email_verified: false });
							navigation.navigate("Email Confirmation", { purpose: "Signup" });
						}}
					/>
				</View> */}

				{/* <View style={{ zIndex: 4 }}>
					<Button
						title="Check for phone auth"
						
						buttonStyle={{
							backgroundColor: "transparent",
							borderRadius: 18,
						}}
						style={{ alignSelf: "flex-end" }}
						titleStyle={{ color: "lightslategray" }}
						onPress={() => {
							navigation.navigate("Welcome Splash");
						}}
					/>
				</View> */}
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

export default connect(mapStateToProps, { setUserInfo })(CreateAccount);

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: vh(100),
		// alignItems: "center",
		backgroundColor: "black",
	},
	inner: {
		flex: 1,
		paddingBottom: vh(14),
		paddingTop: vh(2.5),
		// justifyContent: "space-around",
		alignItems: "center",
		// backgroundColor: "blue",
	},
	background: {
		flex: 1,
		height: vh(100),
		width: vw(100),
		alignItems: "center",
	},
	img: {
		position: "relative",
		width: vw(39.6),
		height: vh(18),
		opacity: 1.0,
		backgroundColor: "lightslategray",
		// left: vw(10),
		// borderRightWidth: 5,
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
