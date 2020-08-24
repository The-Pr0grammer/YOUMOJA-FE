import React, { useState } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";

const Profile = (props) => {
	const navigation = useNavigation();
	console.log(props.userInfo);
	const [active, toggleActive] = useState("");

	return (
		<View style={styles.container}>
			<Header
				name={props.userInfo.name}
				navigation={navigation}
				refresh={true}
			/>
			<View
				style={{
					zIndex: 1,
					postion: "relative",
					justifyContent: "center",
					width: vw(100),
					display: "flex",
					flexDirection: "column",
					marginTop: vh(0.25),
					bottom: vh(10),
				}}
			>
				<TouchableOpacity
					activeOpacity={!active ? 0.2 : 1}
					style={[!active ? styles.menuButton : styles.disabledButton]}
					onPress={() => {
						!active && props.navigation.openDrawer();
					}}
				>
					<Icon
						name="menu"
						type="feather"
						color={!active ? "red" : "grey"}
						size={34}
					/>
				</TouchableOpacity>
			</View>

			<View
				style={{
					position: "absolute",
					flex: 1,
					height: vh(100),
					width: vw(100),
					opacity: 0.1,
				}}
			>
				<ImageBackground
					resizeMode="stretch"
					style={styles.background}
					source={require("../images/BlackDollarsMatter.jpeg")}
				></ImageBackground>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		marginTop: vh(10),
	},
	background: {
		flex: 1,
		height: vh(90),
		width: vw(100),
		alignItems: "center",
		resizeMode: "center",
	},
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
		backgroundColor: "lavender",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
