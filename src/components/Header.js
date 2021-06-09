import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import TextTicker from "react-native-text-ticker";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import {
	setUserInfo,
	setIsFetching,
	handleRefresh,
	fetchBizs,
	profileLoadingTogg,
} from "../redux/actions/bizAction";

import { useNavigation } from "@react-navigation/native";

import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = (props) => {
	const navigation = useNavigation();
	const activeScreen = props.activeScreen;

	// console.log("HEADER NAME", props.name);
	// console.log("USER NAME", props.userInfo.name);
	// console.log("BIZ TOGG", props.addBusinessTogg);
	// console.log("active screen", props.activeScreen);

	return (
		<View
			style={[
				props.type == "Search" ? styles.searchContainer : styles.container,
			]}
		>
			<View
				style={{
					position: "relative",
					flex: 1,
					height: vh(100),
					width: vw(100),
					justifyContent: "center",
					flexDirection: "row",
				}}
			>
				{props.purpose == "Home" ? null : (
					<View
						style={{
							position: "relative",
							height: vh(10),
							width: vw(16),
							alignItems: "center",
							flexDirection: "row-reverse",
							// paddingLeft: vh(1),
							// backgroundColor: "salmon",
						}}
					>
						<Button
							containerStyle={{
								top: vh(2),
								width: vw(22),
								zIndex: 2,
								paddingLeft: vw(5),
							}}
							icon={<Icon name="angle-left" size={40} color="black" />}
							type="clear"
							onPress={() => {
								if (props.lastScreen == "MyBusinesses") {
									props.handleAddBusinessTogg();
								} else if (props.lastScreen == "Home") {
									props.navigation.reset({
										index: 0,
										routes: [{ name: "Home" }],
									});
								} else if (props.activeScreen == "Blackboard") {
									console.log(
										"props.activeScreen was => \n 🖤💯",
										props.activeScreen
									);

									props.navigation.goBack();
								} else if (props.lastScreen == "Blackboard") {
									console.log("props.lastScreen 📺", props.lastScreen);
									props.navigation.reset({
										index: 0,
										routes: [{ name: "Home" }],
									});
									props.navigation.navigate("Blackboard");
								} else if (props.lastScreen == "Webview") {
									props.handleWebviewTogg();
								} else {
									props.refresh && props.handleRefresh();
									props.lastScreen == "Profile" &&
										props.navigation.navigate("Profile");
									props.profileLoadingTogg(true);
									props.navigation.goBack();
									props.setIsFetching(true);
									props.fetchBizs();
									// setTimeout(() => {
									// 	props.setIsFetching(false);
									// }, 100);
								}
							}}
							titleStyle={{
								color: "olivedrab",
								paddingLeft: vw(2),
								fontFamily: "ArialHebrew-Light",
								fontSize: 17,
							}}
						/>
					</View>
				)}
				<View
					style={{
						flex: 1,
						position: "relative",
						flexDirection: "row",
						height: vh(9.8),
						// width: vw(100),
						// alignItems: "center",
						// justifyContent:"center",
						// backgroundColor: "orange",
						// paddingRight: vw(15),
						// right: vw(5),
					}}
				>
					{props.purpose == "Home" ? (
						<Text
							shouldAnimateTreshold={vw(1)}
							duration={6400}
							loop
							bounce
							repeatSpacer={32}
							// marqueeDelay={3200}
							// bouncePadding={{ right: 25 }}
							style={{
								textAlign: "center",
								// flex: 1,
								fontWeight: "bold",
								fontFamily: "Marker Felt",
								fontSize: 22,
								color: "olivedrab",
								// backgroundColor: "navy",
								paddingVertical: vh(4.5),
								// marginLeft: vh(16),

								width: vw(100),
								lineHeight: vh(5),
							}}
						>
							{props.name}
						</Text>
					) : (
						<TextTicker
							shouldAnimateTreshold={vw(1)}
							duration={6400}
							loop
							bounce
							repeatSpacer={32}
							// marqueeDelay={3200}
							// bouncePadding={{ right: 25 }}
							style={{
								textAlign: "center",
								flex: 1,
								fontWeight: "bold",
								fontFamily: "Marker Felt",
								fontSize: 22,
								color: "olivedrab",
								// backgroundColor: "navy",
								paddingVertical: vh(4.5),
								width: vw(84),
								lineHeight: vh(5),
							}}
						>
							{props.name}
						</TextTicker>
					)}
				</View>
				<TouchableOpacity
					activeOpacity={props.name == props.userInfo.name ? 1 : 0.5}
					onPress={() => {
						props.addBusinessTogg && props.handleAddBusinessTogg();

						// props.navigation.reset({
						// 	index: 1,
						// 	routes: [{ name: props.lastScreen }],
						// });

						navigation.navigate("DrawerNav", {
							screen: "Profile",
							params: { lastScreen: activeScreen },
						});
					}}
				>
					<View
						style={{
							// position: "absolute",
							alignSelf: "flex-end",
							height: vh(9.8),
							width: vw(22),

							// flex: 1,
							// flexDirection: "row-reverse",
							// justifyContent:"center",
							// backgroundColor: "orange",
							// paddingRight: vw(15),
							// right: vw(5),
							// zIndex: 5,
						}}
					>
						<FastImage
							resizeMode={"cover"}
							source={{
								uri: props.userInfo.image
									? `http://192.168.1.211:3000/${props.userInfo.image}`
									: props.userInfo.img_url,
							}}
							style={{
								...styles.profilePic,
							}}
						></FastImage>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, {
	setIsFetching,
	handleRefresh,
	fetchBizs,
	profileLoadingTogg,
})(Header);

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		position: "relative",
		height: vh(9.8),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "darkslategray",
		shadowColor: "transparent",
		zIndex: 1,
		// bottom: vh(10),
	},
	searchContainer: {
		// flex: 1,
		position: "relative",
		height: vh(9.6),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "darkslategray",
		shadowColor: "transparent",
		zIndex: 1,
		// bottom: vh(10),
	},
	profilePic: {
		// position: "absolute",
		position: "relative",
		borderRadius: vw(100),
		width: vw(11),
		alignSelf: "center",
		// marginBottom: vh(1.5),
		// marginRight: vw(4.5),
		top: vh(4.2),
		height: undefined,
		aspectRatio: 85 / 80,
		zIndex: 2,
		// aspectRatio: 135 / 128,
	},
});

function mapStateToProps(state) {
	return {
		isFetching: state.isFetching,
		userInfo: state.userInfo,
	};
}
