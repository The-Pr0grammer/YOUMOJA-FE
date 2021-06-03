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
	lengthCap,
	usernameCheck,
	nameCheck,
	urlCheck,
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

	const handleEdit = async (data) => {
		// console.log("boutta edit. data is::::", data);

		// let inc = "email" in data;

		// inc ? (data["email_verified"] = false) : null;

		return await axios
			.patch(`http://192.168.1.211:3000/users/${props.userInfo.id}`, data)
			.then((res) => {
				// props.setUserInfo(res.data);
				// console.log("RES is ", res.data);
				// console.log("EMAIL CHANGED:", inc);
				// return { status: "200", email: inc };
				return { status: "200" };
			})
			.catch((error) => {
				// console.log("XXX", error.response.data);
				// error.response.data.errors.includes("username") ? "username" : null;
				// return "username";
				return JSON.stringify(error.response.data.errors);
			});
	};

	const handleResult = async (result) => {
		console.log("side effects after edit");
		console.log("result is", result);
		// let err = JSON.stringify(result.response.data.errors);

		await props.fetchUserInfo(props.userInfo.id); 

		if (result.status == "200") {
			props.handleInfoEditTogg();
			props.handleSuccess("info");
			props.handleClose("info");
		}
	};

	const handleEmailChange = async () => {};
	// console.log(props.userInfo.allow_emails);
	// console.log("error message:⚠️", errorMessages);

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
							handleCancel={props.handleInfoEditTogg}
							type="EditProfile"
							buttonText="Save Changes"
							buttonSpinner={spinner}
							userInfo={{
								name: props.userInfo.name,
								username: props.userInfo.username,
								linkedin: props.userInfo.linkedin,
								twitter: props.userInfo.twitter,
								email: props.userInfo.email,
								allow_emails: props.userInfo.allow_emails,
							}}
							fields={{
								name: {
									label: "Name",
									validators: [nameCheck],
									inputProps: {
										autoCapitalize: "words",
										placeholder: `${props.userInfo.name}`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
										autoCorrect: false,
									},
								},
								username: {
									label: "Username",
									validators: [usernameCheck, lengthCap],
									inputProps: {
										placeholder: `${props.userInfo.username}`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
										autoCorrect: false,
									},
								},
								linkedin: {
									label: "Linkedin",
									validators: [urlCheck],
									inputProps: {
										placeholder: `${props.userInfo.linkedin}`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
									},
								},
								twitter: {
									label: "Twitter",
									validators: [urlCheck],
									inputProps: {
										placeholder: `${props.userInfo.twitter}`,
										placeholderTextColor: "lightslategray",
										textAlign: "center",
									},
								},
								// email: {
								// 	label: "Email",
								// 	validators: [emailCheck],
								// 	inputProps: {
								// 		keyboardType: "email-address",
								// 		autoCapitalize: "none",
								// 		keyboardType: "email-address",
								// 		placeholder: `${props.userInfo.email}`,
								// 		placeholderTextColor: "lightslategray",
								// 		textAlign: "center",
								// 		autoCorrect: false,
								// 	},
								// },
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
