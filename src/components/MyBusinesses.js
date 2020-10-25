import React, { useState, useEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import ListBiz from "./ListBiz.js";

const MyBusinesses = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [userHearts, setUserHearts] = useState([]);
	// const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	// useEffect(() => {
	// 	return () => {
	// 		// console.log("PROFILE PARAMS ARE🎯", props.route.params.userShowInfo);

	// 		setUserShow(props.userInfo);
	// 	};
	// });

	// console.log("HEARTS IS🤎♥️🧡", props.userHearts[0]);
	// console.log("userbizs is 💼💼💼", props.userBizs);
	return (
		<View // START OF BIZLIST
			style={{
				// flex: 1,
				height: vh(47),
				width: vw(100),
				// position: "absolute",
				backgroundColor: "rgba(255,255,255,0.02)", //MAROON
				zIndex: 1,
				top: vh(1.5), // POSITION 📈
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "rgba(0, 0, 0, 0.9)",
					// marginTop: vh(1.2),
				}}
			>
				<Text style={styles.title}>
					MY BUSINESSES(
					{props.userBizs.length})
				</Text>

				<TouchableOpacity onPress={() => props.handleAddBusinessTogg()}>
					<Icon
						name="plus-circle"
						type="feather"
						color="lightslategray"
						size={37}
						style={styles.add}
					/>
				</TouchableOpacity>
			</View>

			<FlatList
				indicatorStyle="white"
				horizontal={true}
				// style={styles.list}
				contentContainerStyle={{
					backgroundColor: "rgba(255, 255, 255, 0.02)",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					// height: vh(47),

					// position: "relative",
				}}
				data={props.userBizs}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListBiz biz={item} navigation={navigation} lastScreen={"Profile"} />
				)}
				extraData={props.userBizs}
				legacyImplementation={true}
			/>
			{/* {props.loading && (
				<View style={styles.activityView}>
					<ActivityIndicator
						size="large"
						color="#00ff00"
						hidesWhenStopped={true}
					/>
				</View>
			)} */}
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(MyBusinesses);

const styles = StyleSheet.create({
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
	title: {
		position: "absolute",
		textAlign: "center",
		flex: 1,
		fontWeight: "bold",
		fontFamily: "Marker Felt",
		fontSize: 24,
		backgroundColor: "red",
		backgroundColor: "black",
		color: "olivedrab",
		width: vw(100),
		justifyContent: "center",
		height: vh(6.1),
		lineHeight: vh(5.5),

		// left: vw(4.3),
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userBizs: state.userBizs,
		userInfo: state.userInfo,
	};
}
