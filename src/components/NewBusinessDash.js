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
// import Carousel, { Pagination } from "react-native-snap-carousel";
import { decode, encode } from "base-64";
import ImageView from "react-native-image-viewing";
import FitImage from "react-native-fit-image";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}
import axios from "axios";
// import * as ExpoLinking from "expo-linking";

const NewBusinessDash = (props) => {
	const [hearts, setHearts] = useState(0);
	const [browserResult, setBrowserResult] = useState("");
	const [images, setImages] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [page, setPage] = useState(1);

	const handlePicker = () => {
		ImagePicker.openPicker({
			// multiple: true,
			// waitAnimationEnd: false,
			// includeExif: true,
			// compressImageQuality: 0.8,
			// mediaType: "photo",
			maxFiles: 10,
			multiple: true,
			cropping: true,
			includeBase64: true,
			compressImageMaxHeight: 1080,
			compressImageMaxWidth: 1080,
		})
			.then((resp) => {
				setImages(
					resp.map((item) => {
						// console.log("IMAGE📸 DATA", item);

						const b = require("based-blob");

						const blob = b.toBlob(item.data);

						console.log("BLOB 🧴", blob._data.blobId); // true

						return {
							uri: `data:image/gif;base64,${item.data}`,
						};

						// console.log(
						// 	"IMAGES 👀🌃👀🌃👀🌃",
						// 	JSON.stringify(item.sourceURL.replace("file://", ""))
						// );
					})
				);
				props.setInputs({ ...props.inputs, images: resp });
				// console.log("IMAGES PICKED::::", resp);
				// console.log("IMAGES 📸✨", images);

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

			let strings = images.map((image, index) => {
				return { id: index, data: image.uri };
			});

			// console.log("image strings in newbiz📸🧵::::", strings);

			return (
				<Carousel
					pagination={PaginationLight}
					renderItem={renderItem}
					data={strings}
					loop={true}
					autoplay={true}
					autoplayInterval={3200}
					onPage={(p) => !isVisible && setPage(p.current)}
				/>
				// <Carousel
				// 	ref={(c) => {
				// 		this._carousel = c;
				// 	}}
				// 	data={strings}
				// 	renderItem={renderItem}
				// 	layout={"stack"}
				// 	// layoutCardOffset={40}
				// 	sliderWidth={vw(100)}
				// 	itemWidth={vw(100)}
				// 	onSnapToItem={(index) => setActiveSlide(index)}
				// />
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
		<View key={index} style={styles.imgsView}>
			<Image
				//IMAGES
				style={styles.imgs}
				source={{
					uri: data.data,
				}}
				// resizeMode={"stretch"}
			/>
		</View>
	);

	// const renderItem = ({ item, index }) => {
	// 	return (
	// 		<View style={styles.imgsView}>
	// 			<Image
	// 				source={{
	// 					uri: item.data,
	// 				}}
	// 				style={styles.imgs}
	// 			/>
	// 		</View>
	// 	);
	// };

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
	console.log("PAGE IS 📜", page);
	return (
		<View style={styles.container}>
			{isVisible && (
				<ImageView
					images={images}
					imageIndex={page - 1}
					visible={isVisible}
					onRequestClose={() => setIsVisible(false)}
				/>
			)}
			<View
				style={{
					flex: 1,
					position: "absolute",
					backgroundColor: "lightslategray",
					width: vw(60),
					height: vh(30),
					// zIndex: 3,
					flexDirection: "column",
					alignSelf: "flex-start",
					// justifyContent: "center",
				}}
			>
				{images.length !== 0 && (
					<TouchableOpacity
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							width: vw(6.5),
							// left: vw(31.75),
							marginTop: vh(0.2),
							marginRight: vh(0.2),
							opacity: 0.5,
							zIndex: 2,
							backgroundColor: "rgba(40, 40, 40, 0.7)",
						}}
						onPress={() => {
							setIsVisible(true);
						}}
					>
						<Icon
							name="arrows-expand"
							type="foundation"
							color={"white"}
							size={24}
						/>
					</TouchableOpacity>
				)}
				{images.length !== 0 && (
					<View
						style={{
							position: "absolute",
							// flex: 1,
							opacity: 1,
							backgroundColor: "rgba(40, 40, 40, 0.5)",
							zIndex: 2,
							width: vw(60),
							flexDirection: "row",
							top: vh(25),
							alignSelf: "flex-end",
						}}
					>
						<View
							style={{
								flex: 1,
							}}
						>
							<TouchableOpacity
								style={{
									alignSelf: "flex-start",
									width: vw(8),
									opacity: 0.5,
									zIndex: 3,
									backgroundColor: "pink",
								}}
								onPress={() => {
									setIsVisible(true);
								}}
							>
								<Icon
									name="minus-circle"
									type="feather"
									color="white"
									size={32}
									style={{ alignSelf: "flex-start" }}
								/>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={{
								position: "relative",
								alignSelf: "flex-end",
								width: vw(8),
								// left: vw(22),
								// marginTop: vh(0.2),
								// marginLeft: vw(15),
								opacity: 0.5,
								zIndex: 2,
								backgroundColor: "green",
							}}
							onPress={() => {
								setIsVisible(true);
							}}
						>
							<Icon name="plus-circle" type="feather" color="white" size={32} />
						</TouchableOpacity>
					</View>
				)}

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
					{0}
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
		backgroundColor: "lightslategray",
		// borderRightWidth: 5,
	},
	imgs: {
		position: "relative",
		width: vw(60),
		// height: vh(38),
		height: undefined,
		aspectRatio: 1 / 1.15,
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "lightslategray",
		// borderRightWidth: 5,
	},
	imgsView: {
		position: "relative",
		width: vw(62),
		height: vh(38),
		opacity: 1.0,
		backgroundColor: "black",
	},
});
