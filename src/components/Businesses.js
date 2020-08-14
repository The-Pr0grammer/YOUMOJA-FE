import React, { Component } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import { fetchBizs } from "../redux/actions/bizAction";
import { getUsers } from "../api/users.js";
import PropTypes from "prop-types";
import ListBiz from "./ListBiz.js";
import CategoriesList from "./CategoriesList.js";
import Header from "./Header.js";
import Search from "./Search.js";
import FocusedSearch from "./FocusedSearch.js";
import Sorter from "./Sorter.js";
import * as firebase from "firebase";

class Businesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			hasLoadedUsers: false,
			userLoadingErrorMessage: "",
			userLikes: [],
			page: 1,
			error: null,
			searchFocus: false,
			catTogg: false,
		};
	}

	

	componentDidMount() {
		this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: "" });
		this.loadUsers();
		this.props.fetchBizs();

		this.didFocusSubscription = this.props.navigation.addListener(
			"didfocus",
			() => {
				if (this.state.hasLoadedUsers != true) {
					this.loadUsers();
				}
				this.props.fetchBizs();
			}
		);
	}

	loadUsers() {
		this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: "" });
		getUsers().then((res) => {
			if (res.status === 401) {
				this.props.navigation.navigate("Login");
			} else {
				this.setState({
					hasLoadedUsers: false,
					userLoadingErrorMessage: res.message,
				});
			}
			this.setState({
				hasLoadedUsers: true,
				users: res.data,
			});
		});
	}

	handleUserLoadingError = (res) => {
		console.log("in loading error", res);
		if (res.status === 401) {
			this.props.navigation.navigate("Login");
		} else {
			this.setState({
				hasLoadedUsers: false,
				userLoadingErrorMessage: res.message,
			});
		}
	};

	componentWillUnmount() {
		// this.setState({ hasLoadedUsers: false, users: [] })
		// return this.didFocusSubscription.remove()
	}

	handleCatsTogg = () => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (!user.emailVerified) {
				console.log("verified");
			} else {
				console.log("Not verified");
			}
		});
		return this.setState({ catTogg: !this.state.catTogg });
	};

	handleSearchFocus = () => {
		return this.setState({ searchFocus: !this.state.searchFocus });
	};

	render() {
		// console.log(this.props.reduxState);
		// console.log("USERS:", this.state.users[0]);

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
					<View style={styles.upperDiv}>
						<Header
							navigation={this.props.navigation}
							handleCatsTogg={this.handleCatsTogg}
						/>
						<Search handleSearchFocus={this.handleSearchFocus} />
						{this.state.searchFocus && (
							<FocusedSearch handleSearchFocus={this.handleSearchFocus} />
						)}
						<Sorter />
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
						extraData={this.props.sorters}
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
		position: "absolute",
		marginTop: vh(21.8),
		height: vh(68.6),
		width: vw(100),
		// opacity: 1.0,
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "maroon",
	},
	upperDiv: {
		flexDirection: "column",
		backgroundColor: "transparent",
	},
	topDrop: {
		position: "absolute",
		height: vh(10),
		width: vw(100),
		top: 150,
		backgroundColor: "blue",
		zIndex: 3,
	},
	botDrop: {
		position: "absolute",
		marginTop: vh(21.8),
		height: vh(68.6),
		width: vw(100),
		backgroundColor: "red",
		zIndex: 4,
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		sorters: {
			likesSort: state.likesSort,
			badgesSort: state.badgesSort,
			locationSort: state.locationSort,
		},
		filteredBizs: state.businesses
			.filter((biz) => biz.business.categories.includes(state.category))
			.filter(
				(biz) =>
					biz.business.summary
						.toUpperCase()
						.includes(state.search.toUpperCase()) ||
					biz.business.name
						.toUpperCase()
						.includes(state.search.toUpperCase()) ||
					biz.business.city.toUpperCase().includes(state.search.toUpperCase())
			)
			.sort((a, b) => {
				return state.likesSort
					? b.business.hearts - a.business.hearts
					: b.business.name < a.business.name;
			}),
	};
}
