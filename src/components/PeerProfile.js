import React, { useState, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import { set } from "react-native-reanimated";

const PeerProfile = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	setTimeout(() => setLoading(false), 250);

	isFocused ? console.log("🔍♥👀focused") : console.log("unfocused");
	// !isFocused &&
	// 	NavigationActions.setParams({
	// 		params: { title: "Hello" },
	// 		key: "screen-123",
	// 	});

	useLayoutEffect(() => {
		return () => {
			!loading && setLoading(true);

			// console.log("PROFILE PARAMS ARE🎯", props.route.params.userShowInfo);
			setUserShow(props.route.params.userShowInfo);
		};
	});

	console.log("userSHOW IS 🐛✋🏾");
	console.log("♻️", loading);
	// console.log("userinfo:::::", props.route.params.userShowInfo);
	return (
		<View style={styles.container}>
			<Header
				name={userShow.name}
				navigation={navigation}
				refresh={true}
				loading={loading}
			/>
			<View
				style={{
					zIndex: 2,
					postion: "relative",
					justifyContent: "center",
					width: vw(100),
					display: "flex",
					flexDirection: "column",
					marginTop: vh(0.25),
					// bottom: vh(10),
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
			{loading && (
				<View style={{ height: vh(50), justifyContent: "center" }}>
					<ActivityIndicator
						size="large"
						color="lime"
						hidesWhenStopped={true}
					></ActivityIndicator>
				</View>
			)}
			{!loading && (
				<View
					style={{
						top: vh(10),
						height: vh(32),
						width: vw(100),
						borderWidth: 2,
						position: "absolute",
						alignSelf: "flex-start",
						backgroundColor: "rgba(0,100,0,0.8)",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "column",
						// bottom: vh(17.6),
					}}
				>
					<Image
						resizeMode={"cover"}
						source={{
							uri: userShow.img_url,
						}}
						style={styles.profilePic}
					></Image>
				</View>
			)}
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
})(PeerProfile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// top: vh(10),
	},
	background: {
		flex: 1,
		height: vh(90),
		width: vw(100),
		alignItems: "center",
		resizeMode: "center",
		top: vh(10),
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
	profilePic: {
		borderRadius: 100,
		height: vh(21),
		width: vw(45),
		opacity: 1.0,
		zIndex: 2,
		bottom: vh(2),
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
