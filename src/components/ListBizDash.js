import React from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { Icon, ThemeConsumer } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { fetchBizs, setUserInfo } from "../redux/actions/bizAction";
import { connect } from "react-redux";
import axios from "axios";
import BadgeShop from "./BadgeShop.js";

class ListBizDash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userHearts: [],
			page: 1,
			error: null,
			search: "",
			catTogg: false,
			comments: 0,
			shopTogg: false,
		};
	}

	componentDidMount() {
		return this.setState({
			biz: this.props.biz,
			hearts: this.props.biz.business.hearts,
			comments: this.props.biz.business.comments.length,
		});
	}

	fetchHearts = () => {
		axios
			.get(`http://192.168.1.211:3000/users/1`)
			.then((response) => {
				this.setState({ userHearts: response.data.user_hearts });
			})
			.catch((error) => {
				this.setState({ error: error });
			});
	};

	incHearts = (fetchBizs) => {
		const axios = require("axios");
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://192.168.1.211:3000/businesses/${this.props.biz.business.id}`,
				{
					business: {
						id: this.props.biz.business.id,
						hearts: this.state.hearts + 1,
					},
				},
				{ headers: { "Content-Type": "application/json" } }
			)
			.then(function (response) {
				fetchBizs(false); //PASSED AS A FUNCTION TO onPress! Don't change to this.props...
			})
			.catch((error) => {
				console.log(error.response);
			});
		axios
			.post(`http://192.168.1.211:3000/user_hearts`, {
				user_heart: { user_id: 1, user_biz_id: this.props.biz.id },
			})
			.then(function (response) {
				let userRsp = axios(
					`http://192.168.1.211:3000/users/${this.props.userInfo.id}`
				)
					.then((resp) => {
						this.props.setUserInfo(resp.data);
					})
					.catch((error) => console.log(error));
			});
	};

	handleShopTogg = () => {
		return this.setState({ shopTogg: !this.state.shopTogg });
	};

	render() {
		// console.log(this.props.biz.id);
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
						this.incHearts(this.props.fetchBizs);
					}}
				>
					<Icon name="heart" type="feather" color="red" size={37} />
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
						width: vw(13),
						alignSelf: "center",
					}}
				>
					{this.state.hearts > this.props.biz.business.hearts
						? this.state.hearts
						: this.props.biz.business.hearts}
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
						width: vw(13),
						alignSelf: "center",
					}}
				>
					{this.state.comments}
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
					<TouchableOpacity
						style={styles.badge}
						onPress={() => {
							console.log("lets shop. togg is:", this.state.shopTogg);
							this.handleShopTogg();
						}}
					>
						<Icon
							name="rocket1"
							type="ant-design"
							color="green"
							size={45}
							// reverse
							// reverseColor="lawngreen"
							style={{ marginRight: vw(10) }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.badge}
						onPress={() => {
							this.handleShopTogg();
						}}
					>
						<Icon
							name="rocket1"
							type="ant-design"
							color="blue"
							size={45}
							// reverse
							// reverseColor="dodgerblue"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.badge}
						onPress={() => {
							this.handleShopTogg();
						}}
					>
						<Icon
							name="rocket1"
							type="ant-design"
							color="firebrick"
							size={45}
							// reverse
							// reverseColor="lightcoral"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.badge}
						onPress={() => {
							this.handleShopTogg();
						}}
					>
						<Icon
							name="rocket1"
							type="ant-design"
							color="slateblue"
							size={45}
							// reverse
							// reverseColor="darkmagenta"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.badge}
						onPress={() => {
							this.handleShopTogg();
						}}
					>
						<Icon
							name="rocket1"
							type="ant-design"
							color="gold"
							size={45}
							// reverse
							// reverseColor="darkorange"
						/>
					</TouchableOpacity>
				</ScrollView>
				{this.state.shopTogg && (
					<BadgeShop handleShopTogg={this.handleShopTogg} />
				)}
			</View>
		);
	}
}

export default connect(mapStateToProps, { fetchBizs, setUserInfo })(
	ListBizDash
);

const styles = StyleSheet.create({
	badge: {
		width: vw(33),
		height: vh(10),
		opacity: 1.0,
		justifyContent: "center",
		alignItems: "center",
	},
});

function mapStateToProps(state) {
	return { category: state.category, userInfo: state.userInfo };
}
