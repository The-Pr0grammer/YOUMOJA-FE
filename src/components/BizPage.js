import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import TextTicker from "react-native-text-ticker";
import Header from "./Header.js";
import CommentList from "./CommentList.js";
import BizPageDash from "./BizPageDash.js";
import BizPageSupport from "./BizPageSupport.js";

const BizPage = (props) => {
	const [bizInfo, setBizinfo] = useState({});
	const [comments, setComments] = useState([]);

	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					top: vh(10),
					flexDirection: "column",
				}}
			>
				<Header
					name={props.route.params["biz"].business.name}
					navigation={props.navigation}
				/>
			</View>

			<View style={styles.bizCon}>
				<TextTicker
					duration={3200}
					loop
					bounce
					repeatSpacer={25}
					marqueeDelay={1600}
					style={styles.bizSumm}
				>
					{props.route.params["biz"].business.summary}
				</TextTicker>
				<View style={styles.cardView}>
					<Image
						style={styles.img}
						source={{
							uri: props.route.params["biz"].business.image_url,
						}}
					/>
					<BizPageDash business={props.route.params["biz"].business} />
				</View>
				<BizPageSupport business={props.route.params["biz"].business} />
			</View>
			<View style={styles.commentCon}>
				<CommentList
					bizId={props.route.params["biz"].business.id}
					comments={comments}
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
	},
	bizCon: {
		position: "relative",
		width: vw(100),
		height: vh(5),
		backgroundColor: "black",
		bottom: vh(85),
	},
	bizSumm: {
		position: "relative",
		padding: vw(1.25),
		fontFamily: "Marker Felt",
		fontSize: 18,
		color: "lightslategray",
		height: vh(5),
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
		width: vw(60),
		height: vh(30),
		opacity: 1.0,
		alignSelf: "flex-start",
	},
	commentCon: {
		position: "relative",
		bottom: vh(81),
	},
});
