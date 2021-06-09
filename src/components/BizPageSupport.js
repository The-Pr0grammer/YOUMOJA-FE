import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
	ScrollView,
	Vibration,
	FlatList,
} from "react-native";
import { Icon, Badge } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import axios from "axios";

const BizPageSupport = (props) => {
	// const [badgeCounts, setBadgeCounts] = useState(
	// 	props.ubiz.business.badge_counts
	// );
	const [badgeKeyPressed, setBadgeKeyPressed] = useState("");
	const colors = ["green", "blue", "firebrick", "slateblue", "gold"];
	const trueColors = ["green", "blue", "red", "ultraviolet", "gold"];
	let colorItr = -1;

	const numFormat = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
	};

	console.log(
		"BIZPAGE SUPPORT UBIZ:",
		JSON.stringify(props.ubiz.business.badge_counts)
	);

	// console.log("bps::🚀 ⓵ ② ③", badgeCounts);
	console.log("ca💲h app:::", props.ubiz.business.cashapp);

	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={{
						borderColor: "black",
						// backgroundColor: "salmon",
						bottom: vh(0.5),
						alignItems: "center",
						justifyContent: "center",
						width: vw(32),
						height: vh(8),
					}}
					onPress={() => {
						Linking.openURL("https://cash.app/$Issagoattt");
					}}
				>
					<Icon
						name="donate"
						type="font-awesome-5"
						color="green"
						size={30}
						// reverse
						// reverseColor="lawngreen"
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				style={{
					position: "relative",
					alignSelf: "flex-end",
					backgroundColor: "maroon",
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					height: vh(8),
					width: vw(66),
					borderBottomWidth: 1,
					opacity: props.purpose == "NewListing" ? 0.1 : 1,
				}}
				contentContainerStyle={{
					position: "relative",
					height: vh(8),
					paddingTop: vw(1),
					paddingRight: vw(2),
					// bottom: vh(0.75),
					// paddingLeft: vw(4),
				}}
				automaticallyAdjustInsets={false}
				horizontal={true}
				scrollEnabled={true}
				extraData={props.userHearts}

				// pagingEnabled={true}
				// decelerationRate={2.998}
				// snapToAlignment={"center"}
				// snapToIntervreverseCl={33}
				// scrollEventThrottle={1}
			>
				{colors.map((color, key = index) => {
					// let badgeObj = badgeCounts.find(
					// 	(badgeObj) => badgeObj.color == trueColors[colorItr]
					// );
					// console.log("badge counts search",trueColors[colorItr] in badgeCounts);
					colorItr++;

					return (
						<TouchableOpacity
							key={key}
							style={styles.badge}
							list
							onPress={() => {
								// IAP.requestPurchase(badge.productId);
								// console.log("color key🔑🚀:", key);

								setBadgeKeyPressed(key);
								Vibration.vibrate();
								props.handleShopTogg(props.ubiz, key);
							}}
						>
							<Icon
								name="rocket1"
								type="ant-design"
								color={color}
								size={45}
								// reverse
								// reverseColor="lawngreen"
								// style={[colorItr == 0 ? { marginRight: vw(1) } : {}]}
							/>

							{trueColors[colorItr] in props.ubiz.business.badge_counts && (
								<Badge
									value={numFormat(
										props.ubiz.business.badge_counts[trueColors[colorItr]]
									)}
									status="success"
									containerStyle={[
										colorItr == 0 ? styles.greenBadgeInd : styles.badgeInd,
									]}
								/>
							)}
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default BizPageSupport;

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderBottomColor: "black",
		width: vw(100),
		position: "relative",
		backgroundColor: "black",
	},
	badge: {
		height: vh(8),
		width: vw(22),
		// paddingHorizontal: vw(),
		// marginRight: vw(1),
		paddingRight: vw(5),
		justifyContent: "center",
	},
	greenBadgeInd: {
		position: "absolute",
		bottom: vh(1),
		left: vw(11),
	},
	badgeInd: { position: "absolute", bottom: vh(1), left: vw(11) },
});
