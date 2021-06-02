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
	setUserHearts,
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
			cooldown: false,
			comments: props.ubiz.business.comments,
			badgeCounts: props.ubiz.business.badges,
		};
	}

	componentDidMount() {
		// this.setState({
		// 	hearts: this.props.ubiz.business.hearts,
		// });
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.ubiz.business.badges !== prevProps.ubiz.business.badges) {
			this.setState({
				badgeCounts: this.props.ubiz.business.badges,
			});
		}
		if (this.props.hearted !== prevProps.hearted) {
			// 	console.log("prevProps:::👀", prevProps.ubiz.business.hearts);

			this.setState({
				hearted: this.props.hearted,
				hearts: this.props.hearts || this.state.hearts,
			});
		}
	}

	// ❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶
	incHearts = async (fetchBizs, fetchUserInfo, getHearts) => {
		console.log("❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶❶");
		const axios = require("axios");
		let ubiz = this.props.ubiz && this.props.ubiz;
		let hearts = ubiz.business.hearts;
		let userInfo = this.props.userInfo && this.props.userInfo;

		console.log("♥️  HEARTS INCED", hearts + 1);

		this.setState({
			hearts: this.state.hearts + 1,
		});

		await axios
			.post(`http://192.168.1.211:3000/user_hearts`, {
				user_heart: {
					user_id: userInfo.id,
					business_id: ubiz.business.id,
				}, //NEEDS TO BE REFACTORED TO POST W/ LOGGED IN USER ID NOT A HARDCODED "1"
			})
			.then(async (response) => {
				// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬇
				await axios
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
					.then(async (response) => {
						fetchBizs(false); //PASSED AS A FUNCTION from onPress! Don't change to this.props...

						getListings();

						getHearts();

						await fetchUserInfo(userInfo.id); //PASSED AS A FUNCTION from onPress! Don't change to this.props...
					})
					.catch((error) => {
						console.log("ERROR⚠️", error);
					});
				// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬆

				console.log(`created heart ♥️ #: ${response.data.id}`);
			})
			.catch((error) => {
				console.log("ERROR⚠️", error);
			});

		setTimeout(() => {
			this.setState({ cooldown: false });
		}, 125);
	};

	// ❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷
	deleteHeart = async (fetchBizs, fetchUserInfo, getHearts) => {
		console.log("❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷❷");
		const axios = require("axios");
		let ubiz = this.props.ubiz && this.props.ubiz;
		let hearts = ubiz.business.hearts;
		let userInfo = this.props.userInfo && this.props.userInfo;

		console.log("💔HEARTS DECCED", ubiz.business.hearts - 1);

		getListings();

		await userInfo.heart_ids
			.filter((uh) => uh.business.id === ubiz.id)
			.map((uh) => {
				axios
					.delete(`http://192.168.1.211:3000/user_hearts/${uh.id}`)
					.then(async (res) => {
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
							.then(async (response) => {
								this.setState({
									hearts: this.state.hearts - 1,
								});

								fetchBizs(false); //PASSED AS A FUNCTION from onPress! Don't change to this.props...

								getHearts();

								await fetchUserInfo(userInfo.id); //PASSED AS A FUNCTION from onPress! Don't change to this.props...

								console.log(`deleted heart 💔 #: ${uh.id}`);
							})
							.catch((error) => {
								console.log("ERROR⚠️⚠️⚠️", error);
							});
						// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬆
					})
					.catch((error) =>
						this.setState({ error: "Something went wrong. Please try again." })
					);
			});

		setTimeout(() => {
			this.setState({ cooldown: false });
		}, 125);
	};

	// ❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸
	deletePH = async (fetchBizs, fetchUserInfo, getHearts, getListings) => {
		console.log("❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸❸");

		const axios = require("axios");
		let ubiz = this.props.ubiz && this.props.ubiz;
		let hearts = ubiz.business.hearts;
		let userInfo = this.props.userInfo && this.props.userInfo;

		console.log("P💔HEARTS DECCED", ubiz.business.hearts - 1);

		getListings();

		this.setState({
			hearts: this.state.hearts - 1,
		});

		//NTS: When refactoring or debugging, keep in mind that these IDS (uh.id, ubiz.business.id, uh.business.id and ubiz.id) all point to different keys.
		await userInfo.heart_ids
			.filter((uh) => uh.business.id == ubiz.business.id)
			.map((uh) => {
				axios
					.delete(`http://192.168.1.211:3000/user_hearts/${uh.id}`)
					.then(async (res) => {
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
							.then(async (response) => {
								fetchBizs(false); //PASSED AS A FUNCTION from onPress! Don't change to this.props...

								getHearts();

								await fetchUserInfo(userInfo.id); //PASSED AS A FUNCTION from onPress! Don't change to this.props...

								console.log(`deleted heart 💔 #: ${uh.id}`);
							})
							.catch((error) => {
								console.log("ERROR⚠️⚠️⚠️", error);
							});
						// 💯💯💯💯💯💯💯💯💯💯💯💯💯💯BIZ HEARTS SUM PATCH⬆
					})
					.catch((error) =>
						this.setState({ error: "Something went wrong. Please try again." })
					);
			});
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
		// console.log("ListBiz PROPS👊🏾:", this.props.getIds);
		// console.log("U INFO:", this.props.userInfo.heart_ids);
		// this.props.ubiz.business.id == 1 &&
		// 	console.log("LBD UBIZ 🐞:", this.props.ubiz.business.hearts);
		// console.log("BUSINESS NAME:", this.state.ubiz.business.name);
		// this.props.ubiz.business.id == 1 &&
		// this.props.purpose !== "ProfileHearts" &&
		// 	console.log(
		// 		"LIST BIZ DASH BUSINESS HEARTS ATTR ♥️ :",
		// 		this.props.ubiz.business.hearts
		// 	);
		// this.props.ubiz.business.id == 1 &&
		// 	this.props.purpose !== "ProfileHearts" &&
		// 	console.log("LIST BIZ DASH HEART STATE ♥️ :", this.state.hearts);
		// console.log("♥️  or 💔:", this.props.hearted ? "♥️ " : "💔");
		// console.log("cooldown 🥶:", this.state.cooldown);
		// console.log("purpose", this.props.purpose);

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
					activeOpacity={!this.state.cooldown ? 0.2 : 1}
					onPress={() => {
						// ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥ 🚨

						if (this.state.cooldown == false) {
							if (this.props.purpose == "ProfileHearts") {
								this.deletePH(
									this.props.fetchBizs,
									this.props.fetchUserInfo,
									this.props.getHearts,
									this.props.getListings
								);

								// this.setState({ cooldown: true });
							} else {
								this.setState({ hearted: !this.state.hearted });

								this.state.hearted
									? this.deleteHeart(
											this.props.fetchBizs,
											this.props.fetchUserInfo,
											this.props.getHearts,
											this.props.getListings
									  )
									: this.incHearts(
											this.props.fetchBizs,
											this.props.fetchUserInfo,
											this.props.getHearts,
											this.props.getListings
									  );

								this.setState({ cooldown: true });
							}
						}
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
					{this.props.ubiz.business.hearts > 0 && numFormat(this.state.hearts)}
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
	setUserHearts,
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
