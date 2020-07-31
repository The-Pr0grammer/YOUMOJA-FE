import React, { Component } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import ListBiz from "./ListBiz.js";
import { connect } from "react-redux";
import { fetchBizs } from "../redux/actions/bizAction";
import PropTypes from "prop-types";
import CategoriesList from "./CategoriesList.js";
import Header from "./Header.js";
import Search from "./Search.js";

class Businesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikes: [],
			page: 1,
			error: null,
			search: "",
			catTogg: false,
		};
	}

	componentDidMount() {
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

	handleCatsTogg = () => {
		return this.setState({ catTogg: !this.state.catTogg });
	};

	render() {
		console.log(this.props.reduxState.category);
		// console.log(this.state.catTogg);

		return (
			(this.props.reduxState.isFetching && (
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
			(!this.props.reduxState.isFetching && (
				<View
					style={{
						width: "100%",
						height: "100%",
						flex: 1,
						backgroundColor: "black",
						justifyContent: "center",
					}}
				>
					<CategoriesList
						handleCatsTogg={this.handleCatsTogg}
						catTogg={this.state.catTogg}
						navigation={this.props.navigation}
					/>
					<Header
						navigation={this.props.navigation}
						handleCatsTogg={this.handleCatsTogg}
					/>
					<Search />
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
						data={this.props.filteredBizs}
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
	reduxState: PropTypes.object.isRequired,
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
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		filteredBizs: state.businesses.filter((biz) =>
			biz.business.categories.includes(state.category)
		),
	};
}
