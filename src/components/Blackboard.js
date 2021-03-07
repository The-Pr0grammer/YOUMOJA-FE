import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
	View,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
	ScrollView,
} from "react-native";
import { Icon, Text } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import { fetchBadgeSums } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import BlackboardBiz from "./BlackboardBiz.js";

import axios from "axios";

const Blackboard = (props) => {
	const navigation = useNavigation();
	// const [businessesArr, setBusinessesArr] = useState([]);
	let rankItr = 0;

	// useEffect(() => {
	// 	props.fetchBadgeSums();
	// 	// return () => {};
	// }, []);

	useFocusEffect(
		React.useCallback(() => {
			console.log("focused and fetching");
			props.fetchBadgeSums();

			//   return () => unsubscribe();
		}, [])
	);
	// console.log("TOP 25📈!!! SCRATCH THAT: BLACKBOARD 💯 WE MADE IT");
	// console.log("businesesses array from the BLACKBOARD", businessesArr);

	return (
		<View style={styles.container}>
			<Header
				name={"Blackboard"}
				navigation={navigation}
				// loading={props.profileLoading}
			/>
			<ScrollView scrollIndicatorInsets={{ right: 1 }}>
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
				{props.badge_sums.map((business, index) => {
					rankItr++;
					return (
						<BlackboardBiz key={index} business={business} rank={rankItr} />
					);
				})}
			</ScrollView>
			<View
				style={{
					flex: 1,
					position: "absolute",
					height: vh(200),
					width: vw(100),
					// justifyContent: "center",
					backgroundColor: "rgba(0,0,0,0.9)",
					zIndex: -2,
				}}
			>
				<ImageBackground
					source={require("../images/arrowRising.gif")}
					style={styles.bg}
					imageStyle={{ resizeMode: "stretch" }}
				></ImageBackground>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, { fetchBadgeSums })(Blackboard);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		height: vh(100),
		width: vw(100),
		flexDirection: "column",
		// alignItems: "center",
	},
	bg: {
		// position: "absolute",
		// resizeMode: "repeat",
		opacity: 0.3,
		borderWidth: 0,
		width: vw(120),
		height: vh(99),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		badge_sums: state.badge_sums,
	};
}
