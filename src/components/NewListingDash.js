import React, { useState, useEffect, createRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Linking,
	StyleSheet,
	Share,
	Image,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { Modal } from "react-native";

import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { urlCheck, phoneNumberCheck } from "./forms/validation";
import * as WebBrowser from "expo-web-browser";
import ImagePicker from "react-native-image-crop-picker";
import Carousel, { PaginationLight } from "react-native-x2-carousel";
import { decode, encode } from "base-64";
import ImageViewer from "react-native-image-zoom-viewer";

// import Carousel, { Pagination } from "react-native-snap-carousel";
// import ImageView from "react-native-image-viewer";
import FitImage from "react-native-fit-image";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}
import axios from "axios";
import { TouchableHighlight } from "react-native-gesture-handler";
// import * as ExpoLinking from "expo-linking";

const NewListingDash = (props) => {
	const [hearts, setHearts] = useState(0);
	const [browserResult, setBrowserResult] = useState("");
	const [images, setImages] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [page, setPage] = useState(0);
	const [fixedPage, setFixedPage] = useState(0);
	const [lastTap, setLastTap] = useState(null);
	const [imagesLoading, setImagesLoading] = useState(false);

	const handleDoubleTap = () => {
		const now = Date.now();
		const DOUBLE_PRESS_DELAY = 300;
		if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
			console.log("hi");
			setFixedPage(page);
			setIsVisible(true);
		} else {
			console.log("bye");

			setLastTap(now);
		}
	};

	const handlePicker = () => {
		ImagePicker.openPicker({
			// multiple: true,
			// waitAnimationEnd: false,
			// includeExif: true,
			// compressImageQuality: 0.8,
			// mediaType: "photo",
			maxFiles: 10 - images.length,
			multiple: true,
			cropping: true,
			includeBase64: true,
			compressImageMaxHeight: 1080,
			compressImageMaxWidth: 1080,
		})
			.then((resp) => {
				const picks = resp.map((item, index) => {
					// console.log("IMAGE📸 DATA", item);

					const b = require("based-blob");

					const blob = b.toBlob(item.data);

					console.log("BLOB 🧴", blob._data.blobId); // true

					return (
						{
							url: `data:image/gif;base64,${item.data}`,
						},
						{
							url: `data:image/gif;base64,${item.data}`,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
							id: index,
							file_name: item.filename,
							uri: item.data,
						}
					);
				});

				setImages([...images, ...picks]);

				// console.log(
				// 	"IMAGES 👀🌃👀🌃👀🌃",
				// 	JSON.stringify(item.sourceURL.replace("file://", ""))
				// );

				props.setErrorMessage("");

				if (!props.inputs.images) {
					props.setInputs({
						...props.inputs,
						images: picks,
					});
				} else {
					const newImgInputs = [...props.inputs.images, ...picks];
					props.setInputs({
						...props.inputs,
						images: newImgInputs,
					});
				}

				// console.log("IMAGES PICKED::::", resp);
				// console.log("IMAGES 📸✨", images);
			})
			.catch((e) => {
				setImagesLoading(false);

				console.log(e);
			});
	};

	const showPickedImages = () => {
		if (images.length > 0) {
			let strings = images.map((image, index) => {
				return { id: index, data: image.url };
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
					onPage={(p) => {
						imagesLoading && setImagesLoading(false);

						setPage(p.current - 1);
					}}
				/>
			);
		} else {
			// ADD PHOTOS TOUCHABLE 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸
			return (
				<TouchableOpacity
					onPress={() => {
						setImagesLoading(true);

						handlePicker();
					}}
				>
					<Icon
						name="camera"
						type="feather"
						color="olivedrab"
						// color="gray"
						size={120}
					/>
					<Text
						style={{
							// position: "absolute",
							textAlign: "center",
							width: vw(59.1),
							// top: vh(26),
							fontFamily: "Marker Felt",
							fontSize: 18,
							color: "olivedrab",
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
			{/* IMGS WIDTH ｟｟｟｟｟｟｟｟｟｟｟｟｠｠｠｠｠｠｠｠｠｠｠｠ */}
			<Image
				//IMAGES
				style={styles.imgs}
				source={{
					uri: data.data,
				}}
				// resizeMode={"stretch"}
				resizeMode={"cover"}
			/>
		</View>
	);

	const remove = (array, page) => {
		// console.log("page in remove function::: 🐞", page);
		// console.log("IMG OBJ id is ....", array[page].id);

		array.splice(page, 1);
		return array;
	};

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
	// 			`http://192.168.1.211:3000/businesses/${props.business.id}`,
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
	// 		.post(`http://192.168.1.211:3000/user_hearts`, {
	// 			user_id: props.userInfo.id,
	// 			business_id: props.business.id,
	// 		})
	// 		.then(function (response) {
	// 			console.log(response);
	// 		});
	// };

	console.log(props.inputs);
	// console.log("P A G E 📖:", page);

	return (
		<View style={styles.container}>
			{isVisible && (
				<Modal visible={isVisible} transparent={true}>
					<ImageViewer
						imageUrls={images}
						// imageIndex={page}
						// visible={isVisible}
						onCancel={() => setIsVisible(false)}
						enableSwipeDown={true}
						index={fixedPage}
					/>
				</Modal>
			)}
			<View
				style={{
					// backgroundColor: "lightslategray", // ADD IMGs VIEW BACKGROUND
					// backgroundColor: "lightslategray", // ADD IMGs VIEW BACKGROUND
					// backgroundColor: "lightslategray", // ADD IMGs VIEW BACKGROUND
					// backgroundColor: "lightslategray", // ADD IMGs VIEW BACKGROUND

					flexDirection: "column",
					justifyContent: "center",

					backgroundColor: "rgba(0, 0, 0, 0.92)",
				}}
			>
				{images.length !== 0 && (
					<View
						style={{
							zIndex: 2,
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								alignSelf: "flex-end",

								width: vw(6.5),
								// left: vw(31.75),
								marginTop: vh(0.2),
								marginLeft: vh(0.5),
								opacity: 0.5,
								zIndex: 2,
								backgroundColor: "rgba(40, 40, 40, 0.7)",
								// bottom: "106%",
								// right: vw(0.5),
							}}
							onPress={() => {
								setFixedPage(page);
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
					</View>
				)}

				{/* REFACTOR ⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬ */}

				{images.length !== 0 && (
					<View
						style={{
							position: "absolute",
							flex: 1,
							opacity: 1,
							backgroundColor: "rgba(40, 40, 40, 0.7)",
							zIndex: 2,
							width: vw(59),
							flexDirection: "row",
							top: vh(25),
							// alignSelf: "flex-end",
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
									// backgroundColor: "pink",
								}}
								onPress={() => {
									if (images.length > 1) {
										const filtered = remove(images, page);
										setImages(
											filtered.map((img, index) => {
												img.id = index;
												return img;
											})
										);
										props.setInputs({
											...props.inputs,
											images: filtered,
										});
									} else {
										setImagesLoading(false);

										setImages([]);
										props.setInputs({
											...props.inputs,
											images: [],
										});
									}

									console.log("𐄳 FILTERED ✅");
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
								// backgroundColor: "green",
							}}
							onPress={() => {
								images.length < 10
									? handlePicker()
									: props.setErrorMessage(
											"You can upload 10 images. Choose your favorites."
									  );
							}}
						>
							<Icon name="plus-circle" type="feather" color="white" size={32} />
						</TouchableOpacity>
					</View>
				)}

				{/* IMAGES 🌃 🖼 📸 🎠*/}
				{/* REFACTOR ⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫ */}

				{imagesLoading && (
					<View
						style={{
							position: "absolute",
							flex: 1,
							// height: vh(100),
							width: vw(59),
							justifyContent: "center",
							// backgroundColor: "rgba(0,5,35,0.8)",
							// backgroundColor: "red",
							bottom: "47%",
							zIndex: -1,
						}}
					>
						<ActivityIndicator
							size="large"
							color="lime"
							hidesWhenStopped={true}
							style={
								{
									// top: vh(25),
								}
							}
						></ActivityIndicator>
					</View>
				)}

				{showPickedImages()}
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
						top: vh(21.5),
						height: vh(5),
						width: vw(13),
						marginHorizontal: "2%",
						// backgroundColor: "green",
					}}
					onPress={() => {
						props.setErrorMessage("");
						console.log(props.inputs.contact);
						// const check = phoneNumberCheck(props.inputs.contact);
						if (check == "clear") {
							Linking.openURL(`tel:${props.inputs.contact}`);
						} else {
							props.setErrorMessage(check);
						}
					}}
				>
					<View
						style={{
							// backgroundColor: "green",
							height: vh(5),

							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Entypo
							name="email"
							size={28}
							color="mediumseagreen"
							style={{
								opacity: props.inputs.contact ? 1 : 0.2,
							}}
						/>
					</View>
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
						type="ant-design"
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
						// backgroundColor: "green",
						justifyContent: "center",
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
						opacity: 0.15,
					}}
				>
					<Ionicons name="md-share-alt" size={35} color="lightslategray" />
				</View>
			</View>
		</View>
	);
};

export default NewListingDash;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "black",
		width: vw(100),
		// height: vh(32),
		alignSelf: "flex-start",
		opacity: 0.93,
		flexDirection: "row",
		backgroundColor: "lightslategray",

		// backgroundColor: "rgba(0, 0, 0, 0.1)",
	},
	touchables: {
		position: "relative",
		backgroundColor: "black",
		width: vw(41),
		height: vh(30),
		// alignSelf: "flex-end",
		opacity: 1,
		// backgroundColor: "rgba(0, 0, 0, 0, 1.0)",
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
		// position: "absolute",

		width: vw(59),
		// height: vh(38),
		height: undefined,
		aspectRatio: 1 / 1.15,
		// aspectRatio: 1 / 2.15,
		opacity: 1.0,
		// left: vw(10),
		backgroundColor: "lightslategray",
		// borderRightWidth: 5,
		// zIndex: 2,
	},
	imgsView: {
		position: "relative",

		width: vw(59.1),
		height: vh(30),
		opacity: 1.0,
		backgroundColor: "black",

		// zIndex: -2,
	},
});
