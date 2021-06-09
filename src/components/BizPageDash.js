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
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";

// import * as WebBrowser from "expo-web-browser";
import * as Sharing from "expo-sharing";
import * as ExpoLinking from "expo-linking";
import { WebView } from "react-native-webview";

import axios from "axios";

const BizPageDash = (props) => {
	// let redirectUrl = ExpoLinking.makeUrl("BizPage", {
	// 	hello: "world",
	// 	goodbye: "now",
	// });
	const [hearts, setHearts] = useState(props.ubiz.business.hearts);

	const numFormat = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
	};

	const incHearts = () => {
		this.setState((prevState) => ({ hearts: prevState.hearts + 1 }));
		axios
			.patch(
				`http://192.168.1.211:3000/businesses/${props.ubiz.business.id}`,
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
			.post(`http://192.168.1.211:3000/user_hearts`, {
				user_id: props.userInfo.id,
				business_id: props.ubiz.business.id,
			})
			.then(function (response) {
				console.log(response);
			});
	};

	const defContactType = (contact) => {
		// isnum = /^\d+$/.test(val);
		// nums & spaces = /^ *[0-9][0-9 ]*$/

		if (!contact) {
			return false;
		} else if (/^ *[0-9][0-9 ]*$/.test(contact)) {
			return "numString";
		} else {
			return "email";
		}
	};

	// console.log("BIZ PAGE DASH HEART STATE ♥️ :", props.ubiz.business.hearts);
	// console.log("♥️  or 💔:", props.hearted ? "♥️ " : "💔");
	// console.log("BIZPAGE DASH UBIZ:", JSON.stringify(props.ubiz));

	return (
		<View style={styles.container}>
			{/* <TouchableOpacity
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
					// width: vw(10),
					alignSelf: "center",
				}}
			>
				{hearts > 0 && numFormat(hearts)}
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
					// WebBrowser.openBrowserAsync("https://twitter.com");
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
					// WebBrowser.openBrowserAsync("https://facebook.com");
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
					type="ant-design"
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
			</TouchableOpacity> */}
			{/* 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ */}

			<View
				style={{
					position: "relative",
					flexDirection: "column",
					height: vh(30),
					width: vw(41),
					justifyContent: "center",
					paddingTop: vh(3),
					opacity: 1,
					backgroundColor: "black",
					// backgroundColor: "green",
				}}
			>
				{/* <View style={styles.touchables}>  PUT BACK WHEN DONE WITH TOUCHABLES  */}

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						height: vh(10),
						width: vw(41),
						alignItems: "center",
						// backgroundColor: "red",
					}}
				>
					{/* 📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘 */}
					<TouchableOpacity
						style={{
							flex: 1,
							height: vh(5),
							// backgroundColor: "magenta",
						}}
						onPress={async () => {
							WebBrowser.dismissBrowser();
							props.setErrorMessage("");

							const check = urlCheck(props.userInfo.facebook);
							console.log("CHECK IS", check);
							if (check == "clear") {
								setBrowserResult(
									WebBrowser.openBrowserAsync(props.userInfo.facebook)
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
							opacity={props.userInfo.facebook ? 1 : 0.2}
						/>
					</TouchableOpacity>
					{/* 📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘📘 */}
					{/* 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸 */}
					<TouchableOpacity
						style={{
							flex: 1,
							height: vh(5),
							bottom: vh(1),
							// backgroundColor: "magenta",
						}}
						onPress={async () => {
							WebBrowser.dismissBrowser();
							props.setErrorMessage("");

							const check = urlCheck(props.userInfo.instagram);
							console.log("CHECK IS", check);
							if (check == "clear") {
								setBrowserResult(
									WebBrowser.openBrowserAsync(props.userInfo.instagram)
								);
								console.log(browserResult);
							} else {
								props.setErrorMessage(check);
							}
						}}
					>
						<Icon
							name="instagram"
							type="ant-design"
							color="rgb(195, 42, 163)"
							size={32}
							opacity={props.userInfo.instagram ? 1 : 0.2}
						/>
					</TouchableOpacity>
					{/* 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸 */}
					{/* 🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦*/}
					<TouchableOpacity
						style={{
							flex: 1,
							height: vh(5),
							// backgroundColor: "magenta",
						}}
						onPress={async () => {
							WebBrowser.dismissBrowser();
							props.setErrorMessage("");
							const check = urlCheck(props.userInfo.twitter);
							console.log("CHECK IS", check);
							if (check == "clear") {
								setBrowserResult(
									WebBrowser.openBrowserAsync(props.userInfo.twitter)
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
							opacity={props.userInfo.twitter ? 1 : 0.2}
						/>
					</TouchableOpacity>
					{/* 🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦*/}
				</View>

				{/* ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ */}
				<View
					style={{
						flex: 1,
						height: vh(10),
						width: vw(41),
						// backgroundColor: "blue",
					}}
					// onPress={() => {
					// 	incHearts();
					// }}
				>
					<Icon
						name={props.hearted ? "heart" : "hearto"}
						type="antdesign"
						color="red"
						size={35}
					/>
					<Text
						style={{
							textAlign: "center",
							height: vh(4),
							width: vw(41),
							color: "lightslategray",
							fontWeight: "bold",
							fontSize: 25,
							opacity: 1,
							// backgroundColor:"purple"
						}}
					>
						{numFormat(hearts)}
					</Text>
				</View>
				{/* ♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️♥️ */}
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						height: vh(10),
						width: vw(41),
						// backgroundColor: "gold",
					}}
				>
					{/* 💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻 */}
					<TouchableOpacity
						style={{
							flex: 1,
							height: vh(5),
							// backgroundColor: "magenta",
						}}
						onPress={async () => {
							WebBrowser.dismissBrowser();
							props.setErrorMessage("");
							const check = urlCheck(props.userInfo.website);
							console.log("CHECK IS", check);
							if (check == "clear") {
								setBrowserResult(
									WebBrowser.openBrowserAsync(props.userInfo.website)
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
							opacity={props.userInfo.website ? 1 : 0.2}
						/>
					</TouchableOpacity>
					{/* 💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻💻 */}
					{/* ↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️ */}
					<View
						style={{
							flex: 1,
							height: vh(5),
							top: vh(1),
							alignItems: "center",
							opacity: 0.15,
							// backgroundColor: "magenta",
						}}
					>
						<Ionicons name="md-share-alt" size={35} color="lightslategray" />
					</View>
					{/* ↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️↪️ */}
					{/* 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬 */}
					<TouchableOpacity
						style={{
							flex: 1,
							height: vh(5),
							// backgroundColor: "magenta",
						}}
						onPress={() => {
							props.setErrorMessage("");
						}}
					>
						<View
							style={{
								height: vh(5),
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{defContactType(props.userInfo.contact) == "" && (
								<Entypo
									name="chat"
									size={30}
									color="mediumseagreen"
									style={{
										opacity: props.userInfo.contact ? 1 : 0.2,
									}}
								/>
							)}
							{defContactType(props.userInfo.contact) == "numString" && (
								<Feather
									name="phone-call"
									size={28}
									color="mediumseagreen"
									style={{
										opacity: props.userInfo.contact ? 1 : 0.2,
									}}
								/>
							)}
							{defContactType(props.userInfo.contact) == "email" && (
								<Entypo
									name="email"
									size={28}
									color="mediumseagreen"
									style={{
										opacity: props.userInfo.contact ? 1 : 0.2,
									}}
								/>
							)}
						</View>
					</TouchableOpacity>
					{/* 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬 */}
				</View>
			</View>
			{/* 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ 🐦 📸 📘 📬 📞 💻 ♥️ */}
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(BizPageDash);

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		width: vw(40),
		height: vh(30),
		alignSelf: "flex-end",
		opacity: 0.99,
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		isFetching: state.isFetching,
	};
}
