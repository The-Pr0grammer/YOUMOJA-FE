import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ActivityIndicator,
	Modal,
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
} from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
// import Header from "./Header.js";
// import ProfileStats from "./ProfileStats.js";
// import ProfileHearts from "./ProfileHearts.js";
// import MyBusinesses from "./MyBusinesses.js";
// import NewBusiness from "./NewBusiness";
// import SuccessModal from "./SuccessModal.js";

import IAP, {
	purchaseErrorListener,
	purchaseUpdatedListener,
} from "react-native-iap";

import axios from "axios";

const productIds = Platform.select({
	ios: [
		"com.greenrocket.id",
		"com.bluerocket.id",
		"com.redrocket.id",
		"com.ultravioletrocket.id",
		"com.goldrocket.id",
	],
	android: [""],
});

// const handleValidation = async (receipt) => {
// 	// console.log(receipt);

// 	let validation = await axios
// 		.post(`https://buy.itunes.apple.com/verifyReceipt`, {
// 			receipt,
// 		})
// 		.then((res) => {
// 			console.log(res.purchase);
// 		});

// 	// console.log("validation call response is...", validation);
// };

const BadgeShop = (props) => {
	const [badges, setBadges] = useState([]);
	const [colorChosen, setColorChosen] = useState("");
	const [price, setPrice] = useState(0);
	const [loading, setLoading] = useState(true);
	const [purchaseFlow, setPurchaseFlow] = useState(false);
	const colors = ["green", "blue", "firebrick", "slateblue", "gold"];
	let colorItr = -1;

	useEffect(() => {
		// console.log("Welcome to the badge shop");
		setTimeout(() => {
			setLoading(false);
			// console.log("LOADING FLAG BEING SET TO FALSE");
		}, 5225);
		IAP.clearTransactionIOS();
		IAP.initConnection()
			.catch(() => {
				console.log("error connecting to store 🅧");
			})
			.then(() => {
				// console.log("coNNeCtInG 📶✅");
				IAP.getProducts(productIds)
					.catch(() => {
						console.log("error finding purchases 😬");
					})
					.then((res) => {
						let sorted = res.sort((a, b) =>
							parseFloat(a.price) > parseFloat(b.price) ? 1 : -1
						);
						setBadges(sorted);
					});
			});

		const purchaseUpdateSubscription = IAP.purchaseUpdatedListener(
			(purchase) => {
				const receipt = purchase.transactionReceipt;

				if (receipt) {
					IAP.finishTransaction(purchase);
					console.log("hey! here's your receipt🧾", receipt);
					// console.log("PURCHASE DATA🚀:::", purchase);

					//call to backend
					// setStopDupe(true);
					handleCreate(receipt);

					// handleValidation(receipt);
				} else {
					console.log("no receipt");
					//throw error
				}
			}
		);

		const purchaseErrorSubscription = IAP.purchaseErrorListener((error) => {
			setPurchaseFlow(false);
			console.log("PURCHASE LISTENER ERROR:", error);
		});

		return () => {
			purchaseUpdateSubscription.remove();
			purchaseErrorSubscription.remove();
		};
	}, []);

	// handlePurchase = (key) => {};

	handleCreate = (receipt) => {
		console.log("price is :", price);
		const data = {
			color: colorChosen,
			user_id: props.userInfo.id,
			business_id: props.biz.business.id,
			price: price,
			receipt: receipt,
		};

		axios
			.post(`http://192.168.1.211:3000/badges`, {
				badge: data,
			})
			.then(async (res) => {
				console.log("BACK FROM THE BACKEND ::: badge was created ?");
				// await props.fetchBizs();

				props.handleShopTogg();
			});
	};

	console.log("PRODUCTS(BADGES) ARE...", badges);
	// console.log("🏬BIIIZ IS:::", props.biz.business.name);
	// console.log("Color Chosen🎨:", colorChosen);
	// console.log("PRICE 💲:", price);
	console.log("key🔑", props.badgeKeyPressed);

	return (
		<Modal>
			<View style={styles.container}>
				<View style={styles.backButtonView}>
					<TouchableOpacity
						onPress={() => {
							props.handleShopTogg();
						}}
					>
						<Icon
							name="closecircle"
							type="ant-design"
							color="black"
							size={45}
							reverse
							reverseColor="brown"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.headingView}>
					<Text style={styles.heading}>Boost This</Text>
					<Text style={styles.heading}>Business</Text>
					<Text style={styles.bizName}>"{props.biz.business.name}"</Text>
				</View>
				<View style={styles.listView}>
					{!loading ? (
						badges.map((badge, key = index) => {
							colorItr++;
							return (
								<TouchableOpacity
									key={key}
									style={styles.badge}
									onPress={() => {
										IAP.requestPurchase(badge.productId);

										setPrice(badge.price);

										switch (badge.productId) {
											case "com.greenrocket.id":
												setColorChosen("green");
												break;
											case "com.bluerocket.id":
												setColorChosen("blue");
												break;
											case "com.redrocket.id":
												setColorChosen("red");
												break;
											case "com.ultravioletrocket.id":
												setColorChosen("ultraviolet");
												break;
											case "com.goldrocket.id":
												setColorChosen("gold");
												break;
											default:
												break;
										}

										setPurchaseFlow(true);
									}}
								>
									<Icon
										name="rocket1"
										type="ant-design"
										color={colors[colorItr]}
										size={72}
										// reverse
										// reverseColor="lawngreen"
									/>
									<Text style={styles.price}>${badge.price}</Text>
								</TouchableOpacity>
							);
						})
					) : (
						<View
							style={{
								position: "relative",
								height: vh(5),
								marginTop: vh(5),
							}}
						>
							<TouchableWithoutFeedback
								onPress={() => {
									setLoading(false);
								}}
							>
								<ImageBackground
									source={require("../images/rocketgif.gif")}
									style={styles.bg}
									imageStyle={{ resizeMode: "stretch" }}
								></ImageBackground>
							</TouchableWithoutFeedback>
						</View>
					)}
					{purchaseFlow && (
						<View style={styles.activityView}>
							<ActivityIndicator
								size="large"
								color="#00ff00"
								hidesWhenStopped={true}
							/>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
	profileLoadingTogg,
	fetchBizs,
})(function (props) {
	const isFocused = useIsFocused();

	return <BadgeShop {...props} isFocused={isFocused} />;
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "black",
		// marginTop: vh(10),
	},

	backButtonView: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "brown",
		alignItems: "center",
		marginTop: vh(6),
		justifyContent: "center",
		alignSelf: "flex-end",
		opacity: 0.9,
	},
	headingView: {
		position: "relative",

		height: vh(12),
		width: vw(100),
		// backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
	},
	heading: {
		fontFamily: "Chalkduster",
		fontSize: 36,
		color: "crimson",
		// marginTop: vh(1),
	},
	bizName: {
		position: "relative",
		backgroundColor: "black",
		color: "lightslategray",
		height: vh(5.2),
		fontFamily: "Marker Felt",
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		borderWidth: 2,
		borderBottomWidth: 0,
		lineHeight: vh(4.5),
		justifyContent: "center",
	},
	listView: {
		position: "relative",
		height: vh(70),
		width: vw(100),
		flexDirection: "column",

		// backgroundColor: "blue",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		// opacity: 0.1,
	},
	badge: {
		position: "relative",
		// width: vw(20),
		flex: 1,
		// height: vh(10),
		// backgroundColor: "magenta",
		flexDirection: "row",
		opacity: 1.0,
		// justifyContent: "center",
		alignItems: "center",
	},
	price: { fontFamily: "Marker Felt", color: "olivedrab", fontSize: 54 },
	bg: {
		// position: "absolute",
		// marginTop: vh(5),
		resizeMode: "stretch",
		opacity: 0.75,
		borderWidth: 0,
		width: vw(100),
		height: vh(60),
		justifyContent: "center",
	},
	activityView: {
		flex: 1,
		width: vw(100),
		height: vh(70),
		marginTop: vh(0.5),
		position: "absolute",
		backgroundColor: "black",
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		userHeartBizs: state.userHearts.map((uh) => uh.user_biz),
		profileLoading: state.profileLoading,
		isFetching: state.isFetching,
		userBizs: state.userBizs,
		userHearts: state.userHearts,
	};
}
