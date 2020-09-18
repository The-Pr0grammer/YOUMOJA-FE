import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
	Share,
	Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import axios from "axios";
import { urlCheck, phoneNumberCheck } from "./forms/validation";
import * as WebBrowser from "expo-web-browser";
import * as ExpoLinking from "expo-linking";

const NewBusinessDash = (props) => {
	let redirectUrl = ExpoLinking.makeUrl("BizPage", {
		hello: "world",
		goodbye: "now",
	});
	const [hearts, setHearts] = useState(0);
	const [browserResult, setBrowserResult] = useState("");
	// const [images, setImages] = useState([]);

	// const incHearts = () => {
	// 	this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
	// 	axios
	// 		.patch(
	// 			`http://127.0.0.1:3000/businesses/${props.business.id}`,
	// 			{
	// 				hearts: hearts + 1,
	// 			},
	// 			{ headers: { "Content-Type": "application/json" } }
	// 		)
	// 		.then(function (response) {
	// 			// console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.response);
	// 		});
	// 	axios
	// 		.post(`http://127.0.0.1:3000/user_hearts`, {
	// 			user_id: props.userInfo.id,
	// 			business_id: props.business.id,
	// 		})
	// 		.then(function (response) {
	// 			console.log(response);
	// 		});
	// };

	// console.log(props.inputs.twitter);
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					position: "absolute",
					backgroundColor: "darkslategray",
					width: vw(58),
					height: vh(30),
					// zIndex: 3,
					flexDirection: "column",
					alignSelf: "flex-start",
				}}
			>
				<TouchableOpacity
					styles={{ flexDirection: "column-reverse" }}
					onPress={() => {
						// takePics();
					}}
				>
					<Image
						//IMAGES
						style={styles.img}
						source={require("../images/Upload.png")}
					/>
					<Text
						style={{
							position: "absolute",
							textAlign: "center",
							// backgroundColor: "red",
							width: vw(59),
							top: vh(26),
							fontFamily: "Marker Felt",
							fontSize: 18,
							// alignSelf:"flex-end"
						}}
					>
						Upload Images
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.touchables}>
				<View
					style={{
						position: "absolute",
						alignSelf: "center",
						top: vh(11),
						height: 37,
						width: 45,
					}}
					// onPress={() => {
					// 	incHearts();
					// }}
				>
					<Icon
						name="heart"
						type="feather"
						color="red"
						size={35}
						opacity={0.01}
					/>
				</View>
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
						opacity: 0.01,
					}}
				>
					{1}
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
					onPress={async () => {
						WebBrowser.dismissBrowser();
						props.setErrorMessage("");

						// props.setVisibility(!props.visibility);
						// props.setVisibility(false);
						const check = urlCheck(props.inputs.twitter);
						console.log("CHECK IS", check);
						if (check == "clear") {
							await setBrowserResult(
								WebBrowser.openBrowserAsync(props.inputs.twitter)
							);
							console.log(browserResult);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="twitter"
						type="feather"
						color="rgb(0,172,238)"
						size={30}
						opacity={props.inputs.twitter ? 1 : 0.2}
					/>
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
						props.setErrorMessage("");
						console.log(props.inputs.number);
						const check = phoneNumberCheck(props.inputs.number);
						if (check == "clear") {
							Linking.openURL(`tel:${props.inputs.number}`);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="phone-call"
						type="feather"
						color="mediumseagreen"
						size={28}
						opacity={props.inputs.number ? 1 : 0.2}
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
					onPress={async () => {
						WebBrowser.dismissBrowser();
						props.setErrorMessage("");

						const check = urlCheck(props.inputs.facebook);
						console.log("CHECK IS", check);
						if (check == "clear") {
							await setBrowserResult(
								WebBrowser.openBrowserAsync(props.inputs.facebook)
							);
							console.log(browserResult);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="facebook-box"
						type="material-community"
						color="rgb(59,89,152)"
						size={32}
						opacity={props.inputs.facebook ? 1 : 0.2}
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
					onPress={async () => {
						WebBrowser.dismissBrowser();
						props.setErrorMessage("");

						const check = urlCheck(props.inputs.instagram);
						console.log("CHECK IS", check);
						if (check == "clear") {
							await setBrowserResult(
								WebBrowser.openBrowserAsync(props.inputs.instagram)
							);
							console.log(browserResult);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="instagram"
						type="material-community"
						color="rgb(195, 42, 163)"
						size={32}
						opacity={props.inputs.instagram ? 1 : 0.2}
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
					onPress={async () => {
						WebBrowser.dismissBrowser();
						props.setErrorMessage("");

						const check = urlCheck(props.inputs.website);
						console.log("CHECK IS", check);
						if (check == "clear") {
							await setBrowserResult(
								WebBrowser.openBrowserAsync(props.inputs.website)
							);
							console.log(browserResult);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<Icon
						name="laptop"
						type="entypo"
						color="whitesmoke"
						size={30}
						opacity={props.inputs.website ? 1 : 0.2}
					/>
				</TouchableOpacity>
				<View
					style={{
						position: "absolute",
						alignSelf: "center",
						top: vh(22.25),
						height: vh(5),
						width: vw(13),
						marginHorizontal: "2%",
						alignItems: "center",
						opacity: 0.01,
					}}
				>
					<Ionicons name="md-share-alt" size={35} color="gray" />
				</View>
			</View>
		</View>
	);
};

export default NewBusinessDash;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		width: vw(100),
		height: vh(30),
		alignSelf: "flex-start",
		opacity: 0.93,
	},
	touchables: {
		position: "relative",
		backgroundColor: "black",
		width: vw(40),
		height: vh(30),
		alignSelf: "flex-end",
		opacity: 0.93,
	},
	img: {
		position: "relative",
		width: vw(58),
		height: vh(28),
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "darkslategray",
		// borderRightWidth: 5,
	},
});
