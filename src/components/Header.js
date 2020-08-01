import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";

class Header extends React.Component {
	render() {
		// console.log(this.props.category);
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
					style={{
						position: "relative",
						height: vh(7.5),
						width: vw(16),
						backgroundColor: "brown",
						zIndex: 2,
						opacity: 0.9,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						this.props.navigation.openDrawer();
					}}
				>
					<Icon name="menu" type="feather" color="red" size={34} />
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						position: "relative",
						height: vh(7.5),
						width: vw(86),
						backgroundColor: "magenta",
						flexDirection: "row",
						zIndex: 1,
						opacity: 0.9,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => this.props.handleCatsTogg()}
				>
					<Text
						style={{
							textAlign: "center",
							width: vw(64),
							fontSize: 20,
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
							left: vw(2.5),
							// backgroundColor: "blue",
						}}
					>
						<Icon name="circledown" type="antdesign" color="red" size={34} />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default connect(mapStateToProps)(Header);

function mapStateToProps(state) {
	return { category: state.category };
}
