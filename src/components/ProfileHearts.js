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

const ProfileHearts = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [userHearts, setUserHearts] = useState([]);
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	// useEffect(() => {
	// 	return () => {
	// 		// console.log("PROFILE PARAMS ARE🎯", props.route.params.userShowInfo);

	// 		setUserShow(props.userInfo);
	// 	};
	// });
	
	// console.log("HEARTS IS",props.userHearts)
	return (
		<View // START OF BIZLIST
			style={{
				// flex: 1,
				height: vh(47),
				width: vw(100),
				// position: "absolute",
				backgroundColor: "maroon", //MAROON
				zIndex: 1,
				// top: vh(7.9),
			}}
		>
			<FlatList
				horizontal={true}
				style={styles.list}
				contentContainerStyle={{
					backgroundColor: "rgba(0, 0, 0, 0.6)",
					alignItems: "left",
					justifyContent: "left",
				}}
				data={props.userHearts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListBiz biz={item} navigation={navigation} />
				)}
				// extraData={props.userHearts}
				legacyImplementation={true}
			/>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(ProfileHearts);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: vh(100),
		alignItems: "center",
		backgroundColor: "black",
		// marginTop: vh(10),
	},
	background: {
		flex: 1,
		height: vh(90),
		width: vw(100),
		alignItems: "center",
		resizeMode: "center",
	},
	menuButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "brown",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	disabledButton: {
		position: "relative",
		height: vh(7.5),
		width: vw(16),
		backgroundColor: "lavender",
		zIndex: 2,
		opacity: 0.9,
		justifyContent: "center",
		alignItems: "center",
	},
	profilePic: {
		borderRadius: 82,
		height: vh(25),
		width: vw(45),
		opacity: 1.0,
		zIndex: 2,
		top: vh(1),
	},
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userHearts: state.userHearts,
		userInfo: state.userInfo,
	};
}
