import React from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Vibration,
} from "react-native";
import { Icon, Badge, ThemeConsumer } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import {
	fetchBizs,
	setUserInfo,
	fetchUserInfo,
} from "../redux/actions/bizAction";
import { connect } from "react-redux";
import axios from "axios";
import BadgeShop from "./BadgeShop.js";

class ListBizDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// userHearts: [],
			error: null,
			shopTogg: false,
			badgeCounts: [],
			badgeKeyPressed: null,
			ubiz: props.ubiz,
			hearted: props.hearted,
			hearts: props.ubiz.business.hearts,
			comments: props.ubiz.business.comments,
			badgeCounts: props.ubiz.business.badges,
		};
	}

	componentDidMount() {
		// let countArr = this.mapBadges();
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.ubiz.business.badges !== prevProps.ubiz.business.badges) {
			this.setState({
				badgeCounts: this.props.ubiz.business.badges,
			});
		}
		if (this.props.hearted !== prevProps.hearted) {
			this.setState({
				hearted: this.props.hearted,
			});
		}
	}

	// fetchHearts = () => {
	// 	axios
	// 		.get(`http://192.168.1.211:3000/users/${this.props.userInfo.id}`)
	// 		.then((response) => {
	// 			this.setState({ userHearts: response.data.user_hearts });
	// 		})
	// 		.catch((error) => {
	// 			this.setState({ error: error });
	// 		});
	// };

	incHearts = async (fetchBizs, fetchUserInfo) => {
		const axios = require("axios");
		let ubiz = this.props.ubiz && this.props.ubiz;
		let hearts = this.state.hearts && this.state.hearts;
		let userInfo = this.props.userInfo && this.props.userInfo;

		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));

		await axios
			.post(`http://192.168.1.211:3000/user_hearts`, {
				user_heart: {
					user_id: userInfo.id,
					business_id: ubiz.business.id,
				}, //NEEDS TO BE REFACTORED TO POST W/ LOGGED IN USER ID NOT A HARDCODED "1"
			})
			.then(function (response) {
				// console.log("RESPONSE FROM UHEART POST", response);

				// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬇
				axios
					.patch(
						`http://192.168.1.211:3000/businesses/${ubiz.business.id}`,
						{
							business: {
								id: ubiz.business.id,
								hearts: hearts + 1,
							},
						},
						{ headers: { "Content-Type": "application/json" } }
					)
					.then(function (response) {
						fetchBizs(false); //PASSED AS A FUNCTION from onPress! Don't change to this.props...
						fetchUserInfo(userInfo.id); //PASSED AS A FUNCTION from onPress! Don't change to this.props...
					})
					.catch((error) => {
						console.log("ERROR⚠️", error);
					});
				// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬆
			})
			.catch((error) => {
				console.log("ERROR⚠️", error);
			});

		console.log("♥️  HEARTS INCED", hearts + 1);
	};

	deleteHeart = async (fetchBizs, fetchUserInfo) => {
		const axios = require("axios");
		let ubiz = this.props.ubiz && this.props.ubiz;
		let hearts = this.state.hearts && this.state.hearts;
		let userInfo = this.props.userInfo && this.props.userInfo;

		await userInfo.heart_ids
			.filter((uh) => uh.business_id === ubiz.id)
			.map((uh) => {
				axios
					.delete(`http://192.168.1.211:3000/user_hearts/${uh.id}`)
					.then(async (res) => {
						// console.log(`deleted heart 💔 #: ${uh.id}`);
						// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬇
						axios
							.patch(
								`http://192.168.1.211:3000/businesses/${ubiz.business.id}`,
								{
									business: {
										id: ubiz.business.id,
										hearts: hearts - 1,
									},
								},
								{ headers: { "Content-Type": "application/json" } }
							)
							.then((response) => {
								// console.log(response)
							})
							.catch((error) => {
								console.log("ERROR⚠️", error);
							});
						// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬆
					})
					.catch((error) =>
						this.setState({ error: "Something went wrong. Please try again." })
					);
			});

		await fetchBizs(false); //PASSED AS A FUNCTION from onPress! Don't change to this.props...
		await fetchUserInfo(userInfo.id); //PASSED AS A FUNCTION from onPress! Don't change to this.props...
		this.setState((prevState) => ({ hearts: prevState.hearts - 1 }));
		console.log(
			"💔HEARTS DECCED",
			hearts -
				userInfo.heart_ids.filter((uh) => uh.business_id === ubiz.id).length
		);
	};

	// mapBadges = () => {
	// 	let countArr = [];

	// 	this.props.ubiz.business.badges
	// 		.map((badge) => {
	// 			let badgeObj = countArr.find((x) => x.color == badge.color);
	// 			if (badgeObj) {
	// 				badgeObj["quantity"]++;
	// 				badgeObj["sum"] += parseFloat(badge.price);
	// 			} else {
	// 				countArr.push({
	// 					color: badge.color,
	// 					price: parseFloat(badge.price),
	// 					quantity: 1,
	// 					sum: parseFloat(badge.price),
	// 				});
	// 			}
	// 		})
	// 		.sort((a, b) => (a.price > b.price ? 1 : -1));

	// 	return countArr;
	// };

	handleShopTogg = async () => {
		this.setState({ shopTogg: !this.state.shopTogg });
		await this.props.fetchBizs();
	};

	render() {
		// console.log("U INFO:", this.props.userInfo.heart_ids);
		// console.log("BIZ ID:",this.props.ubiz.id);
		// console.log("BUSINESS NAME:", this.state.ubiz.business.name);
		// console.log("♥️  or 💔:", this.props.hearted ? "♥️ " : "💔");

		// console.log(
		// 	"BADGE PROPS ",
		// 	this.props.ubiz.business.name,
		// 	":",
		// 	this.state.badgeCounts
		// );

		const colors = ["green", "blue", "firebrick", "slateblue", "gold"];
		const trueColors = ["green", "blue", "red", "ultraviolet", "gold"];
		let colorItr = -1;

		const numFormat = (n) => {
			if (n < 1e3) return n;
			if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
			if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
			if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
			if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
		};

		return (
			<View
				style={{
					flex: 1,
					position: "absolute",
					alignSelf: "flex-end",
					height: vh(30),
					width: vw(33),
					backgroundColor: "black",
					opacity: 0.95,
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
						// ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥
						this.setState({ hearted: !this.state.hearted });

						this.state.hearted
							? this.deleteHeart(this.props.fetchBizs, this.props.fetchUserInfo)
							: this.incHearts(this.props.fetchBizs, this.props.fetchUserInfo);

						// this.incHearts(this.props.fetchBizs, this.props.fetchUserInfo);
					}}
				>
					<Icon
						name={this.state.hearted ? "heart" : "hearto"}
						type="antdesign"
						color="red"
						size={37}
					/>
				</TouchableOpacity>
				<Text
					style={{
						position: "absolute",
						textAlign: "center",
						fontSize: 25,
						color: "lightslategray",
						fontWeight: "bold",
						top: vh(6),
						height: vh(5),
						// width: vw(13),
						alignSelf: "center",
						// backgroundColor: "blue",
					}}
				>
					{this.props.ubiz.business.hearts > 0 &&
						numFormat(
							this.state.hearts > this.props.ubiz.business.hearts
								? this.state.hearts
								: this.props.ubiz.business.hearts
						)}
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
					// disabled={true}
					onPress={() => {
						// // 💯💯💯💯💯💯💯💯💯💯💯💯💯💯UINFO/UBIZ LOGS⬇
						// console.log(
						// 	"temp userinfo displayer. NTS: change back to bizpage comment navigator",
						// 	this.props.userInfo
						// );
						// console.log(
						// 	"temp ubiz displayer. NTS: change back to bizpage comment navigator",
						// 	this.props.ubiz
						// );
						this.props.handleNavigation(true);
					}}
				>
					<Icon
						name="chat"
						type="materialcommunityicons"
						color="olivedrab"
						size={37}
					/>
				</TouchableOpacity>

				<Text
					style={{
						position: "absolute",
						textAlign: "center",
						fontSize: 25,
						color: "lightslategrey",
						fontWeight: "bold",
						top: vh(15),
						height: vh(5),
						// width: vw(13),
						alignSelf: "center",
					}}
				>
					{this.props.ubiz.business.comments > 0 &&
						numFormat(this.props.ubiz.business.comments)}
				</Text>

				<ScrollView
					style={{
						position: "absolute",
						top: vh(20),
						backgroundColor: "black",
						width: vw(33),
					}}
					contentContainerStyle={{
						height: vh(10),
						flexGrow: 1,
						justifyContent: "center",
						paddingLeft: vw(4.5),
						paddingRight: vw(0.5),
					}}
					automaticallyAdjustInsets={false}
					horizontal={true}
					pagingEnabled={true}
					scrollEnabled={true}
					decelerationRate={0.998}
					snapToAlignment={"center"}
					snapToInterval={33}
					scrollEventThrottle={1}
				>
					{colors.map((color, key = index) => {
						colorItr++;
						// let badgeObj = this.state.badgeCounts.find(
						// 	(badgeObj) => badgeObj.color == trueColors[colorItr]
						// );

						// trueColors[colorItr] in this.state.badgeCounts

						return (
							<TouchableOpacity
								key={key}
								style={styles.badge}
								onPress={() => {
									// IAP.requestPurchase(badge.productId);
									// console.log("color key🔑🚀:", key);
									this.setState({ badgeKeyPressed: key });
									Vibration.vibrate();
									this.handleShopTogg();
								}}
							>
								<Icon
									name="rocket1"
									type="ant-design"
									color={color}
									size={45}
									// reverse
									// reverseColor="lawngreen"
									style={[colorItr == 0 ? { marginRight: vw(10) } : {}]}
								/>

								{trueColors[colorItr] in this.state.badgeCounts && (
									<Badge
										value={numFormat(
											this.state.badgeCounts[trueColors[colorItr]]
										)}
										status="success"
										containerStyle={[
											colorItr == 0 ? styles.greenBadgeInd : styles.badgeInd,
										]}
									/>
								)}
							</TouchableOpacity>
						);
					})}
				</ScrollView>
				{this.state.shopTogg && (
					<BadgeShop
						ubiz={this.props.ubiz}
						handleShopTogg={this.handleShopTogg}
						badgeKeyPressed={this.state.badgeKeyPressed}
					/>
				)}
			</View>
		);
	}
}

export default connect(mapStateToProps, {
	fetchBizs,
	setUserInfo,
	fetchUserInfo,
})(ListBizDash);

const styles = StyleSheet.create({
	badge: {
		width: vw(33),
		height: vh(10),
		opacity: 1.0,
		justifyContent: "center",
		alignItems: "center",
	},
	greenBadgeInd: {
		position: "relative",
		bottom: vh(1),
		left: vw(2),
	},
	badgeInd: { position: "relative", bottom: vh(1), left: vw(7) },
});

function mapStateToProps(state) {
	return {
		category: state.category,
		userInfo: state.userInfo,
	};
}
