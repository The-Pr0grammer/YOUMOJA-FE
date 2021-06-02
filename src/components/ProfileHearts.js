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

	useEffect(() => {
		// console.log(
		// 	"♥️  USERINFO FROM PROFILE HEARTS 🎯",
		// 	JSON.stringify(props.userInfo)
		// );

		return () => {
			// console.log("phearts use effect sign off 🎚");
		};
	}, []);

	// let ids = props.heartIds
	// 	? props.heartIds.map((uh) => {
	// 			return uh.business.id;
	// 	  })
	// 	: [];

	let ids = props.heartIds.map((uh) => {
		return uh.business.id;
	});

	// console.log("HEARTS IS🤎♥️🧡", props.heartIds.length);
	// console.log("U S E R H E A R T S ♥️", props.userHearts.length);
	// console.log("U S E R H E A R T IDS♥️", props.heartIds.length);
	return (
		<View // START OF BIZLIST
			style={{
				// flex: 1,
				height: vh(47),
				width: vw(100),
				// position: "absolute",
				backgroundColor: "rgba(255,255,255,0.02)", //MAROON
				zIndex: 1,
				// top: vh(1.5), // POSITION 📈
				// marginTop: vh(0.2),
			}}
		>
			<Text style={styles.title}>LIKES({props.heartIds.length})</Text>

			<FlatList
				indicatorStyle="white"
				horizontal={true}
				// style={styles.list}
				contentContainerStyle={{
					backgroundColor: "rgba(255, 255, 255, 0.02)",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					// height: vh(47),

					// position: "relative",
				}}
				data={props.userHearts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					// console.log("💕uheart business:::🖤", item.business.id);
					// console.log("💕uheart business:::🖤", item);
					// console.log("💕uheart business:::🖤", ids.includes(item.business.id));
					// console.log("💕uheart business:::🖤", ids);
					return (
						<ListBiz
							ubiz={item}
							hearted={ids.includes(item.business.id)}
							navigation={navigation}
							lastScreen={"Profile"}
							getHearts={props.getHearts}
							getListings={props.getListings}
							purpose={"ProfileHearts"}
						/>
					);
				}}
				extraData={props.userHearts}
				// extraData={props.heartIds.length}
				// legacyImplementation={true}
			/>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(ProfileHearts);

const styles = StyleSheet.create({
	badge: {
		height: vh(8),
		// width: vw(24),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		// flex: 1,
		fontWeight: "bold",
		fontFamily: "Marker Felt",
		fontSize: 24,
		backgroundColor: "black",
		color: "olivedrab",
		width: vw(100),
		justifyContent: "center",
		height: vh(5),
		lineHeight: vh(5),
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		userHearts: state.userHearts,
		heartIds: state.userInfo.heart_ids,
		// userHeartBizs: state.userHearts.map((uh) => uh.user_biz),
	};
}