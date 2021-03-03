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
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon, Button } from "react-native-elements";
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
	lengthCap,
	nameCheck,
	passwordCheck,
	urlCheck,
	phoneNumberCheck,
} from "./forms/validation";
import { useNavigation } from "@react-navigation/native";
import RNFetchBlob from "rn-fetch-blob";
import axios from "axios";
// import { DirectUpload } from "activestorage";

const NewBusiness = (props) => {
	const [inputs, setInputs] = useState({
		name: "Business Name",
		summary: "Business Summary",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [visibility, setVisibility] = useState(true);
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
		hearts: 1,
		created_at: "2020-09-04T02:34:57.819Z",
		updated_at: "2020-09-05T05:02:06.268Z",
		comments: [],
	};

	const handleChange = (key, value) => {
		setErrorMessage("");
		setInputs({ ...inputs, [key]: value });
		// console.log(inputs.images.map((img) => img.file_name));
	};

	const postBusiness = (values) => {
		// console.log(
		// 	"IMAGE HASH IS 🖼  ",
		// 	inputs.images.map((img) => img.file_name)
		// );
		if (!inputs.images || inputs.images.length < 1) {
			setErrorMessage("You can upload 10 images. At least 1 is required.");
			return;
		}

		// console.log("vvvvalues", values);

		let imageHash = inputs.images.map((image) => {
			console.log(image.uri);
			return {
				image: image.uri,
				file_name: image.file_name,
			};
		});

		// console.log("INPUTS.IMAGES [] IS 🖼", inputs.images);

		let postData = {
			business: {
				name: inputs.name,
				summary: inputs.summary,
				city: "staten island",
				state: "NY",
				categories: "all",
				website: inputs.website,
				twitter: inputs.twitter,
				facebook: inputs.facebook,
				phone: inputs.phone, //FIX CLEAR VALIDATION ERROR
				email: inputs.email,
				hearts: 0,
				images: imageHash,
				// file_name: inputs.images[0].filename,
			},
		};

		fetch(`http://192.168.1.211:3000/businesses`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Accept: "application/json",
			},
			body: JSON.stringify(postData),
		})
			.then((resp) => {
				handleResult();
			})
			.catch((err) => {
				setErrorMessage("Something went wrong. Try again later.");
				console.log("🚨 Error creating new business: ", err);
			});
	};

	// const uploadFile = (image, business) => {
	// 	const upload = new DirectUpload(
	// 		image,
	// 		"http://192.168.1.211:3000/rails/active_storage/direct_uploads"
	// 	);
	// 	upload.create((error, blob) => {
	// 		if (error) {
	// 			console.log(error);
	// 		} else {
	// 			console.log("there is no error...");
	// 		}
	// 	});
	// };

	const handleResult = (result) => {
		props.handleSuccess("business");
		props.handleClose("business");
		// setPosted(true); //RESET TO POSTED TRUE AFTER POST
		setTimeout(() => {
			props.handleAddBusinessTogg();
		}, 2000);

		// navigation.navigate("Profile");
	};

	// console.log("INPUTS.IMAGES [] IS 🖼", inputs.images);
	// console.log("fetching 🐶:", props.isFetching);
	console.log("New Business USER INFO:", props.userInfo);

	return (
		<Modal visible={visibility} style={styles.container}>
			<View
				style={{
					// flex: 1,
					flexDirection: "column",
					zIndex: 9,
					backgroundColor: "darkslategray",
				}}
			>
				<Header
					name={inputs.name}
					navigation={navigation}
					refresh={true}
					// loading={spinner}
					lastScreen={"MyBusinesses"}
					handleAddBusinessTogg={props.handleAddBusinessTogg}
				/>
			</View>

			<KeyboardAvoidingView behavior="height">
				<ScrollView
					// decelerationRate={0.75}
					bounces={false}
					contentContainerStyle={{
						flexGrow: 1,
						height: props.isFetching ? vh(100) : vh(170),
						backgroundColor: "lightslategray",
						borderWidth: 2.5,
						borderColor: "black",
						// top: vh(0.25),
					}}
					indicatorStyle={"white"}
					// style={styles.scrollCon}
				>
					<View style={styles.bizCon}>
						<View style={{ flexDirection: "row", justifyContent: "center" }}>
							<View
								style={{
									backgroundColor: "rgba(40, 40, 40, 0.5)",
									borderLeftWidth: 2,
									width: vh(8.5),
									height: vh(6.8),
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Image
									resizeMode={"cover"}
									source={{
										// uri: props.userInfo.image
										// 	? `http://192.168.1.211:3000/${props.userInfo.image}`
										// 	: props.userInfo.image,
										uri: props.userInfo.image
											? `http://192.168.1.211:3000/${props.userInfo.image}`
											: props.userInfo.img_url,
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
									inputs.summary
									//BIZ SUMMARY
								}
							</TextTicker>
						</View>
						<View style={styles.cardView}>
							<NewBusinessDash
								business={business}
								inputs={inputs}
								setInputs={setInputs}
								setVisibility={setVisibility}
								visibility={visibility}
								setErrorMessage={setErrorMessage}
							/>
						</View>
						<View style={styles.bizSupport}>
							<NewBusinessSupport
								business={business}
								purpose={"NewBusiness"}
								support={inputs.support}
								setErrorMessage={setErrorMessage}
							/>
						</View>
					</View>
					{props.isFetching && (
						<View
							style={{
								// flex: 1,
								// height: vh(100),
								width: vw(100),
								justifyContent: "center",
								backgroundColor: "rgba(0,5,35,0.8)",
							}}
						>
							<ActivityIndicator
								size="large"
								color="lime"
								hidesWhenStopped={true}
								style={{
									top: vh(28),
								}}
							></ActivityIndicator>
							<View style={{ position: "relative", height: vh(50) }}>
								<ImageBackground
									source={require("../images/blackownedbiz.gif")}
									style={styles.bg}
									imageStyle={{ resizeMode: "stretch" }}
								></ImageBackground>
							</View>
						</View>
					)}
					{/* {!props.isFetching && (
						<View style={styles.commentCon}>
							<CommentList
								bizId={0}
								navigation={navigation}
								newBusiness={true}
								// comments={comments}
							/>
						</View>
					)} */}
					{!props.isFetching && (
						<View style={styles.inputDiv}>
							<View style={styles.inputDash}>
								<Text style={styles.errorMessage}>{errorMessage}</Text>
								<Form
									action={postBusiness}
									afterSubmit={handleResult}
									handleChange={handleChange}
									// buttonText="Create Account"
									// buttonSpinner={spinner}
									type="NewBusiness"
									fields={{
										name: {
											label: "Name",
											validators: [validateContent],
											inputProps: {
												autoCapitalize: "words",
												placeholder: "What's the name of your business?",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										summary: {
											label: "Summary",
											validators: [validateContent],
											inputProps: {
												placeholder: "Enter a summary for your business",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										facebook: {
											label: "Facebook",
											validators: [urlCheck],
											inputProps: {
												autoCapitalize: "none",
												placeholder: "Business Facebook url",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										instagram: {
											label: "Instagram",
											validators: [urlCheck],
											inputProps: {
												placeholder: "Business Instagram url",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										twitter: {
											label: "Twitter",
											validators: [urlCheck],
											inputProps: {
												placeholder: "Business Twitter url",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										website: {
											label: "Website",
											validators: [urlCheck],
											inputProps: {
												placeholder: "Business website url",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										number: {
											label: "Contact",
											validators: [phoneNumberCheck],
											inputProps: {
												keyboardType: "phone-pad",
												placeholder:
													"Enter a telephone number for this business",
												placeholderTextColor: "#D50000",
												textAlign: "center",
											},
										},
										support: {
											label: "Support",
											validators: [urlCheck],
											inputProps: {
												placeholder: "Enter a url to support this business",
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
					)}
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
		backgroundColor: "black",
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

	commentCon: {
		position: "relative",
		// bottom: vh(2),
		opacity: 0.1,
		bottom: vh(36.5),
		backgroundColor: "black",
		flexDirection: "column",
	},
	profilePic: {
		borderRadius: vw(100),
		width: vw(11),
		height: undefined,
		aspectRatio: 135 / 128,
	},
	inputDiv: {
		flex: 1,
		position: "relative",
		opacity: 0.94,
		backgroundColor: "black",
		zIndex: 1,
		bottom: vh(1),
		// paddingTop: vh(5),
	},
	inputDash: {
		position: "absolute",
		flexDirection: "column",
		alignItems: "center",
		width: vw(100),
		paddingBottom: vh(55),
		paddingTop: vh(3.5),
		borderColor: "black",
		backgroundColor: "rgba(0, 0, 0, 0.95)",
	},

	errorMessage: {
		height: vh(3),
		width: vw(90),
		position: "relative",
		color: "red",
		textAlign: "center",
		zIndex: -1,
		// backgroundColor: "red",
	},
	bg: {
		// position: "absolute",
		resizeMode: "stretch",
		opacity: 0.2,
		borderWidth: 0,
		width: vw(100),
		height: vh(36),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		isFetching: state.isFetching,
	};
}
