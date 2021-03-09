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

const Header = (props) => {
	// console.log(props.lastScreen);

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
							} else if (props.lastScreen == "Blackboard") {
								props.navigation.navigate("Blackboard");
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

				<View
					style={{
						flex: 1,
						position: "relative",
						height: vh(10),
						// width: vw(20),
						// alignItems: "center",
						// justifyContent:"center",
						flexDirection: "column-reverse",
						// backgroundColor: "orange",
						// paddingRight: vw(15),
						// right: vw(5),
					}}
				>
					{!props.loading && (
						<TextTicker
							shouldAnimateTreshold={vw(2)}
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
								width: vw(50),
								lineHeight: vh(5),
							}}
						>
							{props.name}
						</TextTicker>
					)}
				</View>

				{/* <View
					style={{
						flex: 1,
						position: "relative",
						height: vh(10),
						alignItems: "center",
						flexDirection: "column-reverse",
						paddingHorizontal: vh(1),
						// backgroundColor: "orange",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontFamily: "Marker Felt",
							fontSize: 26,
							color: "olivedrab",
							// backgroundColor: "navy",
							paddingBottom: vw(2.5),
						}}
					>
						{props.name}
					</Text>
				</View> */}
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
		height: vh(10),
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
});

function mapStateToProps(state) {
	return {
		isFetching: state.isFetching,
	};
}
