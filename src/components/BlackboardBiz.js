import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Image } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import TextTicker from "react-native-text-ticker";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import {} from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";

import NumberFormat from "react-number-format";

const BlackboardBiz = (props) => {
	const navigation = useNavigation();

	useEffect(() => {
		return () => {};
	}, []);

	// console.log("TOP 25📈!!! SCRATCH THAT: BLACKBOARD 💯 WE MADE IT");
	// console.log("user img:", props.business.user_img_url);
	// console.log("rank:", props.rank);
	// console.log("business:", props.business);

	return (
		<View style={styles.container}>
			{/* <Text>Hello World</Text> */}
			<View
				style={{
					position: "absolute",
					// backgroundColor: "brown",
					width: vw(25),
					height: vh(9),
					alignSelf: "flex-end",
					borderWidth: 5,
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						textAlign: "center",
						fontFamily: "Marker Felt",
						color: "darkslategray",
					}}
				>
					🚀Total
				</Text>

				{/* <Text
					style={{
						textAlign: "center",
						fontFamily: "Marker Felt",
						color: "lime",
						// fontSize: 12,
					}}
				>
					${props.business.badges_sum}
				</Text> */}
				<View>
					<NumberFormat
						value={`${props.business.badges_sum}`}
						displayType={"text"}
						thousandSeparator={true}
						prefix={"$"}
						renderText={(formattedValue) => (
							<Text
								style={{
									textAlign: "center",
									fontFamily: "Verdana",
									color: "lime",
									fontSize: 8,
								}}
							>
								{formattedValue}
							</Text>
						)}
					/>
				</View>
			</View>
			<View style={styles.firstRow}>
				<View style={styles.rankView}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: "Marker Felt",
							color: "olivedrab",
							fontSize: 20,
							lineHeight: vh(5),
						}}
					>
						{props.rank}
					</Text>
				</View>
				<Text style={styles.bizName}>{props.business.business_name}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => {
						console.log(props.route.params.userInfo);
						props.navigation.navigate("PeerProfile", {
							prevScreen: "Blackboard",
							// userShowInfo: props.route.params.userInfo,
						});
					}}
				>
					<Image
						resizeMode={"cover"}
						source={{
							// uri: `http://192.168.1.211:3000/${props.business["user_img_url"]}`
							uri: props.business.user_img_url,
						}}
						style={styles.profilePic}
					></Image>
				</TouchableOpacity>
				<TextTicker
					style={styles.bizSumm}
					loop
					bounce
					repeatSpacer={vw(5)}
					duration={Math.random * 18000}
					marqueeDelay={Math.random() * 2000}
				>
					{props.business.business_summary}
				</TextTicker>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, {})(BlackboardBiz);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		height: vh(8),
		width: vw(100),
		flexDirection: "column",
		marginTop: vh(1),
		// alignItems: "center",
	},
	firstRow: { flexDirection: "row", alignItems: "flex-end" },
	rankView: {
		position: "relative",
		width: vw(9),
		height: vh(4),
		// backgroundColor: "red",
		// justifyContent: "center",
	},
	bizName: {
		position: "relative",
		// backgroundColor: "blue",
		color: "lightslategray",
		// height: vh(5.2),
		width: vw(70),
		fontFamily: "Marker Felt",
		fontWeight: "bold",
		fontSize: 20,
		// textAlign: "center",
		// borderWidth: 2,
		// borderBottomWidth: 0,
		// lineHeight: vh(3),
		justifyContent: "center",
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: 100,
		width: vw(9),
		height: undefined,
		aspectRatio: 135 / 135,
	},
	bizSumm: {
		fontSize: 16,
		color: "olivedrab",
		paddingHorizontal: vw(2),
		fontFamily: "Marker Felt",
		width: vw(65),
		// backgroundColor: "red",
		lineHeight: vh(3.75),
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
	};
}
