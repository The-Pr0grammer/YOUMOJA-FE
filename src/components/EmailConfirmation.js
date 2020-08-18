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
import { setUser } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import axios from "axios";
import { getHeaders } from "../api/fetch";
import { Alert } from "react-native";
import moment from "moment";

function EmailConfirmation(props) {
	// console.log(props.userInfo);
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
			if (user.emailVerified) {
				setTimeout(
					() => navigation.navigate("DrawerNav", { screen: "Home" }),
					2500
				);
				return clearInterval(check);
			}
		});
	};
	// check = setInterval(confirmationCheck, 3500);
	const reauthenticate = (opaque) => {
		const user = firebase.auth().currentUser;
		const cred = firebase.auth.EmailAuthProvider.credential(user.email, opaque);
		return user.reauthenticateWithCredential(cred);
	};
	const emailPatch = async (newEmail) => {
		setErrorMessage("");
		const headers = await getHeaders();
		await axios({
			method: "PATCH",
			url: `http://localhost:3000/users/${props.userInfo.id}`,
			data: {
				email: newEmail,
			},
			headers,
		})
			.then((response) => {
				props.setUser({
					...props.userInfo,
					email: response.data.email,
				});
				handleEmailChange(response.data.email);
			})
			.catch((error) => {
				const rsp = JSON.stringify(error.response.data);
				console.log(rsp.length);
				if (rsp.length == 36) {
					setErrorMessage("That email is already registered.");
				} else if (rsp.length == 33) {
					setErrorMessage("Enter a valid email.");
				}
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
		reauthenticate(props.userInfo.opaque).then(async () => {
			const currentTime = moment().utcOffset("-04:00");
			const user = firebase.auth().currentUser;
			user
				.updateEmail(newEmail)
				.then(() => {
					user.sendEmailVerification();
					props.setUser({
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
			props.setUser({
				...props.userInfo,
				timeSent: currentTime,
			});
		} else {
			setErrorMessage("Please wait before requesting another email");
		}
	};

	useEffect(() => {
		check = setInterval(confirmationCheck, 3500);
		return () => {
			clearInterval(check);
		};
	});

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
					top: vh(30.75),
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

export default connect(mapStateToProps, { setUser })(EmailConfirmation);

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
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
