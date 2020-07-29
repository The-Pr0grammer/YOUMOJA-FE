import React, { Component } from "react";
import axios from "axios";
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Linking,
} from "react-native";
import { Card, SearchBar, Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import CommentList from "./CommentList.js";
import KeyboardShift from "./KeyboardShift.js";

class BizPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			loading: false,
			page: 1,
			error: null,
			newCommentTogg: false,
			hearts: 0,
		};
	}

	componentDidMount() {
		return this.setState({
			hearts: this.props.route.params["biz"].business.hearts,
			comments: this.props.route.params["biz"].business.comments,
		});
	}

	incHearts = () => {
		const axios = require("axios");
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://localhost:3000/businesses/${this.props.route.params["biz"].business.id}`,
				{
					hearts: this.state.hearts + 1,
				},
				{ headers: { "Content-Type": "application/json" } }
			)
			.then(function (response) {
				// console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			});
		axios
			.post(`http://localhost:3000/user_likes`, {
				user_id: 1,
				business_id: this.props.route.params["biz"].business.id,
			})
			.then(function (response) {
				console.log(response);
			});
	};

	render() {
		// console.log("bizpage comms", this.state.comments.length);
		// console.log(this.props.route.params.incComments);
		// console.log(this.props.route.params["biz"].business);
		return (
			<KeyboardShift style={{ position: "absolute", zIndex: 0 }}>
				{() => (
					<View style={{ backgroundColor: "black" }}>
						<View
							style={{
								position: "relative",
								width: vw(100),
								height: vh(6.6),
								backgroundColor: "black",
							}}
						>
							<TextTicker
								duration={Math.random * 18000}
								loop
								bounce
								repeatSpacer={25}
								marqueeDelay={Math.random() * 1000}
								style={styles.bizSumm}
							>
								mad random text cos this is just an example of a businesses
								description !!!!!!! yeeeeeeeeeeee 🔥🤯♥️
							</TextTicker>
						</View>
						<View style={styles.cardView}>
							<Image
								style={styles.img}
								source={{
									uri: this.props.route.params["biz"].business.image_url,
								}}
							/>
							<View
								style={{
									backgroundColor: "purple",
									width: vw(40),
									height: vh(30),
									alignSelf: "flex-end",
									position: "absolute",
									zIndex: 10,
									position: "absolute",
								}}
							>
								<TouchableOpacity
									style={{
										position: "absolute",
										alignSelf: "center",
										top: vh(11),
										height: 37,
										width: 45,
									}}
									onPress={() => {
										this.incHearts();
									}}
								>
									<Icon name="heart" type="feather" color="red" size={35} />
								</TouchableOpacity>
								<Text
									style={{
										position: "absolute",
										textAlign: "center",
										fontSize: 25,
										color: "gold",
										fontWeight: "bold",
										top: vh(16),
										height: vh(10),
										width: vw(10),
										alignSelf: "center",
									}}
								>
									{this.state.hearts}
								</Text>

								<TouchableOpacity
									style={{
										position: "absolute",
										alignSelf: "flex-start",
										height: vh(5),
										width: vw(13),
										marginHorizontal: "2%",
										marginVertical: "4%",
										zIndex: 1,
									}}
									onPress={() => {
										Linking.openURL(
											this.props.route.params["biz"].business.twitter
										);
									}}
								>
									<Icon name="twitter" type="feather" color="red" size={35} />
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										position: "absolute",
										alignSelf: "flex-end",
										top: vh(23.5),
										height: vh(5),
										width: vw(13),
										marginHorizontal: "2%",
									}}
									onPress={() => {
										Linking.openURL(
											this.props.route.params["biz"].business.phone
										);
									}}
								>
									<Icon
										name="phone-call"
										type="feather"
										color="red"
										size={34}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										position: "absolute",
										alignSelf: "flex-end",
										height: vh(5),
										width: vw(13),
										marginVertical: "4%",
									}}
									onPress={() => {
										Linking.openURL(
											this.props.route.params["biz"].business.facebook
										);
									}}
								>
									<Icon
										name="facebook-box"
										type="material-community"
										color="red"
										size={38}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										position: "absolute",
										alignSelf: "flex-start",
										top: vh(23.5),
										height: vh(5),
										width: vw(13),
										marginHorizontal: "2%",
									}}
									onPress={() => {
										Linking.openURL(
											this.props.route.params["biz"].business.website
										);
									}}
								>
									<Icon name="laptop" type="entypo" color="red" size={35} />
								</TouchableOpacity>
							</View>
						</View>
						<View style={{ zIndex: 1 }}>
							<TouchableOpacity
								style={{ borderRadius: 20, backgroundColor: "salmon" }}
							>
								<Text
									style={{
										width: vw(34),
										height: vh(8),
										backgroundColor: "salmon",
										position: "absolute",
										top: vh(30),
										fontSize: 24,
										textAlign: "center",
										fontFamily: "PartyLetPlain",
										lineHeight: 50,
									}}
								>
									SUPPORT
								</Text>
							</TouchableOpacity>

							<ScrollView
								contentContainerStyle={{
									flexGrow: 1,
									justifyContent: "flex-start",
									paddingHorizontal: vw(1),
								}}
								style={{
									backgroundColor: "black",
									width: vw(66),
									height: vh(8),
									top: vh(30),
									position: "absolute",
									alignSelf: "flex-end",
								}}
								automaticallyAdjustInsets={false}
								horizontal={true}
								pagingEnabled={true}
								scrollEnabled={true}
								decelerationRate={0}
								snapToAlignment={"center"}
								snapToInterval={20}
								scrollEventThrottle={5}
								onScroll={(event) => {
									var contentOffsetX = event.nativeEvent.contentOffset.x;
									var contentOffsetY = event.nativeEvent.contentOffset.y;

									var cellWidth = (DEVICE_WIDTH - 100).toFixed(2);
									var cellHeight = (DEVICE_HEIGHT - 200).toFixed(2);

									var cellIndex = Math.floor(contentOffsetX / cellWidth);

									// Round to the next cell if the scrolling will stop over halfway to the next cell.
									if (
										contentOffsetX -
											Math.floor(contentOffsetX / cellWidth) * cellWidth >
										cellWidth
									) {
										cellIndex++;
									}

									// Adjust stopping point to exact beginning of cell.
									contentOffsetX = cellIndex * cellWidth;
									contentOffsetY = cellIndex * cellHeight;

									event.nativeEvent.contentOffsetX = contentOffsetX;
									event.nativeEvent.contentOffsetY = contentOffsetY;

									// this.setState({contentOffsetX:contentOffsetX,contentOffsetY:contentOffsetY});
									console.log("cellIndex:" + cellIndex);

									console.log("contentOffsetX:" + contentOffsetX);
									// contentOffset={{x:this.state.contentOffsetX,y:0}}
								}}
							>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
								<Image
									source={require("../images/LOGO.png")}
									style={styles.badge}
								/>
							</ScrollView>
						</View>
						<View style={{ position: "absolute", flex: 1, marginTop: vh(8) }}>
							<CommentList
								bizId={this.props.route.params["biz"].business.id}
								comments={this.state.comments}
								updateComments={this.updateComments}
							/>
						</View>
					</View>
				)}
			</KeyboardShift>
		);
	}
}

export default BizPage;

const styles = StyleSheet.create({
	img: {
		position: "absolute",
		flex: 1,
		width: vw(60),
		height: vh(30),
		opacity: 1.0,
		alignSelf: "flex-start",
	},
	badge: {
		marginVertical: vh(0.5),
		width: vw(16),
		height: vh(7.1),
	},
	cardView: {
		flexDirection: "column",
		zIndex: 1,
	},
	bizSumm: {
		position: "relative",
		fontSize: 32,
		backgroundColor: "black",
		color: "aqua",
	},
});
