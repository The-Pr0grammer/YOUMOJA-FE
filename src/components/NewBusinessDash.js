import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	StyleSheet,
	Share,
	Image,
	FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { urlCheck, phoneNumberCheck } from "./forms/validation";
import * as WebBrowser from "expo-web-browser";
import ImagePicker from "react-native-image-crop-picker";
import Carousel, { PaginationLight } from "react-native-x2-carousel";
import ImageView from "react-native-image-view";
import axios from "axios";
// import * as ExpoLinking from "expo-linking";

const NewBusinessDash = (props) => {
	const [hearts, setHearts] = useState(0);
	const [browserResult, setBrowserResult] = useState("");
	const [images, setImages] = useState([]);
	const handlePicker = () => {
		ImagePicker.openPicker({
			// multiple: true,
			// waitAnimationEnd: false,
			// includeExif: true,
			// compressImageQuality: 0.8,
			// mediaType: "photo",
			maxFiles: 5,
			multiple: true,
			cropping: true,
			includeBase64: true,
			compressImageMaxHeight: 1080,
			compressImageMaxWidth: 1080,
		})
			.then((resp) => {
				setImages(resp);
				props.setInputs({ ...props.inputs, images: resp });
				// console.log("IMAGES PICKED::::", resp);
				// console.log("IMAGES 📸✨", images);

				images.map((item, index) => {
					console.log(
						"IMAGES 👀🌃👀🌃👀🌃",
						JSON.stringify(item.sourceURL.replace("file://", ""))
					);
				});
				// onSubmit();
			})
			.catch((e) => console.log(e));
	};

	const showPickedImages = () => {
		if (props.inputs.images) {
			// console.log(
			// 	"✨props.inputs.images from newbizdash",
			// 	props.inputs.images[0]
			// );

			let strings = props.inputs.images.map((image, index) => {
				return { id: index, data: image.path };
			});

			console.log("image strings in newbiz📸🧵::::", strings);

			return (
				<Carousel
					pagination={PaginationLight}
					renderItem={renderItem}
					data={strings}
					loop={true}
					autoplay={true}
					autoplayInterval={3200}
				/>
			);
		} else {
			return (
				<TouchableOpacity
					styles={{
						flexDirection: "column-reverse",
						height: vh(30),
						width: vw(30),
					}}
					onPress={handlePicker}
				>
					<Image
						//IMAGES
						style={styles.img}
						source={require("../images/Upload.png")}
						resizeMode="stretch"
					/>
					<Text
						style={{
							position: "absolute",
							textAlign: "center",
							width: vw(59),
							top: vh(26),
							fontFamily: "Marker Felt",
							fontSize: 18,
							// backgroundColor: "red",
							// alignSelf:"flex-end"
						}}
					>
						Add Photos
					</Text>
				</TouchableOpacity>
			);
		}
	};

	const renderItem = (data, index) => (
		<View key={index} style={styles.pickedImgView}>
			<Image
				//IMAGES
				style={styles.pickedImg}
				source={{
					uri: data.data,
				}}
			/>
		</View>
	);

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
					width: vw(60),
					height: vh(30),
					// zIndex: 3,
					flexDirection: "column",
					alignSelf: "flex-start",
				}}
			>
				{showPickedImages()}
				{/* IMAGES 🌃 🖼 📸 🎠*/}
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
		opacity: 0.99,
	},
	img: {
		position: "relative",
		width: vw(59.6),
		height: vh(28),
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "darkslategray",
		// borderRightWidth: 5,
	},
	pickedImg: {
		position: "relative",
		width: vw(60),
		height: vh(38),
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "darkslategray",
		// borderRightWidth: 5,
	},
	pickedImgView: {
		position: "relative",
		width: vw(62),
		height: vh(38),
		opacity: 1.0,
		backgroundColor: "black",
	},
});
