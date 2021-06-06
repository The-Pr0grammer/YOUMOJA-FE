import React from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import {
	sortByHeartsTogg,
	sortByBadgesTogg,
	sortByLocationTogg,
	fetchBadgeSums,
} from "../redux/actions/bizAction";

class Sorter extends React.Component {
	render() {
		// console.log(this.props.sorters);
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						if (this.props.sorters.badgesSort) {
							this.props.sortByBadgesTogg();
						}
						if (this.props.sorters.locationSort) {
							this.props.sortByLocationTogg();
						}
						this.props.sortByHeartsTogg();
					}}
					style={[
						this.props.sorters.heartsSort ? styles.litBox : styles.sortBox1,
					]}
				>
					<Icon name="heart" type="antdesign" color="lightcoral" size={32} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						if (this.props.sorters.badgesSort) {
							this.props.sortByBadgesTogg();
						}
						if (this.props.sorters.heartsSort) {
							this.props.sortByHeartsTogg();
						}
						this.props.sortByLocationTogg();
					}}
					style={[
						this.props.sorters.locationSort ? styles.litBox : styles.sortBox2,
					]}
				>
					<Icon
						name="location-arrow"
						type="font-awesome-5"
						color="dodgerblue"
						size={32}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.fetchBadgeSums();

						if (this.props.sorters.locationSort) {
							this.props.sortByLocationTogg();
						}
						if (this.props.sorters.heartsSort) {
							this.props.sortByHeartsTogg();
						}
						this.props.sortByBadgesTogg();
					}}
					style={[
						this.props.sorters.badgesSort ? styles.litBox : styles.sortBox3,
					]}
				>
					<Icon name="rocket1" type="ant-design" color="darkcyan" size={42} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default connect(mapStateToProps, {
	sortByHeartsTogg,
	sortByBadgesTogg,
	sortByLocationTogg,
	fetchBadgeSums,
})(Sorter);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "silver",
		height: vh(7),
		width: vw(100),
		flexDirection: "row",
	},
	sortBox1: {
		height: vh(7),
		width: vw(33.33),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "crimson",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	sortBox2: {
		height: vh(7),
		width: vw(33.33),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	sortBox3: {
		height: vh(7),
		width: vw(33.33),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "mediumspringgreen",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	litBox: {
		height: vh(7),
		width: vw(33.33),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "gold",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
});

function mapStateToProps(state) {
	return {
		sorters: {
			heartsSort: state.heartsSort,
			badgesSort: state.badgesSort,
			locationSort: state.locationSort,
		},
	};
}
