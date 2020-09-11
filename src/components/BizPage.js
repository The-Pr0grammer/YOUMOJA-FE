import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Share
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import TextTicker from "react-native-text-ticker";
import Header from "./Header.js";
import CommentList from "./CommentList.js";
import BizPageDash from "./BizPageDash.js";
import BizPageSupport from "./BizPageSupport.js";
import { useNavigation } from "@react-navigation/native";

const BizPage = (props) => {
	const [bizInfo, setBizinfo] = useState({});
	const [comments, setComments] = useState([]);
	const navigation = useNavigation();
	// console.log(props.route.params.lastScreen);

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					flexDirection: "column",
				}}
			>
				<Header
					name={props.route.params["biz"].business.name}
					navigation={props.navigation}
					lastScreen={props.route.params.lastScreen}
				/>
			</View>

			<View style={styles.bizCon}>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<View
						style={{
							backgroundColor: "rgba(40, 40, 40, 0.5)",
							borderLeftWidth: 4,
							width: vh(8.5),
							height: vh(6.8),
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								console.log(props.route.params.userInfo);
								props.navigation.navigate("PeerProfile", {
									prevScreen: "BizPage",
									userShowInfo: props.route.params.userInfo,
								});
							}}
						>
							<Image
								resizeMode={"cover"}
								source={{
									uri: props.route.params.userInfo.img_url,
								}}
								style={styles.profilePic}
							></Image>
						</TouchableOpacity>
					</View>
					<TextTicker
						shouldAnimateTreshold={vw(8)}
						duration={9600}
						loop
						bounce
						repeatSpacer={25}
						marqueeDelay={3200}
						style={styles.bizSumm}
					>
						{props.route.params["biz"].business.summary}
					</TextTicker>
				</View>
				<View style={styles.cardView}>
					<Image
						style={styles.img}
						source={{
							uri: props.route.params["biz"].business.image_url,
						}}
					/>
					<BizPageDash business={props.route.params["biz"].business} />
				</View>
				<View style={styles.bizSupport}>
					<BizPageSupport business={props.route.params["biz"].business} />
				</View>
			</View>
			<View style={styles.commentCon}>
				<CommentList
					bizId={props.route.params["biz"].business.id}
					navigation={navigation}
					// comments={comments}
				/>
			</View>
		</View>
	);
};

export default BizPage;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		flexDirection: "column",
		backgroundColor: "darkslategray",
	},
	bizCon: {
		position: "relative",
		width: vw(100),
		height: vh(7.3),
		backgroundColor: "black",
		bottom: vh(83),
		borderTopWidth: 2.5,
	},
	bizSumm: {
		position: "relative",
		padding: vw(1.25),
		fontFamily: "Marker Felt",
		fontSize: 18,
		color: "olivedrab",
		height: vh(6),
		backgroundColor: "black",
		marginBottom: vh(0.8),
		top: vh(2),
	},
	bizSupport: {
		position: "relative",
		// padding: vw(1.25),
		backgroundColor: "lightslategray",
	},
	cardView: {
		position: "relative",
		borderWidth: 2.5,
		borderTopWidth: 2.5,
		flexDirection: "column",
		borderColor: "black",
	},
	img: {
		position: "absolute",
		width: vw(58.6),
		height: vh(30),
		opacity: 1.0,
		alignSelf: "flex-start",
	},
	commentCon: {
		position: "relative",
		bottom: vh(80.75),
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: 22,
		height: vh(6),
		width: vw(11),
	},
});
