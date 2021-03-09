import React, { useState, useEffect, useLayoutEffect } from "react";
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
import {
	setUserInfo,
	setIsFetching,
	profileLoadingTogg,
	fetchBizs,
} from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import ProfileStats from "./ProfileStats.js";
import ProfileHearts from "./ProfileHearts.js";
import MyBusinesses from "./MyBusinesses.js";
import NewBusiness from "./NewBusiness";
import SuccessModal from "./SuccessModal.js";

import axios from "axios";

const Profile = (props) => {
	const [loading, setLoading] = useState(true);
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [addBusinessTogg, setAddBusinessTogg] = useState(false);
	const [posted, setPosted] = useState(false);
	const [imgSaved, setImgSaved] = useState(false);
	const [editTogg, setEditTogg] = useState(false);
	const isFocused = useIsFocused();
	const navigation = useNavigation();

	// setTimeout(() => setLoading(false), 500);
	// props.profileLoading &&
	// 	setTimeout(() => props.profileLoadingTogg(false), 500);
	useEffect(() => {
		!addBusinessTogg && props.setIsFetching(true);
		setTimeout(() => props.setIsFetching(false), 750);

		if (!userShow) {
			let response = axios(
				`http://192.168.1.211:3000/users/${props.userInfo.id}`
			)
				.then((resp) => {
					props.setUserInfo(resp.data);
					setUserShow(resp.data);
				})
				.catch((error) => console.log(error));
		}
	}, [isFocused]);

	const handleAddBusinessTogg = () => {
		setAddBusinessTogg(!addBusinessTogg);
	};

	handleSuccess = (type) => {
		if (type === "business") {
			setTimeout(() => {
				setPosted(true);
				props.fetchBizs();
			}, 1000);
		} else if (type === "profilePic") {
			setTimeout(() => {
				setImgSaved(true);
				let response = axios(
					`http://192.168.1.211:3000/users/${props.userInfo.id}`
				)
					.then((resp) => {
						props.setUserInfo(resp.data);
						setUserShow(resp.data);
					})
					.catch((error) => console.log(error));
			}, 250);
		}
	};

	handleClose = (type) => {
		if (type === "business") {
			setTimeout(() => {
				setPosted(false);
			}, 6400);
		} else if (type === "profilePic") {
			setTimeout(() => {
				setImgSaved(false);
			}, 3200);
		}
	};

	handleDismiss = () => {
		setPosted(false);
		setImgSaved(false);
	};

	// console.log("userSHOW IS 🐛✋🏾");
	// console.log("♻️", loading);
	// console.log("userinfo:::::", props.userInfo);
	// console.log("NEW BIZ TOGG IS 🆕:::::", addBusinessTogg);
	return (
		<View style={styles.container}>
			{/* {isFocused && addBusinessTogg && setVisibility(true)} */}

			<Header
				name={props.userInfo.name}
				navigation={navigation}
				refresh={true}
				// loading={props.profileLoading}
				lastScreen={"Home"}
			/>

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
					{props.userInfo.username}
				</TextTicker>
			</View>

			<ScrollView
				indicatorStyle={"white"}
				scrollIndicatorInsets={{ top: 0, left: vw(10), bottom: 0, right: 0 }}
				contentContainerStyle={{ paddingBottom: vh(15) }}
				style={{
					flex: 1,
					backgroundColor: "black",
					flexDirection: "column",
					zIndex: 1,
				}}
				//START OF STATS
			>
				{posted && (
					<SuccessModal
						handleDismiss={this.handleDismiss}
						message={"Your business has been listed✅"}
					/>
				)}

				{imgSaved && (
					<SuccessModal
						handleDismiss={this.handleDismiss}
						message={"You updated your profile pic✅"}
					/>
				)}
				<ProfileStats
					userShow={props.userInfo}
					handleSuccess={handleSuccess}
					handleClose={handleClose}
					handleDismiss={handleDismiss}
				/>
				{
					addBusinessTogg && (
						<NewBusiness
							handleAddBusinessTogg={handleAddBusinessTogg}
							handleSuccess={handleSuccess}
							handleClose={handleClose}
							handleDismiss={handleDismiss}
						/>
					) //NEW BUSINESS
				}
				{!props.isFetching && !addBusinessTogg && (
					<>
						{props.myUbizs.length > 0 && (
							<MyBusinesses
								userId={props.userInfo.id}
								handleAddBusinessTogg={handleAddBusinessTogg}
								loading={loading}
							/>
						)}
						{props.userHearts.length > 0 && (
							<ProfileHearts
								userShow={props.userInfo}
								//PROFHEARTS
							/>
						)}

						<View
							style={{
								flex: 1,
								width: vw(40),
								// height: vh(10),
								alignSelf: "center",
								position: "relative",
								top: vh(8),
								// left: vw(55),
								backgroundColor: "rgba(0,0,0,0.75)",
								zIndex: 4,
								flexDirection: "row",
								// alignSelf: "flex-end",
							}}
						>
							<Button
								title="Edit Profile"
								buttonStyle={{
									// backgroundColor: "slategray",
									// backgroundColor: "firebrick",
									backgroundColor: "transparent",
									borderRadius: 10,
									zIndex: 5,
								}}
								style={{
									position: "relative",
									borderRadius: 20,
									width: vw(40),
									// height: vh(4),
									zIndex: 5,

									// marginBottom: vh(2.2),
								}}
								titleStyle={{ color: "slategray", fontSize: 24 }}
								onPress={() => {
									setImage("");
								}}
							/>
						</View>
					</>
				)}
				{props.isFetching && (
					<View
						style={{
							// flex: 1,
							// height: vh(100),
							width: vw(100),
							justifyContent: "center",
							backgroundColor: "rgba(0,0,0,0.9)",
						}}
					>
						<ActivityIndicator
							size="large"
							color="lime"
							hidesWhenStopped={true}
							style={{
								top: vh(22),
							}}
						></ActivityIndicator>
						<View style={{ position: "relative", height: vh(5) }}>
							<ImageBackground
								source={require("../images/BlackLivesMatter.gif")}
								style={styles.bg}
								imageStyle={{ resizeMode: "stretch" }}
							></ImageBackground>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
	profileLoadingTogg,
	fetchBizs,
})(function (props) {
	const isFocused = useIsFocused();

	return <Profile {...props} isFocused={isFocused} />;
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// marginTop: vh(10),
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
		resizeMode: "stretch",
		opacity: 0.2,
		borderWidth: 0,
		width: vw(100),
		height: vh(40),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		userHeartBizs: state.userHearts.map((uh) => uh.user_biz),
		profileLoading: state.profileLoading,
		isFetching: state.isFetching,
		myUbizs: state.myUbizs,
		userHearts: state.userHearts,
	};
}
