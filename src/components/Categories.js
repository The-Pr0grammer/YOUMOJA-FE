import React, { Component } from "react";
import {
	ScrollView,
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Dimensions,
	Modal,
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import Header from "./Header.js";

export default class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [
				"ANY",
				"Fashion",
				"Auto",
				"Technology",
				"Beauty & Hair",
				"Event Planning",
				"Food",
				"Health",
				"Fitness",
				"Art",
				"Training",
				"Construction",
				"Legal",
				"For Hire",
				"Home Improvement",
				"Real Estate",
				"Retail",
				"B2B",
				"Entertainment",
				"Music",
				"Animal",
				"Financial",
				"Hobbies",
				"Travel",
				"Medical",
				"Community Organizations",
				"Insurance",
				"Media",
				"Education",
				"Hospitality",
				"Transportation",
				"Children",
				"Spirituality",
				"Repair",
			],
		};
	}

	renderCats = () => {};

	render() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.catTogg}
				style={{ flex: 1, paddingBottom: vh(200) }}
				backdropOpacity={0.3}
				contentContainerStyle={{ flex: 1, paddingBottom: vh(200) }}
			>
				<View // HEADER
					style={{
						position: "absolute",
						width: vw(104),
						top: vh(2.5),
					}}
				>
					<Header
						navigation={this.props.navigation}
						handleCatsTogg={this.props.handleCatsTogg}
					/>
				</View>
				<View //BACKDROP
					style={{
						flex: 1,
						height: vh(100),
						width: vw(100),
						justifyContent: "center",
						alignItems: "center",
						top: vh(16.3),
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						paddingBottom: vh(10),
					}}
				>
					<ScrollView //MODAL SCROLL
						contentContainerStyle={{ flexGrow: 1 }}
						style={{
							position: "absolute",
							width: vw(50),
							height: vh(70),
							backgroundColor: "rgba(0, 0, 200, 0.8)",
							bottom: vh(30),
							flexGrow: 1,
						}}
					>
						<Text
							style={{
								backgroundColor: "red",
								position: "relative",
								height: vh(10),
							}}
						>
							TEST
						</Text>
						<TouchableOpacity
							style={{
								position: "relative",
								height: vh(7.5),
								width: vw(50),
								backgroundColor: "magenta",
								flexDirection: "row",
								zIndex: 1,
							}}
							onPress={() => this.props.handleCatsTogg()}
						>
							<Text
								style={{
									backgroundColor: "red",
									position: "relative",
								}}
							>
								CLOSE
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								position: "relative",
								height: vh(17.5),
								width: vw(50),
								backgroundColor: "magenta",
								flexDirection: "row-reverse",
								zIndex: 1,
							}}
							onPress={() => this.props.handleCatsTogg()}
						>
							<Text
								style={{
									backgroundColor: "red",
									position: "relative",
								}}
							>
								CLOSE
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								position: "relative",
								height: vh(17.5),
								width: vw(50),
								backgroundColor: "magenta",
								flexDirection: "row-reverse",
								zIndex: 1,
							}}
							onPress={() => this.props.handleCatsTogg()}
						>
							<Text
								style={{
									backgroundColor: "red",
									position: "relative",
								}}
							>
								CLOSE
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								position: "relative",
								height: vh(17.5),
								width: vw(50),
								backgroundColor: "magenta",
								flexDirection: "row-reverse",
								zIndex: 1,
							}}
							onPress={() => this.props.handleCatsTogg()}
						>
							<Text
								style={{
									backgroundColor: "red",
									position: "relative",
								}}
							>
								CLOSE
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								position: "relative",
								height: vh(17.5),
								width: vw(50),
								backgroundColor: "magenta",
								flexDirection: "row-reverse",
								zIndex: 1,
							}}
							onPress={() => this.props.handleCatsTogg()}
						>
							<Text
								style={{
									backgroundColor: "red",
									position: "relative",
								}}
							>
								CLOSE
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: vw(70),
		height: vh(100),
		backgroundColor: "red",
	},
});
