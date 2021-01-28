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

import axios from "axios";

const BadgeShop = (props) => {
	return <View></View>;
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
	// profilePic: {
	// 	borderRadius: 82,
	// 	height: vh(25),
	// 	width: vw(45),
	// 	opacity: 1.0,
	// 	zIndex: 2,
	// 	top: vh(1),
	// },
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
	list: {
		position: "absolute",
		// marginTop: vh(21.8),
		height: vh(68.6),
		width: vw(100),
		// opacity: 1.0,
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
		userHeartBizs: state.userHearts.map((uh) => uh.user_biz),
		profileLoading: state.profileLoading,
		isFetching: state.isFetching,
		userBizs: state.userBizs,
		userHearts: state.userHearts,
	};
}
