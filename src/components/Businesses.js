import React, { Component } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { Card, SearchBar, Icon, Button } from "react-native-elements";
import axios from "axios";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import ListBiz from "./ListBiz.js";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { fetchBizs } from "../redux/actions/bizAction";
import PropTypes from "prop-types";
import Categories from "./Categories.js";

class Businesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikes: [],
			page: 1,
			error: null,
			search: "",
			catToggle: false,
		};
	}

	componentDidMount() {
		// this.fetchBizs(this.state.page);

		this.props.fetchBizs();

		this.willFocusSubscription = this.props.navigation.addListener(
			"focus",
			() => {
				this.props.fetchBizs();
			}
		);
	}

	componentWillUnmount() {
		// this.willFocusSubscription.remove();
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

	updateSearch = (e) => {
		return this.setState({ search: e });
	};

	render() {
		// console.log(this.props.bizs);

		return (
			(this.props.bizs.isFetching && (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						backgroundColor: "maroon",
					}}
				>
					<ActivityIndicator
						size="large"
						color="#00ff00"
						hidesWhenStopped={true}
					/>
				</View>
			)) ||
			(!this.props.bizs.isFetching && (
				<View
					style={{
						width: "100%",
						height: "100%",
						flex: 1,
						backgroundColor: "black",
						justifyContent: "center",
					}}
				>
					<View
						style={{
							zIndex: 1,
							justifyContent: "center",
							alignItems: "center",
							width: vw(104),
							postion: "absolute",
							display: "flex",
							flexDirection: "row",
							right: vw(2),
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								top: vh(6.8),
								left: vw(1),
								height: vh(7.5),
								width: vw(16),
								backgroundColor: "brown",
								zIndex: 2,
								opacity: 0.9,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={this.props.navigation.openDrawer}
						>
							<Icon
								style={{ left: vw(0) }}
								name="menu"
								type="feather"
								color="red"
								size={34}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								position: "absolute",
								top: vh(6.8),
								height: vh(7.5),
								width: vw(100),
								backgroundColor: "magenta",
								flexDirection: "row",
								zIndex: 1,
								opacity: 0.9,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									textAlign: "center",
									width: vw(56),
									fontSize: 20,
									marginLeft: vw(9.3),
								}}
							>
								CATEGORIES
							</Text>
							<View style={{ left: vw(10) }}>
								<Icon
									name="circledown"
									type="antdesign"
									color="red"
									size={34}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.searchDiv}>
						<SearchBar
							round
							searchIcon={{ size: 18 }}
							onChangeText={this.updateSearch}
							onSubmitEditing={(e) => this.props.fetchBizs(this.state.page)}
							placeholder={"     Search by keyword or location"}
							value={this.state.search}
							inputContainerStyle={{
								borderRadius: 100,
								height: vh(6.5),
								backgroundColor: "aqua",
								marginHorizontal: 0,
							}}
							containerStyle={{
								backgroundColor: "black",
								padding: 2,
							}}
						/>
					</View>
					<ImageBackground
						source={require("../images/Jarrell-Wadsworth-Revolutionary-Print-Lusenhop-Tate-Loan-Tiff.jpg")}
						style={styles.bg}
					></ImageBackground>

					<FlatList
						style={styles.list}
						contentContainerStyle={{
							backgroundColor: "rgba(0, 0, 0, 0)",
							alignItems: "left",
							justifyContent: "left",
						}}
						data={this.props.bizs.businesses}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<ListBiz
								biz={item}
								navigation={this.props.navigation}
								incComments={this.props.incComments}
							/>
						)}
						legacyImplementation={true}
					/>
				</View>
			))
		);
	}
}

export default connect(mapStateToProps, { fetchBizs })(Businesses);

Businesses.propTypes = {
	fetchBizs: PropTypes.func.isRequired,
	bizs: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	bg: {
		resizeMode: "cover",
		opacity: 0.3,
		padding: 0,
		borderWidth: 0,
		width: "100%",
		height: vh(105),
	},
	list: {
		// alignSelf: "auto",
		marginTop: "30%",
		position: "absolute",
		opacity: 1.0,
		height: "80%",
		width: "100%",
		top: vh(2),
	},
	cardText: {
		width: vw(100),
		height: vh(5),
		backgroundColor: "gray",
		opacity: 0.85,
		padding: 0,
		textAlign: "center",
		fontSize: vh(3),
	},
	searchDiv: {
		position: "absolute",
		zIndex: 1,
		opacity: 1.0,
		width: "100%",
		height: vh(14),
		top: vh(6.6),
		// backgroundColor: "gold",
	},
});

function mapStateToProps(state) {
	return { bizs: state };
}
