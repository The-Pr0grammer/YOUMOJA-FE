import React from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import {
	sortByHeartsTogg,
	sortByBadgesTogg,
	sortByLocationTogg,
} from "../redux/actions/bizAction";

class LeaderBoard extends React.Component {
	render() {
		// console.log(this.props.LeaderBoards);
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>Leaderboard</Text>
			</View>
		);
	}
}

export default connect(mapStateToProps, {
	sortByHeartsTogg,
	sortByBadgesTogg,
	sortByLocationTogg,
})(LeaderBoard);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "silver",
		height: vh(100),
		width: vw(100),
		flexDirection: "row",
	},
	heading: {
		position: "relative",
		backgroundColor: "silver",
		height: vh(7),
		width: vw(100),
		color: "red",
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
	};
}
