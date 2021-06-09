import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { changeCat, handleSearch } from "../redux/actions/bizAction";

import FastImage from "react-native-fast-image";

class Category extends React.Component {
	render() {
		return (
			<TouchableOpacity
				style={{
					height: vh(18),
					margin: vh(0.2),
					justifyContent: "center",
					alignItems: "center",
					marginTop: vh(1.25),
				}}
				onPress={() => {
					if (this.props.catObj.cat !== "emptyBox") {
						this.props.changeCat(this.props.catObj.cat);
					}
					this.props.handleCatsTogg();
					// this.props.handleSearch("");
				}}
			>
				<View>
					{this.props.catObj.cat !== "emptyBox" ? (
						<>
							<Text
								style={{
									width: vw(33),
									justifyContent: "center",
									alignItems: "center",
									color: "olivedrab",
									fontSize: 16,
									textAlign: "center",
									backgroundColor: "rgba(0,0,0,0.85)",
									alignSelf: "flex-start",
									position: "relative",
									fontFamily: "Marker Felt",
								}}
							>
								{this.props.catObj.cat}
							</Text>
							<FastImage
								resizeMode={"cover"}
								source={this.props.catObj.bg}
								style={{
									alignItems: "center",
									width: vw(33),
									height: undefined,
									aspectRatio: 135 / 135,
								}}
							></FastImage>
						</>
					) : (
						<>
							<Text
								style={{
									width: vw(33),
									justifyContent: "center",
									alignItems: "center",
									color: "olivedrab",
									fontSize: 16,
									textAlign: "center",
									backgroundColor: "rgba(0,0,0,0)",
									alignSelf: "flex-start",
									position: "relative",
									fontFamily: "Marker Felt",
								}}
							>
							</Text>
							
						</>
					)}
				</View>
			</TouchableOpacity>
		);
	}
}

export default connect(mapStateToProps, { changeCat, handleSearch })(Category);

const styles = StyleSheet.create({
	catRow: {
		// flex: 1,
		position: "relative",
		height: vh(115),
		width: vw(100),
	},
});

function mapStateToProps(state) {
	return { category: state.category };
}
