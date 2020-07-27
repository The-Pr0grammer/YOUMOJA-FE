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
} from "react-native";
import { Card, SearchBar, Icon, ThemeConsumer } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import BizPage from "./BizPage.js";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getComments } from "../actions/commentsAction";

class ListBiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			biz: [],
			hearts: 0,
			comments: 0,
			page: 1,
			error: null,
		};
	}

	componentDidMount() {
		return this.setState({
			biz: this.props.biz,
			hearts: this.props.biz.business.hearts,
			comments: this.props.biz.business.comments.length,
		});
	}

	incHearts = () => {
		const axios = require("axios");
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://localhost:3000/businesses/${this.props.biz.business.id}`,
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
				business_id: this.props.biz.business.id,
			})
			.then(function (response) {
				console.log(response);
			});
	};

	
	// fetchBiz = () => {
	// 	axios
	// 		.get(`http://localhost:3000/user_bizs/${this.props.biz.id}`)
	// 		.then(function (response) {
	// 			this.setState({ biz: response });
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

	render() {
		// console.log(this.props.biz.business.comments);
		return (
			<View style={styles.cardView}>
				<Card
					containerStyle={{
						width: vw(97),
						padding: 0,
						borderWidth: 0,
						shadowOffset: { height: 0, width: 0 },
						display: "flex",
						flexDirection: "column",
						backgroundColor: "transparent",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("BizPage", {
								biz: this.state.biz,
								incComments: this.props.incComments,
							});
						}}
					>
						<Image
							style={styles.img}
							source={{ uri: this.props.biz.business.image_url }}
						/>
					</TouchableOpacity>
					<View
						style={{
							alignSelf: "flex-end",
							left: vw(61.3),
							position: "absolute",
							height: vh(30),
							width: vw(34.7),
							backgroundColor: "black",
							opacity: 0.5,
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								alignSelf: "center",
								top: vh(1),
								height: vh(5),
								width: vw(13),
							}}
							onPress={() => {
								this.incHearts();
							}}
						>
							<Icon name="heart" type="feather" color="red" size={37} />
						</TouchableOpacity>
						<Text
							style={{
								position: "absolute",
								textAlign: "center",
								fontSize: 25,
								color: "gold",
								fontWeight: "bold",
								top: vh(6),
								height: vh(5),
								width: vw(13),
								alignSelf: "center",
							}}
						>
							{this.state.hearts}
						</Text>
						{/* COMMENTS ICON */}
						<TouchableOpacity
							style={{
								position: "absolute",
								alignSelf: "center",
								top: vh(11),
								height: vh(5),
								width: vw(13),
							}}
							onPress={() => {}}
						>
							<Icon
								name="chat"
								type="materialcommunityicons"
								color="green"
								size={37}
							/>
						</TouchableOpacity>

						<Text
							style={{
								position: "absolute",
								textAlign: "center",
								fontSize: 25,
								color: "gold",
								fontWeight: "bold",
								top: vh(15),
								height: vh(5),
								width: vw(13),
								alignSelf: "center",
							}}
						>
							{this.state.comments}
						</Text>

						<ScrollView
							style={{
								alignSelf: "flex-start",
								backgroundColor: "orange",
								width: vw(34.5),
								height: vh(10),
								position: "absolute",
								top: vh(20),
							}}
							automaticallyAdjustInsets={false}
							horizontal={true}
							pagingEnabled={true}
							scrollEnabled={true}
							decelerationRate={0}
							snapToAlignment={"center"}
							snapToInterval={200}
							scrollEventThrottle={16}
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
						</ScrollView>
					</View>
					{/* BADGES VIEW*/}
				</Card>
			</View>
		);
	}
}

export default ListBiz;

const styles = StyleSheet.create({
	cardView: {
		marginTop: vh(-0.5),
		padding: 0,
		display: "flex",
		flexDirection: "row",
	},
	img: {
		flex: 2,
		marginLeft: vw(-4.0),
		width: vw(66),
		height: vh(30),
		opacity: 1.0,
		borderRadius: 2,
	},
});
