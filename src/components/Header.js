import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Icon } from "react-native-elements";

export default class Header extends React.Component {
	render() {
		return (
			<View
				style={{
					zIndex: 1,
					justifyContent: "center",
					alignItems: "center",
					width: vw(104),
					postion: "absolute",
					display: "flex",
					flexDirection: "row",
					right: vw(2),
				}}
			>
				<TouchableOpacity
					style={{
						position: "absolute",
						top: vh(6.8),
						left: vw(0.1),
						height: vh(7.5),
						width: vw(16),
						backgroundColor: "brown",
						zIndex: 2,
						opacity: 0.9,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						this.props.navigation.openDrawer;
						this.props.handleCatsTogg();
					}}
				>
					<Icon
						style={{ left: vw(0.8) }}
						name="menu"
						type="feather"
						color="red"
						size={34}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						position: "absolute",
						top: vh(6.8),
						height: vh(7.5),
						width: vw(100),
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
							width: vw(56),
							fontSize: 20,
							marginLeft: vw(9.3),
						}}
					>
						CATEGORIES
					</Text>
					<View style={{ left: vw(10) }}>
						<Icon name="circledown" type="antdesign" color="red" size={34} />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
