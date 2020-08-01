import React, { Component } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
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

	handleCatsTogg = () => {
		return this.setState({ catTogg: !this.state.catTogg });
	};

	render() {
		// console.log(this.props.reduxState.category);
		// console.log(this.state.catTogg);

		return (
			(this.props.reduxState.isFetching && (
				<View style={styles.activityView}>
					<ActivityIndicator
						size="large"
						color="#00ff00"
						hidesWhenStopped={true}
					/>
				</View>
			)) ||
			(!this.props.reduxState.isFetching && (
				<View style={styles.container}>
					<CategoriesList
						handleCatsTogg={this.handleCatsTogg}
						catTogg={this.state.catTogg}
						navigation={this.props.navigation}
					/>
					<View
						style={{ flexDirection: "column", backgroundColor: "transparent" }}
					>
						<Header
							navigation={this.props.navigation}
							handleCatsTogg={this.handleCatsTogg}
						/>
						<Search />
						<View
							style={{
								position: "relative",
								backgroundColor: "silver",
								height: vh(6.8),
								width: vw(100),
								flexDirection: "row",
							}}
						>
							<TouchableOpacity
								style={{
									height: vh(6.8),
									width: vw(25),
									borderWidth: 1,
									position: "relative",
									backgroundColor: "teal",
									zIndex: 1,
								}}
							></TouchableOpacity>
							<TouchableOpacity
								style={{
									height: vh(6.8),
									width: vw(25),
									borderWidth: 1,
									position: "relative",
									backgroundColor: "orange",
									zIndex: 1,
								}}
							></TouchableOpacity>
							<TouchableOpacity
								style={{
									height: vh(6.8),
									width: vw(25),
									borderWidth: 1,
									position: "relative",
									backgroundColor: "silver",
									zIndex: 1,
								}}
							></TouchableOpacity>
							<TouchableOpacity
								style={{
									height: vh(6.8),
									width: vw(25),
									borderWidth: 1,
									position: "relative",
									backgroundColor: "navy",
									zIndex: 1,
								}}
							></TouchableOpacity>
						</View>
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
						data={this.props.filteredBizs}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<ListBiz biz={item} navigation={this.props.navigation} />
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
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "black",
		flexDirection: "column",
		// justifyContent: "center",
	},
	bg: {
		resizeMode: "cover",
		opacity: 0.3,
		padding: 0,
		borderWidth: 0,
		width: vw(100),
		height: vh(85),
	},
	list: {
		marginTop: vh(21.7),
		position: "absolute",
		opacity: 1.0,
		height: vh(68.7),
		width: vw(100),
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "maroon",
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
