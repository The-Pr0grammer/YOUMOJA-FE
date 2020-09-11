import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";

class Menu extends React.Component {
	render() {
		// console.log(this.props.category.length);
		return (
			<View
				style={{
					zIndex: 1,
					postion: "relative",
					justifyContent: "center",
					alignItems: "center",
					width: vw(100),
					display: "flex",
					flexDirection: "row",
					marginTop: vh(0.25),
				}}
			>
				<TouchableOpacity
					activeOpacity={!this.props.active ? 0.2 : 1}
					style={[
						!this.props.active ? styles.menuButton : styles.disabledButton,
					]}
					onPress={() => {
						!this.props.active && this.props.navigation.openDrawer();
					}}
				>
					<Icon
						name="menu"
						type="feather"
						color={!this.props.active ? "red" : "black"}
						size={34}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={!this.props.active ? 0.2 : 1}
					style={[
						!this.props.active ? styles.catButton : styles.activeCatButton,
						!this.props.active &&
							this.props.category.length > 0 &&
							styles.chosenCat,
					]}
					onPress={() => this.props.handleCatsTogg()}
				>
					<Text
						style={{
							textAlign: "center",
							width: vw(64),
							height: vh(5),
							fontSize: 22,
							lineHeight: vh(6),
							fontFamily: "Rockwell",
							// backgroundColor: "blue",
						}}
					>
						{this.props.category == "" ? "Categories" : this.props.category}
					</Text>
					<View
						style={{
							position: "relative",
							height: vh(7.5),
							width: vw(16),
							justifyContent: "center",
							alignItems: "center",
							alignSelf: "flex-start",
							// left: vw(2.5),
							// backgroundColor: "blue",
						}}
					>
						<Icon
							name="circledown"
							type="antdesign"
							color={!this.props.active ? "lightslategray" : "gold"}
							size={34}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
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
		backgroundColor: "darkslategray",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	catButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(86),
		backgroundColor: "maroon",
		flexDirection: "row",
		zIndex: 1,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	activeCatButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(86),
		backgroundColor: "crimson",
		flexDirection: "row",
		zIndex: 1,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	chosenCat: {
		position: "relative",
		height: vh(7.5),
		width: vw(86),
		backgroundColor: "crimson",
		flexDirection: "row",
		zIndex: 1,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return { category: state.category };
}
