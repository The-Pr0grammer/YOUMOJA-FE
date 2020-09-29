import React, { useEffect, useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
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

function EmailConfirmation(props) {
	console.log("USER INFO IS", props.userInfo);
	const navigation = useNavigation();
	const [errorMessage, setErrorMessage] = useState("");
	let check;
	const confirmationCheck = () => {
		firebase.auth().onAuthStateChanged((user) => {
			user ? user.reload() : null;
			console.log(
				"checking for verification and time sent was",
				props.userInfo.timeSent
			);
			if (user.emailVerified && props.route.params.purpose == "Signup") {
				setTimeout(() => navigation.navigate("Welcome Splash"), 500);
				return clearInterval(check);
			} else if (user.emailVerified && props.route.params.purpose == "Reset") {
				props.setUserInfo({
					...props.userInfo,
					emailVerified: true,
				});
				return clearInterval(check);
			}
		});
	};

	useEffect(() => {
		check = setInterval(confirmationCheck, 3500);
		return () => {
			clearInterval(check);
		};
	}, []);

	// check = setInterval(confirmationCheck, 3500);
	const reauthenticate = (opaque) => {
		console.log(opaque);
		const user = firebase.auth().currentUser;
		const cred = firebase.auth.EmailAuthProvider.credential(user.email, opaque);
		return user.reauthenticateWithCredential(cred);
	};
	const emailPatch = async (newEmail) => {
		setErrorMessage("");
		await axios({
			method: "PATCH",
			url: `http://127.0.0.1:3000/users/${props.userInfo.id}`,
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
		Alert.prompt("Change Email", "Enter the email you would like to use", [
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
		]);
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

	return (
		<View style={styles.container}>
			<Text
				style={{
					color: "red",
					fontSize: 30,
					marginTop: vh(2.5),
					top: vh(2.5),
					fontFamily: "Marker Felt",
				}}
			>
				CHECK YOUR EMAIL
			</Text>

			<View>
				<Text style={styles.changeEmailError}>{errorMessage}</Text>
			</View>

			<Icon
				name="ios-mail-unread"
				type="ionicon"
				color="red"
				size={102}
				style={{ marginTop: vh(1.5) }}
			/>
			<View
				style={{
					height: vh(24),
					top: vh(35.75),
				}}
			>
				<ScrollView scrollEnabled={true}>
					<Text style={styles.message}>Success! We sent a confirmation to</Text>
					<Text style={styles.message}>{props.userInfo.email}</Text>
					<Text style={styles.message}>
						If you don't see it in your inbox check your Spam folder. It can
						take up to 10 minutes to receive this email.
					</Text>
				</ScrollView>
			</View>
			<View
				style={{
					position: "absolute",
					flexDirection: "row",
					display: "flex",
					width: vw(100),
					top: vh(82),
				}}
			>
				<View
					style={{
						flex: 1,
						marginHorizontal: vw(5),
					}}
				>
					<Button
						title="Send Again"
						buttonStyle={{
							backgroundColor: "transparent",
							borderRadius: 18,
						}}
						style={{ alignSelf: "flex-start" }}
						titleStyle={{ color: "gray" }}
						onPress={() => {
							handleResend();
						}}
					/>
				</View>
				{props.route.params.purpose == "Signup" && (
					<View style={{ marginHorizontal: vw(5) }}>
						<Button
							title="Change Email"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={{ alignSelf: "flex-end" }}
							titleStyle={{ color: "gray" }}
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
							titleStyle={{ color: "gray" }}
							onPress={() => {
								handleResetCheck();
							}}
						/>
					</View>
				)}
			</View>
			<View
				style={{
					position: "absolute",
					flex: 1,
					height: vh(100),
					width: vw(100),
					opacity: 0.1,
					zIndex: -1,
				}}
			>
				<ImageBackground
					style={styles.background}
					source={require("../images/blackvibesonly.jpg")}
				></ImageBackground>
			</View>
		</View>
	);
}

export default connect(mapStateToProps, { setUserInfo })(EmailConfirmation);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "black",
	},
	background: {
		flex: 1,
		height: vh(92.5),
		width: vw(100),
		alignItems: "center",
	},
	message: {
		color: "seagreen",
		fontSize: 18,
		textAlign: "center",
		fontFamily: "Chalkduster",
	},
	changeEmailError: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
		top: vh(49.5),
		// backgroundColor: "purple",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
