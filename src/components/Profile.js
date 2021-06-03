import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import {
	setUserInfo,
	setIsFetching,
	profileLoadingTogg,
	fetchBizs,
	setUserListings,
	setUserHearts,
} from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import ProfileCard from "./ProfileCard.js";
import ProfileHearts from "./ProfileHearts.js";
import MyListings from "./MyListings.js";
import NewListing from "./NewListing";
import SuccessModal from "./SuccessModal.js";
import BadgeShop from "./BadgeShop.js";
import EmailConfirmation from "./EmailConfirmation.js";

import * as RNIap from "react-native-iap";
import axios from "axios";

const Profile = (props) => {
	const [loading, setLoading] = useState(true);
	const [addBusinessTogg, setAddBusinessTogg] = useState(false);
	const [posted, setPosted] = useState(false);
	const [imgSaved, setImgSaved] = useState(false);
	const [infoSaved, setInfoSaved] = useState(false);
	const [credsSaved, setCredsSaved] = useState(false);
	const [shopTogg, setShopTogg] = useState(false);
	const [badgeKeyPressed, setBadgeKeyPressed] = useState(null);
	const [shopBiz, setShopBiz] = useState(null);
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	// const [active, toggleActive] = useState("");
	// const [userShow, setUserShow] = useState("");
	// const [editTogg, setEditTogg] = useState(false);
	// const lastScreen = "Home";

	// console.log(navigation);
	// console.log(props.route);
	// console.log(navigation.dangerouslyGetState());
	// console.log(parent);

	useEffect(() => {
		// console.log(navigation.dangerouslyGetState().index);

		!addBusinessTogg && props.setIsFetching(true);
		setTimeout(() => props.setIsFetching(false), 750);
		apiCalls();

		// if (!userShow) {
		// 	apiCalls();
		// }
	}, [isFocused]);

	// getHearts = async () => {
	// 	console.log("♥️ fetching hearts 🦴🦴🦴");
	// 	let response3 = await axios(
	// 		`http://192.168.1.211:3000/users/${props.userInfo.id}/hearts`
	// 	)
	// 		.then((resp) => {
	// 			props.setUserHearts(resp.data);
	// 		})
	// 		.catch((error) => console.log(error));
	// };

	getHearts = () => {
		console.log("♥️ fetching hearts 🦴🦴🦴");
		let response3 = axios(
			`http://192.168.1.211:3000/users/${props.userInfo.id}/hearts`
		)
			.then((resp) => {
				props.setUserHearts(resp.data);
			})
			.catch((error) => console.log(error));
	};

	getListings = () => {
		console.log("♥️ fetching listings 📰 📰 📰");
		let response2 = axios(
			`http://192.168.1.211:3000/users/${props.userInfo.id}/listings`
		)
			.then((resp) => {
				props.setUserListings(resp.data);
			})
			.catch((error) => console.log(error));
	};

	apiCalls = () => {
		let response1 = axios(
			`http://192.168.1.211:3000/users/${props.userInfo.id}`
		)
			.then((resp) => {
				props.setUserInfo(resp.data);
				setUserShow(resp.data);
			})
			.catch((error) => console.log(error));

		let response2 = axios(
			`http://192.168.1.211:3000/users/${props.userInfo.id}/listings`
		)
			.then((resp) => {
				props.setUserListings(resp.data);
			})
			.catch((error) => console.log(error));

		let response3 = axios(
			`http://192.168.1.211:3000/users/${props.userInfo.id}/hearts`
		)
			.then((resp) => {
				props.setUserHearts(resp.data);
			})
			.catch((error) => console.log(error));
	};

	handleAddBusinessTogg = () => {
		setAddBusinessTogg(!addBusinessTogg);
	};

	handleSuccess = (type) => {
		if (type === "business") {
			setTimeout(() => {
				setPosted(true);
				props.fetchBizs();
			}, 1000);
		} else if (type === "profilePic") {
			setTimeout(() => {
				setImgSaved(true);
				axios(`http://192.168.1.211:3000/users/${props.userInfo.id}`)
					.then((resp) => {
						props.setUserInfo(resp.data);
						setUserShow(resp.data);
					})
					.catch((error) => console.log(error));
			}, 250);
		} else if (type === "info") {
			setTimeout(() => {
				setInfoSaved(true);
				axios(`http://192.168.1.211:3000/users/${props.userInfo.id}`)
					.then((resp) => {
						props.setUserInfo(resp.data);
						setUserShow(resp.data);
					})
					.catch((error) => console.log(error));
			}, 250);
		} else if (type === "creds") {
			setTimeout(() => {
				setCredsSaved(true);
				axios(`http://192.168.1.211:3000/users/${props.userInfo.id}`)
					.then((resp) => {
						props.setUserInfo(resp.data);
						setUserShow(resp.data);
					})
					.catch((error) => console.log(error));
			}, 250);
		}
	};

	handleClose = (type) => {
		if (type === "business") {
			setTimeout(() => {
				setPosted(false);
			}, 6400);
		} else if (type === "profilePic") {
			setTimeout(() => {
				setImgSaved(false);
			}, 3200);
		} else if (type === "info") {
			setTimeout(() => {
				setInfoSaved(false);
			}, 3200);
		} else if (type === "creds") {
			setTimeout(() => {
				setCredsSaved(false);
			}, 3200);
		}
	};

	handleDismiss = () => {
		setPosted(false);
		setImgSaved(false);
		setInfoSaved(false);
		setCredsSaved(false);
	};

	getLastScreen = () => {
		if (props.route.params) {
			// console.log(
			// 	"props.route.params.lastScreen",
			// 	props.route.params.lastScreen
			// );
			return props.route.params.lastScreen;
		} else {
			return "Home";
		}
	};

	handleShopTogg = async (shopBiz, badgeKey) => {
		// console.log("handleShopTogg shopBiz🛍", shopBiz);
		// console.log("handleShopTogg badgeKey🛍", badgeKey);

		RNIap.clearTransactionIOS();
		
		getListings();
		getHearts();

		setShopTogg(!shopTogg);
		setShopBiz(shopBiz);
		setBadgeKeyPressed(badgeKey);
	};

	// console.log("userSHOW IS 🐛✋🏾", userShow);
	// console.log("♻️", loading);
	// console.log("userinfo:::::", props.userInfo);
	// console.log("NEW BIZ TOGG IS 🆕:::::", addBusinessTogg);
	// console.log(
	// 	"listings ARE:::::",
	// 	props.userListings.length > 0 && props.userListings[0].business.hearts
	// );
	// console.log("EMAIL CONFIRMATION IS ON LINE 243");
	// console.log(
	// 	"🔙 🔙 🔙LAST SCREEN FROM HEADER PIC TOUCHABLE",
	// 	props.route.params.lastScreen
	// );
	// console.log("🔙 🔙 🔙props.params", props.route);

	return (
		<View style={styles.container}>
			{/* {isFocused && addBusinessTogg && setVisibility(true)} */}
			<Header
				name={props.userInfo.name}
				navigation={navigation}
				refresh={true}
				lastScreen={getLastScreen()}
				// lastScreen={"Home"}
				// loading={props.profileLoading}
			/>

			<View
				style={{
					zIndex: 2,
					postion: "relative",
					justifyContent: "center",
					alignItems: "center",
					width: vw(100),
					display: "flex",
					flexDirection: "row",
					marginTop: vh(0.25),
					backgroundColor: "black",
				}}
			>
				<TextTicker
					bounce={true}
					style={{
						textAlign: "center",
						flex: 1,
						fontWeight: "bold",
						fontFamily: "Marker Felt",
						fontSize: 18,
						color: "olivedrab",
						backgroundColor: "black",
						paddingVertical: vh(3),
						// width: vw(35),
					}}
				>
					{props.userInfo.username}
				</TextTicker>
			</View>

			<View
				style={{
					flex: 1,
					backgroundColor: "black",
					flexDirection: "column",
					zIndex: 1,
				}}
			>
				<ProfileCard
					userShow={props.userInfo}
					handleSuccess={handleSuccess}
					handleClose={handleClose}
					handleDismiss={handleDismiss}
					//PROFILE CARD 📇
				/>

				<ScrollView
					indicatorStyle={"white"}
					scrollIndicatorInsets={{ top: 0, left: vw(10), bottom: 0, right: 0 }}
					contentContainerStyle={{ paddingBottom: vh(5) }}
					style={{
						flex: 1,
						backgroundColor: "black",
						flexDirection: "column",
						zIndex: 1,
					}}
				>
					{!props.isFetching && !addBusinessTogg && (
						<>
							{props.userListings.length > 0 && (
								<MyListings
									userId={props.userInfo.id}
									handleAddBusinessTogg={handleAddBusinessTogg}
									loading={loading}
									getHearts={getHearts}
									handleShopTogg={handleShopTogg}
								/>
							)}
						</>
					)}

					{!props.isFetching && !addBusinessTogg && (
						<>
							{props.heartIds.length > 0 && (
								<ProfileHearts
									userId={props.userInfo.id}
									loading={loading}
									getHearts={getHearts}
									getListings={getListings}
									handleShopTogg={handleShopTogg}
								/>
							)}
						</>
					)}

					{
						addBusinessTogg && (
							<NewListing
								handleAddBusinessTogg={handleAddBusinessTogg}
								handleSuccess={handleSuccess}
								handleClose={handleClose}
								handleDismiss={handleDismiss}
							/>
						) //NEW BUSINESS
					}

					{posted && (
						<SuccessModal
							handleDismiss={this.handleDismiss}
							message={"Your business has been listed✅"}
						/>
					)}

					{/* REMEBER TO UNCOMMENT💯💯💯💯💯💯💯💯💯💯💯💯💯💯 */}
					{/* {!props.userInfo.email_verified && (
					<EmailConfirmation
						animationType="fade"
						transparent={true}
						visible={true}
						purpose="Reverify"
						///EMAIL CONFIRMATIONNNNNNNNNNNNN
					/>
				)} */}
					{/* REMEBER TO UNCOMMENT💯💯💯💯💯💯💯💯💯💯💯💯💯💯 */}

					{(imgSaved || infoSaved || credsSaved) && (
						<SuccessModal
							handleDismiss={this.handleDismiss}
							message={
								imgSaved
									? "You updated your profile pic✅"
									: "Your changes were saved✅"
							}
						/>
					)}

					{/* {imgSaved && (
					<SuccessModal
						handleDismiss={this.handleDismiss}
						message={"Your changes were saved✅"}
					/>
				)}

				{infoSaved && (
					<SuccessModal
						handleDismiss={this.handleDismiss}
						message={"Your changes were saved✅"}
					/>
				)}

				{credsSaved && (
					<SuccessModal
						handleDismiss={this.handleDismiss}
						message={"Your changes were saved✅"}
					/>
				)} */}

					{props.isFetching && (
						<View
							style={{
								// flex: 1,
								// height: vh(100),
								width: vw(100),
								justifyContent: "center",
								backgroundColor: "rgba(0,0,0,0.9)",
							}}
						>
							<ActivityIndicator
								size="large"
								color="lime"
								hidesWhenStopped={true}
								style={{
									top: vh(22),
								}}
							></ActivityIndicator>
							<View style={{ position: "relative", height: vh(5) }}>
								<ImageBackground
									source={require("../images/BlackLivesMatter.gif")}
									style={styles.bg}
									imageStyle={{ resizeMode: "stretch" }}
								></ImageBackground>
							</View>
						</View>
					)}
				</ScrollView>
			</View>
			{shopTogg && (
				<BadgeShop
					ubiz={shopBiz}
					handleShopTogg={handleShopTogg}
					badgeKeyPressed={badgeKeyPressed}
				/>
			)}
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
	profileLoadingTogg,
	fetchBizs,
	setUserListings,
	setUserHearts,
})(function (props) {
	const isFocused = useIsFocused();

	return <Profile {...props} isFocused={isFocused} />;
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// marginTop: vh(10),
	},

	menuButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "brown",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	disabledButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "lavender",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	bg: {
		// position: "absolute",
		resizeMode: "stretch",
		opacity: 0.2,
		borderWidth: 0,
		width: vw(100),
		height: vh(40),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		profileLoading: state.profileLoading,
		isFetching: state.isFetching,
		userListings: state.userListings,
		heartIds: state.userInfo.heart_ids,
	};
}
