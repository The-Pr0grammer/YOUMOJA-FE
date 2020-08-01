import React from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";

class Sorter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sort: true,
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.sortBox1}>
					<Icon name="heart" type="feather" color="lightcoral" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.sortBox2}>
					<Icon name="clock" type="feather" color="lawngreen" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.sortBox3}>
					<Icon name="badge" type="simple-line-icon" color="gold" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.sortBox4}>
					<Icon
						name="location-arrow"
						type="font-awesome-5"
						color="red"
						size={32}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

export default connect(mapStateToProps)(Sorter);

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
		width: vw(25),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "khaki",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	sortBox2: {
		height: vh(7),
		width: vw(25),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	sortBox3: {
		height: vh(7),
		width: vw(25),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "crimson",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	sortBox4: {
		height: vh(7),
		width: vw(25),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "mediumspringgreen",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
	litBox4: {
		height: vh(7),
		width: vw(25),
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "gold",
		borderWidth: 2,
		borderBottomWidth: 5,
	},
});

function mapStateToProps(state) {
	return { category: state.category };
}
