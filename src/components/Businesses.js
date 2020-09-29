import React, { Component } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	ImageBackground,
	Dimensions,
	ActivityIndicator,
	Text,
	Linking,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import {
	fetchBizs,
	setUserInfo,
	setIsFetching,
} from "../redux/actions/bizAction";
// import { getUsers } from "../api/users.js";
import PropTypes from "prop-types";
import ListBiz from "./ListBiz.js";
import CategoriesList from "./CategoriesList.js";
import Menu from "./Menu.js";
import Search from "./Search.js";
import FocusedSearch from "./FocusedSearch.js";
import Sorter from "./Sorter.js";
import axios from "axios";
import * as firebase from "firebase";

class Businesses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userHearts: [],
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
			let response = await axios(`http://127.0.0.1:3000/users/${id}`);
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

	componentDidMount(props) {
		Linking.addEventListener("url", this.handleOpenURL);

		let response = axios(`http://127.0.0.1:3000/users/${1}`)
			.then((resp) => this.props.setUserInfo(resp.data))
			.catch((error) => console.log(error));
		// this.props.setUserInfo({
		// 	email: "anthonyh202x@gmail.com",
		// 	emailVerified: true,
		// 	id: 1,
		// 	name: "AnthonyTheProgrammer👨🏾‍💻",
		// 	username: "ADOT",
		// 	img_url:
		// 		"https://img.wallpapersafari.com/phone/640/1136/96/25/ALzlCK.jpg",
		// });

		// !this.props.userInfo
		// 	? this.props.navigation.navigate("Login", { message: "Please log in" })
		// 	: null;
		// this.loadUser(this.props.userInfo.id);
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
		Linking.removeEventListener("url", this.handleOpenURL);
		// this.setState({ hasLoadedUsers: false, users: [] })
		// return this.didFocusSubscription.remove()
	}

	handleOpenURL(event) {
		console.log("event is", event);
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
			// isFocused && this.props.fetchBizs();
		}
		let emptyCheck = this.props.filteredBizs.length;
		// console.log(
		// 	"HEARTS ARE",
		// 	this.props.reduxState.businesses.map((biz) => biz.business.hearts)
		// );
		// console.log("isFETCHING", this.props.reduxState.isFetching);
		// console.log("USERS:", this.state.users[0]);
		// console.log("USER INFO 👤💯", this.props.userInfo);
		// console.log("USER HEARTS ARE🧡", this.props.reduxState.userHearts[0]);
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
					<View style={{ position: "absolute" }}>
						<ImageBackground
							source={require("../images/BlackPowerSplash.gif")}
							style={styles.bg}
						></ImageBackground>
					</View>
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
						<View style={{ backgroundColor: "black", flex: 1 }}>
							<Icon
								name="binoculars"
								type="font-awesome"
								color="darkslategray"
								size={112}
								style={{ marginTop: vh(5) }}
							/>
							<Text style={styles.empty}>NO RESULTS</Text>
							<View style={{ position: "absolute" }}>
								<ImageBackground
									source={require("../images/NoResults.gif")}
									style={styles.emptyBg}
								></ImageBackground>
							</View>
						</View>
					)}

					{emptyCheck > 0 && (
						<FlatList
							style={styles.list}
							contentContainerStyle={{
								backgroundColor: "rgba(0, 0, 0, 0)",
								alignItems: "flex-start",
								justifyContent: "flex-start",
							}}
							data={this.props.filteredBizs}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<ListBiz
									biz={item}
									navigation={this.props.navigation}
									lastScreen={"Home"}
								/>
							)}
							extraData={this.props.sorters}
							// legacyImplementation={true}
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
		position: "absolute",
		flex: 1,
		height: "100%",
		width: "100%",
		backgroundColor: "black",
		flexDirection: "column",
	},
	bg: {
		flex: 1,
		resizeMode: "cover",
		opacity: 0.3,
		padding: 0,
		borderWidth: 0,
		width: vw(100),
		height: vh(85),
		justifyContent: "center",
	},
	emptyBg: {
		backgroundColor: "olivedrab",
		resizeMode: "cover",
		opacity: 0.25,
		padding: 0,
		borderWidth: 0,
		width: vw(100),
		height: vh(70),
		justifyContent: "center",
	},
	list: {
		position: "absolute",
		top: vh(21.8),
		height: vh(68.6),
		width: vw(100),
		// opacity: 1.0,
	},
	activityView: {
		flex: 1,
		height: vh(100),
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.92)",
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
		paddingTop: vh(2.5),
		backgroundColor: "transparent",
		color: "olivedrab",
		fontSize: 64,
		fontFamily: "Marker Felt",
		alignSelf: "center",
		textAlign: "center",
		width: vw(64),
		// lineHeight: vh(12),
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		userInfo: state.userInfo,
		isFetching: state.isFetching,
		sorters: {
			heartsSort: state.heartsSort,
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
				return state.heartsSort
					? b.business.hearts - a.business.hearts
					: b.business.name < a.business.name;
			}),
	};
}
