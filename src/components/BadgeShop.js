import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
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

const purchaseUpdateSubscription = IAP.purchaseUpdatedListener((purchase) => {
	const receipt = purchase.transactionReceipt;
	
	if (receipt) {
		IAP.finishTransaction(purchase);
		console.log("hey! here's your receipt🧾", receipt);
		//call to backend

		// handleValidation(receipt);
	} else {
		console.log("no receipt");
		//throw error
	}
	// const clear = IAP.clearTransactionIOS();

});

const purchaseErrorSubscription = IAP.purchaseErrorListener((error) => {
	console.log("applying error listener");
	console.log(error);
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
	const colors = ["green", "blue", "firebrick", "slateblue", "gold"];
	let colorItr = -1;

	useEffect(() => {
		IAP.initConnection()
			.catch(() => {
				console.log("error connecting to store 🅧");
			})
			.then(() => {
				console.log("coNNeCtInG 📶✅");
				IAP.getProducts(productIds)
					.catch(() => {
						console.log("error finding purchases 😬");
					})
					.then((res) => {
						setBadges(res);
					});
			});

		return () => {
			purchaseUpdateSubscription.remove();
			purchaseErrorSubscription.remove();
		};
	}, []);

	console.log("PRODUCTS(BADGES) ARE...", badges[0]);

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
					<Text style={styles.heading}>Business🚀</Text>
				</View>
				<View style={styles.listView}>
					{badges
						.sort((a, b) => {
							if (parseInt(a.price) < parseInt(b.price)) return -1;
							if (parseInt(a.price) > parseInt(b.price)) return 1;
							return 0;
						})
						.map((badge, key = index) => {
							colorItr++;
							return (
								<TouchableOpacity
									key={key}
									style={styles.badge}
									onPress={() => {
										IAP.requestPurchase(badge.productId);
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
						})}
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
	listView: {
		position: "relative",
		height: vh(70),
		width: vw(100),
		flexDirection: "column",

		// backgroundColor: "blue",
		justifyContent: "flex-start",
		alignItems: "flex-start",
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
		userHeartBizs: state.userHearts.map((uh) => uh.user_biz),
		profileLoading: state.profileLoading,
		isFetching: state.isFetching,
		userBizs: state.userBizs,
		userHearts: state.userHearts,
	};
}
