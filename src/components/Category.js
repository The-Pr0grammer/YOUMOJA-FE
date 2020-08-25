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

class Category extends React.Component {
	render() {
		// this.props.loaded && console.log("AYE🔥");

		return (
			<TouchableOpacity
				style={{
					height: vh(18),
					margin: vh(0.3),
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={() => {
					this.props.changeCat(this.props.catObj.cat);
					this.props.handleSearch("");
					this.props.handleCatsTogg();
				}}
			>
				<ImageBackground
					imageStyle={{ resizeMode: "stretch", marginTop: vh(3) }}
					source={this.props.catObj.bg}
					style={{
						flex: 1,
						alignItems: "center",
						// justifyContent: "center",

						opacity: this.props.loaded ? 1 : 0,
					}}
					onLoadEnd={() => this.props.handleLoaded(this.props.catObj.cat)}
				>
					<Text
						style={{
							width: vw(32),
							justifyContent: "center",
							alignItems: "center",
							color: "black",
							fontSize: 16,
							textAlign: "center",
							backgroundColor: "lightslategray",
							alignSelf: "flex-start",
							position: "relative",
							fontFamily: "Marker Felt",
						}}
					>
						{this.props.catObj.cat}
					</Text>
				</ImageBackground>
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
