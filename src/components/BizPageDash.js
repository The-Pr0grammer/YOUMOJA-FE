import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import axios from "axios";

const BizPageDash = (props) => {
	const [hearts, setHearts] = useState(0);
	const incHearts = () => {
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://localhost:3000/businesses/${props.business.id}`,
				{
					hearts: hearts + 1,
				},
				{ headers: { "Content-Type": "application/json" } }
			)
			.then(function (response) {
				// console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			});
		axios
			.post(`http://localhost:3000/user_likes`, {
				user_id: props.userInfo.id,
				business_id: props.business.id,
			})
			.then(function (response) {
				console.log(response);
			});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "center",
					top: vh(11),
					height: 37,
					width: 45,
				}}
				onPress={() => {
					incHearts();
				}}
			>
				<Icon name="heart" type="feather" color="red" size={35} />
			</TouchableOpacity>
			<Text
				style={{
					position: "absolute",
					textAlign: "center",
					fontSize: 25,
					color: "lightcoral",
					fontWeight: "bold",
					top: vh(16),
					height: vh(10),
					width: vw(10),
					alignSelf: "center",
				}}
			>
				{hearts}
			</Text>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-start",
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
					marginVertical: "4%",
					zIndex: 1,
				}}
				onPress={() => {
					Linking.openURL(props.business.twitter);
				}}
			>
				<Icon name="twitter" type="feather" color="rgb(0,172,238)" size={35} />
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-end",
					top: vh(23.5),
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
				}}
				onPress={() => {
					Linking.openURL(props.business.phone);
				}}
			>
				<Icon
					name="phone-call"
					type="feather"
					color="mediumseagreen"
					size={34}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-end",
					height: vh(5),
					width: vw(13),
					marginVertical: "4%",
				}}
				onPress={() => {
					Linking.openURL(props.business.facebook);
				}}
			>
				<Icon
					name="facebook-box"
					type="material-community"
					color="rgb(59,89,152)"
					size={38}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-start",
					top: vh(23.5),
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
				}}
				onPress={() => {
					Linking.openURL(props.business.website);
				}}
			>
				<Icon name="laptop" type="entypo" color="whitesmoke" size={35} />
			</TouchableOpacity>
		</View>
	);
};

export default BizPageDash;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		width: vw(40),
		height: vh(30),
		alignSelf: "flex-end",
		opacity: 0.93,
	},
});
