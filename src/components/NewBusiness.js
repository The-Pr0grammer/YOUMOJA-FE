import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Share,
	Modal,
	Text,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { setUserInfo } from "../redux/actions/bizAction";
import Header from "./Header.js";
import CommentList from "./CommentList.js";
import NewBusinessDash from "./NewBusinessDash.js";
import NewBusinessSupport from "./NewBusinessSupport.js";
import Form from "./forms/Form";
import {
	validateContent,
	validateLength,
	passwordMatch,
	emailCheck,
	lengthCap,
	usernameCheck,
	nameCheck,
	passwordCheck,
} from "./forms/validation";
import { useNavigation } from "@react-navigation/native";

const NewBusiness = (props) => {
	const [bizSummary, setBizSummary] = useState("Business Summary");
	const [comments, setComments] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [input, setInput] = useState("");
	const navigation = useNavigation();
	const business = {
		id: 1,
		name: "Black Flag Apparel",
		city: "Staten Island",
		state: "NY",
		summary: "Black Flag: Never Give Up 🏴",
		categories: "Coaching,Fashion,Non Profit",
		website: "BFNGU.com",
		twitter: "https://twitter.com/N_everG_iveU_p",
		facebook: null,
		phone: null,
		email: null,
		image_url:
			"https://cdn.dribbble.com/users/908023/screenshots/7195388/media/da178ba79a307d5fb608e6307507c2cc.png",
		hearts: 2,
		created_at: "2020-09-04T02:34:57.819Z",
		updated_at: "2020-09-05T05:02:06.268Z",
		comments: [],
	};

	const handleResult = async (result) => {
		console.log("submitting✅...");
	};
	// console.log(props.route.params.lastScreen);

	const createAccount = (email, name, opaque, opaque_two, username) => {
		return post("/users", {
			user: { email, name, opaque, opaque_two, username },
		});
	};

	return (
		<Modal style={styles.container}>
			<View
				style={{
					// flex: 1,
					flexDirection: "column",
					zIndex: 9,
					backgroundColor: "darkslategray",
				}}
			>
				<Header
					name={"Business Name"}
					navigation={navigation}
					refresh={true}
					// loading={spinner}
					lastScreen={"MyBusinesses"}
					handleAddBusinessTogg={props.handleAddBusinessTogg}
				/>
			</View>
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<ScrollView
					bounces={false}
					contentContainerStyle={{
						// flex: 1,
						height: vh(132.5),
						backgroundColor: "lightslategray",
						top: vh(0),
					}}
					// style={styles.scrollCon}
				>
					<View style={styles.bizCon}>
						<View style={{ flexDirection: "row", justifyContent: "center" }}>
							<View
								style={{
									backgroundColor: "rgba(40, 40, 40, 0.5)",
									borderLeftWidth: 4,
									width: vh(8.5),
									height: vh(6.8),
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Image
									resizeMode={"cover"}
									source={{
										uri: props.userInfo.img_url,
									}}
									style={styles.profilePic}
								></Image>
							</View>
							<TextTicker
								shouldAnimateTreshold={vw(8)}
								duration={9600}
								loop
								bounce
								repeatSpacer={25}
								marqueeDelay={3200}
								style={styles.bizSumm}
							>
								{
									bizSummary
									//BIZ SUMMARY
								}
							</TextTicker>
						</View>
						<View style={styles.cardView}>
							<View
								style={{
									position: "relative",
									backgroundColor: "purple",
									width: vw(30),
									// height: vh(15),
									// zIndex: 3,
									flexDirection: "column",
								}}
							>
								<TouchableOpacity styles={{ flexDirection: "column-reverse" }}>
									<Image
										//IMAGES
										style={styles.img}
										source={require("../images/Upload.png")}
									/>
									<Text
										style={{
											position: "absolute",
											textAlign: "center",
											// backgroundColor: "red",
											width: vw(59),
											top: vh(26),
											fontFamily: "Marker Felt",
											fontSize: 18,
											// alignSelf:"flex-end"
										}}
									>
										Upload Images
									</Text>
								</TouchableOpacity>
							</View>
							<NewBusinessDash business={business} />
						</View>
						<View style={styles.bizSupport}>
							<NewBusinessSupport business={business} purpose={"NewBusiness"} />
						</View>
					</View>
					<View style={styles.commentCon}>
						<CommentList
							bizId={0}
							navigation={navigation}
							// comments={comments}
						/>
					</View>
					<View style={styles.inputDiv}>
						<View style={styles.inputDash}>
							<Text style={styles.errorMessage}>Example error message</Text>
							<Form
								action={createAccount}
								afterSubmit={handleResult}
								// buttonText="Create Account"
								// buttonSpinner={spinner}
								type="NewBusiness"
								fields={{
									name: {
										label: "Name",
										validators: [validateContent, nameCheck],
										inputProps: {
											autoCapitalize: "words",
											placeholder: "Who are you?",
											placeholderTextColor: "#D50000",
											textAlign: "center",
										},
									},
									username: {
										label: "Username",
										validators: [validateContent, usernameCheck, lengthCap],
										inputProps: {
											placeholder: "choose a username",
											placeholderTextColor: "#D50000",
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
											placeholderTextColor: "#D50000",
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
							{/* <Button
							title={"Post Business"}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={styles.createButton}
							titleStyle={{ color: "gray" }}
							onPress={handleResult}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
						<Button
							title={"Cancel"}
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
							}}
							style={styles.createButton}
							titleStyle={{ color: "gray" }}
							onPress={handleResult}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/> */}
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Modal>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
})(NewBusiness);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		backgroundColor: "maroon",
	},
	bizCon: {
		position: "relative",
		width: vw(100),
		// height: vh(7.3),
		backgroundColor: "black",
		// bottom: vh(83),
		borderTopWidth: 2.5,
	},
	scrollCon: {
		position: "relative",
		width: vw(100),
		// height: vh(7.3),
		backgroundColor: "black",
		bottom: vh(13),
		borderTopWidth: 2.5,
	},
	bizSumm: {
		position: "relative",
		padding: vw(1.25),
		fontFamily: "Marker Felt",
		fontSize: 18,
		color: "olivedrab",
		height: vh(6),
		backgroundColor: "black",
		marginBottom: vh(0.8),
		top: vh(2),
	},
	bizSupport: {
		position: "relative",
		// padding: vw(1.25),
		backgroundColor: "lightslategray",
	},
	cardView: {
		position: "relative",
		borderWidth: 2.5,
		borderTopWidth: 2.5,
		flexDirection: "column",
		borderColor: "black",
		backgroundColor: "darkslategray",
		// alignItems: "center",
	},
	img: {
		position: "absolute",
		width: vw(58),
		height: vh(28),
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "darkslategray",
		// borderRightWidth: 5,
	},
	commentCon: {
		position: "relative",
		bottom: vh(36.95),
		opacity: 0.5,
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: 22,
		height: vh(6),
		width: vw(11),
	},
	inputDiv: {
		position: "relative",
		bottom: vh(34.75),
		opacity: 1,
		backgroundColor: "black",
		zIndex: 1,
		// paddingTop: vh(5),
	},
	inputDash: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		top: vh(33.5), //36.5
		backgroundColor: "rgba(0, 0, 0, 0.95)",
		flexDirection: "column",
		position: "absolute",
		paddingBottom: vh(54.4),
		paddingTop: vh(2),
		borderWidth: 2.5,
		borderColor: "black",
		// justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
	},
	errorMessage: {
		height: vh(3),
		width: vw(85),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
		// backgroundColor: "red",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
