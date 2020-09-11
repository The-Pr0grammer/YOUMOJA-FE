import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
	Share,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import axios from "axios";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import * as ExpoLinking from "expo-linking";

const BizPageDash = (props) => {
	let redirectUrl = ExpoLinking.makeUrl("BizPage", {
		hello: "world",
		goodbye: "now",
	});
	const [hearts, setHearts] = useState(0);
	const incHearts = () => {
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://127.0.0.1:3000/businesses/${props.business.id}`,
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
			.post(`http://127.0.0.1:3000/user_hearts`, {
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
					color: "lightslategray",
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
					alignSelf: "flex-end",
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
					marginVertical: "16%",
					zIndex: 1,
				}}
				onPress={() => {
					WebBrowser.openBrowserAsync("https://twitter.com");
				}}
			>
				<Icon name="twitter" type="feather" color="rgb(0,172,238)" size={30} />
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-end",
					top: vh(21.6),
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
					size={28}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-start",
					height: vh(5),
					width: vw(13),
					marginVertical: "15%",
				}}
				onPress={() => {
					WebBrowser.openBrowserAsync("https://facebook.com");
				}}
			>
				<Icon
					name="facebook-box"
					type="material-community"
					color="rgb(59,89,152)"
					size={32}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "center",
					height: vh(5),
					width: vw(13),
					marginVertical: "12%",
				}}
				onPress={() => {
					Linking.openURL(props.business.instagram);
				}}
			>
				<Icon
					name="instagram"
					type="material-community"
					color="rgb(195, 42, 163)"
					size={32}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "flex-start",
					top: vh(21.5),
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
				}}
				onPress={() => {
					Linking.openURL(props.business.website);
				}}
			>
				<Icon name="laptop" type="entypo" color="whitesmoke" size={30} />
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					position: "absolute",
					alignSelf: "center",
					top: vh(22.25),
					height: vh(5),
					width: vw(13),
					marginHorizontal: "2%",
					alignItems: "center",
				}}
				onPress={async () => {
					console.log("REDIRECT URL IS.........", redirectUrl);
					Share.share(
						{
							title: "testerrrrrr press this",
							url: redirectUrl,
						} //SHARERRRRRRR
					);
				}}
			>
				<Ionicons name="md-share-alt" size={35} color="green" />
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
