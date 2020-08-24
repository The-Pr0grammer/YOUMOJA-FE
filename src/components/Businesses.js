import React, { Component } from "react";
import axios from "axios";
import {
	View,
	FlatList,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ActivityIndicator,
	Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import {
	fetchBizs,
	setUserInfo,
	setIsFetching,
} from "../redux/actions/bizAction";
import { connect } from "react-redux";
// import { getUsers } from "../api/users.js";
import PropTypes from "prop-types";
import ListBiz from "./ListBiz.js";
import CategoriesList from "./CategoriesList.js";
import Menu from "./Menu.js";
import Search from "./Search.js";
import FocusedSearch from "./FocusedSearch.js";
import Sorter from "./Sorter.js";
import * as firebase from "firebase";
import { Alert } from "react-native";

class Businesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLikes: [],
			page: 1,
			error: null,
			searchFocus: false,
			catTogg: false,
			userLoadingErrorMessage: "",
			// users: [],
			// hasLoadedUsers: false,
		};
	}

	loadUser = async (id) => {
		try {
			let response = await axios(`http://localhost:3000/users/${id}`);
			// console.log("response is", response )
			this.props.setUserInfo({
				...this.props.userInfo,
				name: response.data.name,
				username: response.data.username,
			});
		} catch (error) {
			this.setState({ userLoadingErrorMessage: error.message });
		}
	};

	componentDidMount() {
		this.props.setUserInfo({
			email: "anthonyh202x@gmail.com",
			emailVerified: true,
			id: 17,
			name: "AnthonyTheProgrammer👨🏾‍💻",
			username: "ADOT",
		});

		// !this.props.userInfo
		// 	? this.props.navigation.navigate("Login", { message: "Please log in" })
		// 	: null;
		this.loadUser(this.props.userInfo.id);
		this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: "" });
		// this.loadUsers();
		// console.log("USER INFO ON LOGIN IS", this.props.userInfo);
		this.props.fetchBizs();
		// this.didFocusSubscription = this.props.navigation.addListener(
		// 	"didfocus",
		// 	() => {
		// 		// if (this.state.hasLoadedUsers != true) {
		// 		// 	this.loadUsers();
		// 		// }
		// 	}
		// );
	}

	// loadUsers() {
	// 	this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: "" });
	// 	getUsers().then((res) => {
	// 		if (res.status === 401) {
	// 			this.props.navigation.navigate("Login");
	// 		} else {
	// 			this.setState({
	// 				hasLoadedUsers: false,
	// 				userLoadingErrorMessage: res.message,
	// 			});
	// 		}
	// 		this.setState({
	// 			hasLoadedUsers: true,
	// 			users: res.data,
	// 		});
	// 	});
	// }

	// handleUserLoadingError = (res) => {
	// 	console.log("in loading error", res);
	// 	if (res.status === 401) {
	// 		this.props.navigation.navigate("Login");
	// 	} else {
	// 		this.setState({
	// 			hasLoadedUsers: false,
	// 			userLoadingErrorMessage: res.message,
	// 		});
	// 	}
	// };

	componentWillUnmount() {
		// this.setState({ hasLoadedUsers: false, users: [] })
		// return this.didFocusSubscription.remove()
	}

	handleCatsTogg = () => {
		return this.setState({ catTogg: !this.state.catTogg });
	};

	handleSearchFocus = () => {
		return this.setState({ searchFocus: !this.state.searchFocus });
	};

	// handleFetchingToggle = (togg) => {
	// 	return this.props.setIsFetching(togg);
	// };

	render() {
		const { isFocused } = this.props;
		{
			// isFocused && console.log("focused");
			// this.props.fetchBizs();
		}
		let emptyCheck = this.props.filteredBizs.length;
		// console.log(
		// 	"HEARTS ARE",
		// 	this.props.reduxState.businesses.map((biz) => biz.business.hearts)
		// );
		// console.log("isFETCHING", this.props.reduxState.isFetching);
		// console.log("USERS:", this.state.users[0]);
		// console.log("THIS.STATE.USER IS", this.state.user);
		{
		}
		// Alert.prompt("Change Email", "Enter the email you would like to use", [
		// 	{
		// 		text: "Cancel",
		// 		style: "cancel",
		// 	},
		// 	{
		// 		text: "OK",
		// 		onPress: (newEmail) => {
		// 			emailPatch(newEmail);
		// 		},
		// 	},
		// ]);
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
						<Menu
							navigation={this.props.navigation}
							handleCatsTogg={this.handleCatsTogg}
						/>
						<Search handleSearchFocus={this.handleSearchFocus} />
						{this.state.searchFocus && (
							<FocusedSearch handleSearchFocus={this.handleSearchFocus} />
						)}
						<Sorter />
					</View>
					{emptyCheck > 0 && (
						<ImageBackground
							source={require("../images/Jarrell-Wadsworth-Revolutionary-Print-Lusenhop-Tate-Loan-Tiff.jpg")}
							style={styles.bg}
						></ImageBackground>
					)}
					{emptyCheck < 1 && this.props.reduxState.isFetching == false && (
						<View>
							<Icon
								name="binoculars"
								type="font-awesome"
								color="darkslategray"
								size={112}
								style={{ marginTop: vh(5) }}
							/>
							<Text style={styles.empty}>NO RESULTS</Text>
						</View>
					)}

					{emptyCheck > 0 && (
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
							extraData={
								this.props.sorters ||
								this.props.reduxState.businesses[1].business.hearts
							}
							legacyImplementation={true}
						/>
					)}
				</View>
			))
		);
	}
}

export default connect(mapStateToProps, {
	fetchBizs,
	setUserInfo,
	setIsFetching,
})(function (props) {
	const isFocused = useIsFocused();

	return <Businesses {...props} isFocused={isFocused} />;
});

// export default function (props) {
// 	const isFocused = useIsFocused();

// 	return <Businesses {...props} isFocused={isFocused} />;
// }

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
	empty: {
		backgroundColor: "transparent",
		color: "lightslategray",
		fontSize: 64,
		fontFamily: "Marker Felt",
		alignSelf: "center",
		textAlign: "center",
		width: vw(64),
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		userInfo: state.userInfo,
		isFetching: state.isFetching,
		sorters: {
			likesSort: state.likesSort,
			badgesSort: state.badgesSort,
			locationSort: state.locationSort,
		},
		filteredBizs: state.businesses
			.sort((a, b) => b.business.name < a.business.name)
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
