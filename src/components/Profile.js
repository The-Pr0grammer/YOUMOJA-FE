import React, { useState, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import ProfileStats from "./ProfileStats.js";
import ProfileHearts from "./ProfileHearts.js";
import MyBusinesses from "./MyBusinesses.js";
import NewBusiness from "./NewBusiness";
import axios from "axios";


const Profile = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();
	const [addBusinessTogg, setAddBusinessTogg] = useState(false);

	setTimeout(() => setLoading(false), 1000);

	// isFocused ? console.log("🔍♥👀focused") : console.log("unfocused");
	// !isFocused &&
	// 	NavigationActions.setParams({
	// 		params: { title: "Hello" },
	// 		key: "screen-123",
	// 	});

	useLayoutEffect(() => {
		return () => {
			// navigation.navigate("Profile");
			!loading && setLoading(true);
			// let response = () =>
			// 	axios(`http://127.0.0.1:3000/users/${props.userInfo.id}`)
			// 		.then((resp) => this.props.setUserShow(resp.data))
			// 		.catch((error) => console.log(error));
			// response();
			setUserShow(props.userInfo);
		};
	});

	const handleAddBusinessTogg = () => {
		setAddBusinessTogg(!addBusinessTogg);
	};
	// console.log("userSHOW IS 🐛✋🏾");
	// console.log("♻️", loading);
	// console.log("userinfo:::::", props.userInfo);
	// console.log("NEW BIZ TOGG IS 🆕:::::", addBusinessTogg);
	return (
		<View style={styles.container}>
			{/* {isFocused && addBusinessTogg && setVisibility(true)} */}

			<Header
				name={userShow.name}
				navigation={navigation}
				refresh={true}
				loading={loading}
				lastScreen={"Home"}
			/>
			{loading && (
				<View
					style={{
						// flex: 1,
						height: vh(90),
						width: vw(100),
						justifyContent: "center",
						backgroundColor: "rgba(0,0,0,0.9)",
					}}
				>
					<ActivityIndicator
						size="large"
						color="lime"
						hidesWhenStopped={true}
					></ActivityIndicator>
					<View style={{ position: "absolute" }}>
						<ImageBackground
							source={require("../images/BlackLivesMatter.gif")}
							style={styles.bg}
							imageStyle={{ resizeMode: "stretch" }}
						></ImageBackground>
					</View>
				</View>
			)}
			<View
				style={{
					zIndex: 2,
					postion: "relative",
					justifyContent: "center",
					width: vw(100),
					display: "flex",
					flexDirection: "row",
					marginTop: vh(0.25),
					backgroundColor: "black",
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
				<TextTicker
					shouldAnimateTreshold={vw(1)}
					duration={6400}
					loop
					bounce
					repeatSpacer={36}
					// marqueeDelay={3200}
					// bouncePadding={{ right: vw(2) }}
					style={{
						textAlign: "center",
						flex: 1,
						fontWeight: "bold",
						fontFamily: "Marker Felt",
						fontSize: 18,
						color: "olivedrab",
						backgroundColor: "black",
						paddingVertical: vh(3),
						width: vw(40),
						// opacity: 0.75,
					}}
				>
					{userShow.username}
				</TextTicker>
			</View>

			<ScrollView
				contentContainerStyle={{ paddingBottom: vh(15) }}
				style={{
					// flex: 1,
					backgroundColor: "black",
					flexDirection: "column",
					zIndex: 1,
					display: "relative",
				}}
				//START OF STATS
			>
				<ProfileStats userShow={props.userInfo} />
				{
					addBusinessTogg && (
						<NewBusiness handleAddBusinessTogg={handleAddBusinessTogg} />
					) //NEW BUSINESS
				}
				<MyBusinesses
					userId={props.userInfo.id}
					handleAddBusinessTogg={handleAddBusinessTogg}
				/>
				<ProfileHearts
					userShow={props.userInfo}
					//PROFHEARTS
				/>
			</ScrollView>
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
		width: vw(100),
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// marginTop: vh(10),
	},
	background: {
		flex: 1,
		height: vh(100),
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
	// profilePic: {
	// 	borderRadius: 82,
	// 	height: vh(25),
	// 	width: vw(45),
	// 	opacity: 1.0,
	// 	zIndex: 2,
	// 	top: vh(1),
	// },
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
	list: {
		position: "absolute",
		// marginTop: vh(21.8),
		height: vh(68.6),
		width: vw(100),
		// opacity: 1.0,
	},
	bg: {
		// position: "absolute",
		// resizeMode: "cover",
		opacity: 0.2,
		borderWidth: 0,
		width: vw(100),
		height: vh(85),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
