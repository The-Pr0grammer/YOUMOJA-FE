import React, { useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	KeyboardAvoidingView,
	Modal,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, fetchUserInfo } from "../redux/actions/bizAction";
import { createAccount } from "../api/authentication";
import Form from "./forms/Form";
// import { setToken } from "../api/token";
import {
	validateContent,
	emailCheck,
	validateLength,
	passwordMatch,
} from "./forms/validation";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import * as firebase from "firebase";
import moment from "moment";

import axios from "axios";

const EditProfile = (props) => {
	const navigation = useNavigation();
	const [spinner, spinnerTogg] = useState(false);
	const [errorMessages, setErrorMessages] = useState(false);

	const reauthenticate = (opaque) => {
		const user = firebase.auth().currentUser;
		const cred = firebase.auth.EmailAuthProvider.credential(user.email, opaque);
		return user.reauthenticateWithCredential(cred);
	};

	const handleEdit = async (data, user) => {
		// console.log("boutta edit. data is:::::", data, user);

		if (data["email"]) {
			return await handlePatchAndUpdate(data, user);
		} else if (data["password"]) {
			return await user
				.updatePassword(data["password"])
				.then(function () {
					console.log(
						"Password update successful. New password is:",
						data["password"]
					);
					return { status: "200" };
				})
				.catch(function (error) {
					return error;
				});
		}
	};

	handlePatchAndUpdate = async (data, user) => {
		const currentTime = moment().utcOffset("-04:00");

		return await axios
			.patch(`http://192.168.1.211:3000/users/${props.userInfo.id}`, {
				email: data["email"],
				email_verified: false,
				time_sent: currentTime,
			})
			.then(async (res) => {
				console.log("RES AFTER PATCH", res.data);
				// props.setUserInfo({
				// 	...props.userInfo,
				// 	email_verified: false,
				// 	time_sent: currentTime,
				// });

				user
					.updateEmail(data["email"])
					.then(() => {
						// const currentTime = moment().utcOffset("-04:00");
						user.sendEmailVerification();

						console.log(
							"Email update successful. New email is:",
							data["email"]
						);

						if (data["password"]) {
							return user
								.updatePassword(data["password"])
								.then(function () {
									console.log(
										"Password update successful. New password is:",
										data["password"]
									);
								})
								.catch(function (error) {
									return error;
								});
						}
					})
					.catch(function (error) {
						console.log("Firebase email update error:", error);

						return error;
					});

				// console.log("USER INFO::::", props.userInfo);
				return { status: "200" };
			})
			.catch((error) => {
				// console.log("db error:", error.response.data.errors.email);
				console.log("db error:", error.response.data.errors);
				return JSON.stringify(error.response.data.errors);
			});
	};
	// const handleEdit = async (data) => {
	// 	console.log("boutta edit. data is::::", data);

	// 	await firebase
	// 		.auth()
	// 		.signInWithEmailAndPassword(props.userInfo.email, data["currentPassword"])
	// 		.then(async () => {
	// 			return firebase.auth().onAuthStateChanged(async (user) => {
	// 				if (data["email"]) {
	// 					const currentTime = moment().utcOffset("-04:00");

	// 					return axios
	// 						.patch(`http://192.168.1.211:3000/users/${props.userInfo.id}`, {
	// 							email: data["email"],
	// 							email_verified: false,
	// 							time_sent: currentTime,
	// 						})
	// 						.then((res) => {
	// 							console.log("RES AFTER PATCH", res.data);
	// 							props.setUserInfo(res.data);
	// 						})
	// 						.then(async (res) => {
	// 							user
	// 								.updateEmail(data["email"])
	// 								.then(function () {
	// 									// const currentTime = moment().utcOffset("-04:00");

	// 									user.sendEmailVerification();

	// 									console.log(
	// 										"Email update successful. New email is:",
	// 										data["email"]
	// 									);
	// 								})
	// 								.catch(function (error) {
	// 									console.log("Firebase error:", error);

	// 									return error;
	// 								});
	// 						})
	// 						.catch((error) => {
	// 							// console.log("db error:", error.response.data.errors.email);
	// 							console.log("db error:", error.response.data.errors);

	// 							return JSON.stringify(error.response.data.errors);
	// 						});
	// 				}

	// 				if (data["password"]) {
	// 					return user
	// 						.updatePassword(data["password"])
	// 						.then(function () {
	// 							console.log(
	// 								"Password update successful. New password is:",
	// 								data["password"]
	// 							);
	// 						})
	// 						.catch(function (error) {
	// 							return error;
	// 						});
	// 				}

	// 				console.log("USER INFO::::", props.userInfo);
	// 				return { status: "200" };
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log("Firebase error:", error);

	// 			if (error.message.includes("invalid")) {
	// 				return { currentPassword: "Invalid password" };
	// 			} else if (error.message.includes("disabled")) {
	// 				return {
	// 					currentPassword: "Too many failed attempts. Try again later",
	// 				};
	// 			} else {
	// 				return error;
	// 			}
	// 		});
	// };

	const handleResult = async (result) => {
		// console.log("side effects after edit");
		// console.log("result is", result);
		// // let err = JSON.stringify(result.response.data.errors);

		await props.fetchUserInfo(props.userInfo.id); 

		if (result.status == "200") {
			props.handleCredsEditTogg();
			props.handleSuccess("creds");
			props.handleClose("creds");
		}
	};

	const handleEmailChange = async () => {};

	// console.log(props.userInfo.allow_emails);
	// console.log("error message:⚠️", errorMessages);
	console.log("USER INFO👤:::", props.userInfo);

	return (
		<Modal>
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				{/* <Header
					name={"Profile Edit"}
					navigation={navigation}
					lastScreen={"Profile"}
				/> */}
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.inner}>
						<Form
							action={handleEdit}
							afterSubmit={handleResult}
							handleCancel={props.handleCredsEditTogg}
							type="EditUserCreds"
							buttonText="Save Changes"
							buttonSpinner={spinner}
							userInfo={{
								username: props.userInfo.username,
								email: props.userInfo.email,
								email_verified: props.userInfo.email_verified,
							}}
							fields={{
								currentPassword: {
									label: "Current Password",
									validators: [validateContent],
									inputProps: {
										placeholder: `enter your current password`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
										secureTextEntry: true,
									},
								},
								password: {
									label: "New Password",
									// validators: [validateLength],
									inputProps: {
										textContentType: "newPassword",
										secureTextEntry: true,
										placeholder: "choose a new password",
										placeholderTextColor: "lightslategray",
										textAlign: "center",
									},
								},
								passwordConf: {
									label: "Confirm New Password",
									validators: [passwordMatch],
									inputProps: {
										textContentType: "newPassword",
										secureTextEntry: true,
										placeholder: "confirm your new password",
										placeholderTextColor: "lightslategray",
										textAlign: "center",
									},
								},
								email: {
									label: "New Email",
									validators: [emailCheck],
									inputProps: {
										keyboardType: "email-address",
										autoCapitalize: "none",
										keyboardType: "email-address",
										placeholder: `enter the new email you want to use`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
										autoCorrect: false,
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
								opacity: 0.15,
							}}
						>
							<ImageBackground
								style={styles.background}
								source={require("../images/blackpower.gif")}
							></ImageBackground>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Modal>
	);
};

export default connect(mapStateToProps, { setUserInfo, fetchUserInfo })(
	EditProfile
);

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
		backgroundColor: "transparent",
	},
	inner: {
		flex: 1,
		padding: vh(17),
		justifyContent: "space-around",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
