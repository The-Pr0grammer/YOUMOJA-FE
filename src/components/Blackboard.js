import React, { useState, useEffect } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import { connect } from "react-redux";
import {} from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header.js";
import BlackboardBiz from "./BlackboardBiz.js";

import axios from "axios";

const Blackboard = (props) => {
	const navigation = useNavigation();
	const [businessesArr, setBusinessesArr] = useState([]);
	let rankItr = 0;

	useEffect(() => {
		axios(`http://192.168.1.211:3000/user_bizs/badges`)
			.then((resp) => setBusinessesArr(resp.data))
			.catch((error) => console.log(error));

		return () => {};
	}, []);

	console.log("TOP 25📈!!! SCRATCH THAT: BLACKBOARD 💯 WE MADE IT");
	// console.log("businesesses array from thr BLACKBOARD", businessesArr);

	return (
		<View style={styles.container}>
			<Header
				name={"Blackboard"}
				navigation={navigation}
				// loading={props.profileLoading}
			/>

			{/* <View style={styles.columnView}>
				<TouchableOpacity
					style={{ ...styles.column, width: vw(10) }}
					disabled={true}
				>
					<Text style={styles.columnText}>Rank</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.column, width: vw(35) }}
					disabled={true}
				>
					<Text style={styles.columnText}>Name</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.column, width: vw(35) }}
					disabled={true}
				>
					<Text style={styles.columnText}>Summary</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.column, width: vw(20) }}
					disabled={true}
				>
					<Text style={styles.columnText}>🚀Total</Text>
				</TouchableOpacity>
			</View> */}

			{businessesArr.map((business, index) => {
				rankItr++;
				return <BlackboardBiz key={index} business={business} rank={rankItr} />;
			})}
			
		</View>
	);
};

export default connect(mapStateToProps, {})(Blackboard);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		height: vh(100),
		width: vw(100),
		flexDirection: "column",
		// alignItems: "center",
	},
	columnView: {
		position: "relative",
		backgroundColor: "silver",
		height: vh(5),
		width: vw(100),
		flexDirection: "row",
		// marginTop: vh(8),
	},
	column: {
		// flex: 1,
		position: "relative",
		backgroundColor: "orange",
		height: vh(5),
		justifyContent: "center",
		borderWidth: 1,
		// width: vw(33.3),
	},
	columnText: {
		fontFamily: "Marker Felt",
		color: "black",
		textAlign: "center",
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
	};
}
