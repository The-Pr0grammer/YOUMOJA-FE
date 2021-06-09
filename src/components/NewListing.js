import React, { useState, useEffect, createRef, useLayoutEffect } from "react";
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
	Keyboard,
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
import NewListingDash from "./NewListingDash.js";
import NewListingSupport from "./NewListingSupport.js";
import Form from "./forms/Form";
import {
	validateContent,
	urlCheck,
	emojiCheck,
	contactCheck,
} from "./forms/validation";
import { useNavigation } from "@react-navigation/native";
import RNFetchBlob from "rn-fetch-blob";
import FastImage from "react-native-fast-image";

import axios from "axios";
// import { DirectUpload } from "activestorage";

const NewListing = (props) => {
	const [inputs, setInputs] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [visibility, setVisibility] = useState(true);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const [offset, setOffset] = useState(null);
	const [scroll, setScroll] = useState(false);
	const navigation = useNavigation();

	// useEffect(() => {
	// 	// setScroll(createRef());

	// 	const keyboardDidShowListener = Keyboard.addListener(
	// 		"keyboardDidShow",
	// 		() => {
	// 			// setKeyboardVisible(true); // or some other action
	// 			// setOffset(0);
	// 		}
	// 	);

	// 	const keyboardDidHideListener = Keyboard.addListener(
	// 		"keyboardDidHide",
	// 		() => {
	// 			// setTimeout(() => {
	// 			// 	// setOffset(null);
	// 			// }, 100);

	// 			// console.log("⌨️ CLOSED");
	// 		}
	// 	);

	// 	return () => {
	// 		keyboardDidShowListener.remove();
	// 		keyboardDidHideListener.remove();
	// 	};
	// }, []);

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
			setErrorMessage("At least one image is required.");
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

	// const trackFocusAndBlur = (event) => {
	// 	console.log("👓 / 🕶", event);

	// 	event == "focus" &&
	// 		setTimeout(() => {
	// 			console.log("XXX");
	// 			// setOffset(0);
	// 		}, 200);

	// 	// event == "blur" &&
	// 	// 	setTimeout(() => {
	// 	// 		console.log("XXX");
	// 	// 		setOffset(0);
	// 	// 	}, 0);
	// };

	// console.log("INPUTS.IMAGES [] IS 🖼", inputs.images);
	// console.log("fetching 🐶:", props.isFetching);
	// console.log("New Business USER INFO:", props.userInfo);
	// console.log("offSET:", offset);

	return (
		<KeyboardAvoidingView
			// behavior="position"
			behavior="padding"
			style={styles.container}
			// keyboardVerticalOffset={25}
			// contentContainerStyle={{ bottom: vh(15) }}
		>
			<View
				style={{
					// flex: 1,
					flexDirection: "column",
					zIndex: 9,
					backgroundColor: "darkslategray",
				}}
			>
				<Header
					name={inputs.name ? inputs.name : "Business Name"}
					navigation={navigation}
					refresh={true}
					// loading={spinner}
					lastScreen={"MyBusinesses"}
					handleAddBusinessTogg={props.handleAddBusinessTogg}
					addBusinessTogg={props.addBusinessTogg}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					paddingBottom: vh(0.25),
				}}
			>
				<View
					style={{
						backgroundColor: "rgba(40, 40, 40, 0.5)",
						// borderLeftWidth: 4,
						width: vw(16),
						height: vh(6.8),
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<FastImage
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
					></FastImage>
				</View>
				<TextTicker
					shouldAnimateTreshold={vw(8)}
					duration={9500}
					loop
					bounce
					repeatSpacer={25}
					marqueeDelay={3200}
					style={styles.bizSumm}
				>
					{
						inputs.summary ? inputs.summary : "Business Summary"
						//BIZ SUMMARY
					}
				</TextTicker>
			</View>
			<ScrollView
				// decelerationRate={0.75}
				bounces={false}
				contentContainerStyle={{
					flexGrow: 1,
					// height: props.isFetching ? vh(100) : vh(100),
					// height: !props.isFetching && vh(150),
					width: "100%",
					backgroundColor: "lightslategray",
					borderWidth: 2.5,
					borderColor: "black",
				}}
				indicatorStyle={"white"}
				// ref={scroll}
				ref={(component) => {
					setScroll(component);
				}}
				// style={styles.scrollCon}
			>
				{/* 💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼 */}
				<View style={styles.bizCon}>
					{/* <View style={styles.cardView}> */}
					<NewListingDash
						// business={business}
						inputs={inputs}
						setInputs={setInputs}
						setVisibility={setVisibility}
						visibility={visibility}
						setErrorMessage={setErrorMessage}
					/>
					{/* </View> */}
					{/* <View style={styles.bizSupport}> */}
					<NewListingSupport
						// business={business}
						purpose={"NewListing"}
						support={inputs.cashapp}
						setErrorMessage={setErrorMessage}
					/>
					{/* </View> */}
				</View>
				{/* 💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼💼 */}

				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
				<View style={styles.inner}>
					{/* <Text style={styles.errorMessage}>{errorMessage}</Text> */}
					<Form
						action={postBusiness}
						afterSubmit={handleResult}
						handleChange={handleChange}
						// handleOffset={handleOffset}
						// buttonText="Create Account"
						// buttonSpinner={spinner}
						purpose="NewListing"
						// scrollRef={this.myScrollView}
						scrollRef={scroll}
						propsError={errorMessage}
						fields={{
							name: {
								label: "Name",
								validators: [validateContent, emojiCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business name",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							summary: {
								label: "Summary",
								validators: [validateContent],
								inputProps: {
									placeholder: "business summary",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							facebook: {
								label: "Facebook",
								validators: [urlCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business facebook url (recommended)",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							instagram: {
								label: "Instagram",
								validators: [urlCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business instagram url (recommended)",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							twitter: {
								label: "Twitter",
								validators: [urlCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business twitter url (recommended)",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							website: {
								label: "Website",
								validators: [urlCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business website url",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							cashapp: {
								label: "Cashapp",
								validators: [],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "$cashtag for donations",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
								},
							},
							contact: {
								label: "Contact",
								validators: [contactCheck],
								inputProps: {
									autoCapitalize: "none",
									placeholder: "business 10 digit phone number or email",
									placeholderTextColor: "lightslategray",
									textAlign: "center",
									// keyboardType: "phone-pad",
								},
							},
						}}
					/>
				</View>
				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
				{/* ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ ↕️ */}
			</ScrollView>
			<View
				style={{
					// flex: 1,
					// height: vh(100),
					width: vw(100),
					justifyContent: "center",
					// backgroundColor: "rgba(0,5,35,0.8)",
					position: "absolute",
					top: "52%",
					zIndex: -1,
				}}
			>
				<ActivityIndicator
					size="large"
					color="lime"
					hidesWhenStopped={true}
					style={{
						top: vh(25),
					}}
				></ActivityIndicator>
				{/* <View style={{ position: "relative", height: vh(100) }}>
					<ImageBackground
						source={require("../images/blackownedbiz.gif")}
						style={styles.bg}
						imageStyle={{ resizeMode: "stretch" }}
					></ImageBackground>
				</View> */}
			</View>
		</KeyboardAvoidingView>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
})(NewListing);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		// height: vh(150),
		flexDirection: "column",
		backgroundColor: "black",
		// marginTop: vh(0.1),
		// top: offset,
		// marginBottom: 100,
	},
	bizCon: {
		position: "relative",
		width: vw(100),
		// height: vh(7.3),
		// height: vh(0),
		backgroundColor: "black",
		// bottom: vh(83),
		// borderTopWidth: 2.5,
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
		// backgroundColor: "lightslategray",
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
		// bottom: vh(1),
		// paddingTop: vh(5),
	},
	inputDash: {
		position: "absolute",
		flexDirection: "column",
		alignItems: "center",
		width: vw(100),
		// paddingBottom: vh(55),
		// paddingTop: vh(3.5),
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
		paddingVertical: vh(1),
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
	inner: {
		paddingBottom: vh(7.5),
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.94)",

		// flex: 1,
		// position: "absolute",
		// alignItems: "center",
		// justifyContent: "space-around",
		// backgroundColor: "red",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		isFetching: state.isFetching,
	};
}
