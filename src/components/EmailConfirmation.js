import React, { useEffect, useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import axios from "axios";
import { Alert } from "react-native";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

function EmailConfirmation(props) {
	let check = "";
	const navigation = useNavigation();
	const [errorMessage, setErrorMessage] = useState("");
	const isFocused = useIsFocused();
	let userData = {};

	useEffect(() => {
		check = setInterval(confirmationCheck, 1000);

		firebaseLogin();

		////DON'T FORGET TO REMOVE ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		// firebase
		// 	.auth()
		// 	.signInWithEmailAndPassword(props.userInfo.email, "ajnchick")
		// 	.then(async () => {
		// 		console.log("signed into firebase");
		// 	})
		// 	.catch((error) => {
		// 		console.log("Firebase error:", error);

		// 		return error;
		// 	});
		////DON'T FORGET TO REMOVE ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

		return () => {
			clearInterval(check);
		};
	}, []);

	const firebaseLogin = async (userData) => {
		await firebase
			.auth()
			.signInWithEmailAndPassword(
				props.route.params.result.data.email,
				props.route.params.result.inputs.password
			)
			.then(async () => {
				console.log("signed into firebase");
			})
			.catch((error) => {
				console.log("Firebase error:", error);
				return error;
			});
	};

	const confirmationCheck = () => {
		console.log(("!!!!focused:", isFocused));

		const currentTime = moment()
			.utcOffset("-04:00")
			.format("dddd, MMMM Do YYYY, h:mm:ss a");

		isFocused &&
			firebase.auth().onAuthStateChanged((user) => {
				user ? user.reload() : null;
				// console.log(
				// 	"checking for verification. Here's the firebase user object",
				// 	user,
				// 	props.userInfo.timeSent
				// );

				console.log("checking. Time is: ", currentTime);

				if (user.emailVerified && props.purpose == "Reverify") {
					verifiedPatch();

					props.setUserInfo({
						...props.userInfo,
						email_verified: true,
					});

					return clearInterval(check);
				} else if (
					user.emailVerified &&
					props.route.params.purpose == "Signup"
				) {
					setTimeout(() => navigation.navigate("Welcome Splash"), 500);
					return clearInterval(check);
				} else if (
					user.emailVerified &&
					props.route.params.purpose == "Reset"
				) {
					props.setUserInfo({
						...props.userInfo,
						email_verified: true,
					});
					return clearInterval(check);
				}
			});
	};

	// check = setInterval(confirmationCheck, 3500);

	const reauthenticate = (opaque) => {
		console.log(opaque);
		const user = firebase.auth().currentUser;
		const cred = firebase.auth.EmailAuthProvider.credential(user.email, opaque);
		return user.reauthenticateWithCredential(cred);
	};

	const verifiedPatch = async () => {
		return await axios
			.patch(`http://192.168.1.211:3000/users/${props.userInfo.id}`, {
				email_verified: true,
			})
			.then(async (res) => {})
			.catch(function (error) {
				console.log("ROR PATCH error:", error);
				return error;
			});
	};

	const emailPatch = async (newEmail) => {
		setErrorMessage("");
		await axios({
			method: "PATCH",
			url: `http://192.168.1.211:3000/users/${props.userInfo.id}`,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			data: {
				user: {
					id: props.userInfo.id,
					email: newEmail,
				},
			},
		})
			.then((response) => {
				props.setUserInfo({
					...props.userInfo,
					email: response.data.email,
				});

				handleEmailChange(response.data.email);
			})
			.catch((error) => {
				console.log(error);
				// if (rsp.length == 36) {
				// 	setErrorMessage("That email is already registered.");
				// } else if (rsp.length == 33) {
				// 	setErrorMessage("Enter a valid email.");
				// }
			});
	};

	const changeEmailAlert = () => {
		setErrorMessage("");
		Alert.prompt(
			"Change Email",
			"Enter the email that you would like to use.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: (newEmail) => {
						emailPatch(newEmail);
					},
				},
			]
		);
	};

	const handleEmailChange = (newEmail) => {
		console.log(props.userInfo);
		reauthenticate(props.userInfo.opaque).then(async () => {
			const currentTime = moment().utcOffset("-04:00");
			// console.log("Current time is ⌚️", currentTime);
			const user = firebase.auth().currentUser;
			user
				.updateEmail(newEmail)
				.then(() => {
					user.sendEmailVerification();
					props.setUserInfo({
						...props.userInfo,
						email: newEmail,
						timeSent: currentTime,
					});
					console.log("Email updated to!", newEmail);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	};

	const handleResend = () => {
		const currentTime = moment().utcOffset("-04:00");
		let difference = false;
		if (props.userInfo.timeSent) {
			difference = currentTime.diff(props.userInfo.timeSent, "seconds");
			console.log(difference);
		}

		if (!difference || difference > 60) {
			firebase.auth().onAuthStateChanged(function (user) {
				user.sendEmailVerification();
			});
			setErrorMessage("Ok. Sent!");
			props.setUserInfo({
				...props.userInfo,
				timeSent: currentTime,
			});
		} else {
			setErrorMessage("Please wait before requesting another email");
		}
	};
	const handleResetCheck = () => {
		if (props.userInfo.emailVerified) {
			setTimeout(() => navigation.navigate("Reset Password"), 2500);
		} else {
			setErrorMessage("Please confirm your email before continuing");
		}
	};

	// console.log("USER INFO IS", props.userInfo);

	return (
		<Modal>
			<View style={styles.container}>
				<Text
					style={{
						color: "darkslategray",
						fontSize: 30,
						// marginTop: vh(2.5),
						top: vh(4),
						fontFamily: "Marker Felt",
					}}
				>
					CHECK YOUR EMAIL
				</Text>

				<View>
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				</View>

				<Icon
					name="ios-mail-unread"
					type="ionicon"
					color="lightslategray"
					size={102}
					style={{ marginTop: vh(5) }}
				/>
				<View
					style={{
						position: "relative",
						height: vh(24),
						top: vh(17.5),
						paddingHorizontal: vw(5),
					}}
				>
					<Text style={styles.message}>We sent a confirmation email to</Text>
					<Text style={styles.message}>{props.userInfo.email}</Text>
					<Text style={styles.message}>
						If you don't see it in your inbox, check your Spam folder. It can
						take up to 10 minutes to receive this email.
					</Text>
				</View>
				<View
					style={{
						// position: "absolute",
						flexDirection: "row",
						display: "flex",
						width: vw(100),
						alignItems: "center",
						justifyContent: "center",
						top: vh(15),
						backgroundColor: "darkslategray",
					}}
				>
					<Button
						title="Send Again"
						buttonStyle={{
							backgroundColor: "transparent",
							// borderRadius: 18,
							backgroundColor: "rgba(0,0,0,0.7)",
							width: vw(33.3),
						}}
						// style={{ alignSelf: "flex-start" }}
						titleStyle={{ color: "lightslategray" }}
						onPress={() => {
							handleResend();
						}}
					/>
					{/* {props.route.params.purpose == "Signup" && (
					<View style={{ marginHorizontal: vw(5) }}>
						<Button
							title="Change Email"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={{ alignSelf: "flex-end" }}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								changeEmailAlert();
							}}
						/>
					</View>
				)}
				{props.route.params.purpose == "Reset" && (
					<View style={{ marginHorizontal: vw(5) }}>
						<Button
							title="Continue"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={{ alignSelf: "flex-end" }}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handleResetCheck();
							}}
						/>
					</View>
				)} */}
					{true && (
						//TESTING

						<Button
							title="Change Email"
							buttonStyle={{
								backgroundColor: "transparent",
								// borderRadius: 18,
								// backgroundColor: "red",
								backgroundColor: "rgba(0,0,0,0.7)",

								width: vw(33.3),

								// marginHorizontal: vw(2),
							}}
							// style={{ alignSelf: "flex-end" }}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								changeEmailAlert();
							}}
						/>
					)}
					{true && (
						<Button
							title="Continue"
							buttonStyle={{
								backgroundColor: "transparent",
								// borderRadius: 18,
								backgroundColor: "rgba(0,0,0,0.7)",

								// backgroundColor: "blue",
								width: vw(33.3),

								// alignSelf: "flex-end",
							}}
							style={{ alignSelf: "flex-end" }}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handleResetCheck();
							}}
						/>
					)}
				</View>
				<View
					style={{
						position: "absolute",
						flex: 1,
						height: vh(50),
						top: vh(15),
						width: vw(70),
						opacity: 0.05,
						zIndex: -1,
						justifyContent: "center",
						// backgroundColor: "blue",
						alignSelf: "center",
						alignItems: "center",
					}}
				>
					<ImageBackground
						style={styles.background}
						source={require("../images/message_sent.gif")}
					></ImageBackground>
				</View>
			</View>
		</Modal>
	);
}

export default connect(mapStateToProps, { setUserInfo })(EmailConfirmation);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "black",
		backgroundColor: "rgba(0,0,0,0.975)",
		justifyContent: "center",
	},
	background: {
		flex: 1,
		height: vh(50),
		width: vw(100),
		resizeMode: "cover",
		alignItems: "center",
	},
	message: {
		color: "darkslategray",
		fontSize: 18,
		textAlign: "center",
		fontFamily: "Chalkduster",
	},
	errorMessage: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
		bottom: vh(5),
		// fontFamily:"Times New Roman",
		// top: vh(49.5),
		// backgroundColor: "purple",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
