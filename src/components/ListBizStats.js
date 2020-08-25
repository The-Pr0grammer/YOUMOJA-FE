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
import { fetchBizs } from "../redux/actions/bizAction";
import { connect } from "react-redux";
import axios from "axios";

class ListBizStats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikes: [],
			page: 1,
			error: null,
			search: "",
			catTogg: false,
			comments: 0,
		};
	}

	componentDidMount() {
		return this.setState({
			biz: this.props.biz,
			hearts: this.props.biz.business.hearts,
			comments: this.props.biz.business.comments.length,
		});
	}

	fetchLikes = () => {
		axios
			.get(`http://localhost:3000/users/1`)
			.then((response) => {
				this.setState({ userLikes: response.data.user_likes });
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
				`http://localhost:3000/businesses/${this.props.biz.business.id}`,
				{
					hearts: this.state.hearts + 1,
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
			.post(`http://localhost:3000/user_likes`, {
				user_id: 1,
				business_id: this.props.biz.business.id,
			})
			.then(function (response) {
				// console.log(response);
			});
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					position: "absolute",
					alignSelf: "flex-end",
					height: vh(30),
					width: vw(33),
					backgroundColor: "black",
					opacity: 0.65,
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
						color: "gold",
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
						color="tomato"
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
					<TouchableOpacity style={styles.badge}>
						<Icon
							name="certificate"
							type="material-community"
							color="green"
							size={45}
							// reverse
							// reverseColor="lawngreen"
							style={{ marginRight: vw(10) }}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.badge}>
						<Icon
							name="certificate"
							type="material-community"
							color="blue"
							size={45}
							// reverse
							// reverseColor="dodgerblue"
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.badge}>
						<Icon
							name="certificate"
							type="material-community"
							color="firebrick"
							size={45}
							// reverse
							// reverseColor="lightcoral"
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.badge}>
						<Icon
							name="certificate"
							type="material-community"
							color="slateblue"
							size={45}
							// reverse
							// reverseColor="darkmagenta"
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.badge}>
						<Icon
							name="certificate"
							type="material-community"
							color="gold"
							size={45}
							// reverse
							// reverseColor="darkorange"
						/>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

export default connect(mapStateToProps, { fetchBizs })(ListBizStats);

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
	return { category: state.category };
}
