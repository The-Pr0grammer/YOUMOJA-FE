import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
	View,
	SafeAreaView,
	Dimensions,
	StyleSheet,
	ImageBackground,
	Modal,
} from "react-native";
import { Icon, Text } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
// import { fetchBadgeSums } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";

import axios from "axios";

import { WebView } from "react-native-webview";

const Webview = (props) => {
	const navigation = useNavigation();

	console.log("uri is:", props.uri);
	return (
		<Modal>
			<View
				style={{
					// alignSelf: "stretch",
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<Header
					name={"Webview"}
					navigation={navigation}
					lastScreen={"Webview"}
					handleWebviewTogg={props.handleWebviewTogg}
					// loading={props.profileLoading}
				/>
				<WebView
					containerStyle={{
						flex: 1,
						// marginTop: vh(2),
						width: vw(100),
						height: vh(90),
					}}
					source={{ uri: props.uri }}
				/>
			</View>
		</Modal>
	);
};
export default connect(mapStateToProps, {})(Webview);

const styles = StyleSheet.create({});

function mapStateToProps(state) {
	return {
		// reduxState: state,
		// badgeSums: state.badgeSums,
	};
}
