import React, { useState, useEffect, useLayoutEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import { Modal } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";
import ImagePicker from "react-native-image-crop-picker";
import ImageViewer from "react-native-image-zoom-viewer";
import axios from "axios";

const ProfileStats = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [image, setImage] = useState([{ url: "a" }]);
	const [imgView, setImgView] = useState([{ uri: "a" }]);
	const [isVisible, setIsVisible] = useState(false);
	const [editTogg, setEditTogg] = useState(false);
	const isFocused = useIsFocused();

	useLayoutEffect(() => {
		let arr = [1];
		const pick = props.userInfo.image
			? arr.map((item, index) => {
					return (
						{
							url: `http://192.168.1.211:3000/${props.userInfo.image}`,
						},
						{
							url: `http://192.168.1.211:3000/${props.userInfo.image}`,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
						}
					);
			  })
			: arr.map((item, index) => {
					return (
						{
							url: props.userShow.img_url,
						},
						{
							url: props.userShow.img_url,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
						}
					);
			  });

		setImage(pick);
		setImgView([{ uri: pick[0].url }]);

		// return () => {
		// 	// console.log("please come again");
		// };
	}, []);

	const handlePicker = () => {
		ImagePicker.openPicker({
			// multiple: true,
			// waitAnimationEnd: false,
			// includeExif: true,
			// compressImageQuality: 0.8,
			// mediaType: "photo",
			maxFiles: 1,
			multiple: true,
			cropping: true,
			includeBase64: true,
			compressImageMaxHeight: 1080,
			compressImageMaxWidth: 1080,
		})
			.then((resp) => {
				const pick = resp.map((item, index) => {
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

				setImage(pick);
				setImgView([{ uri: pick[0].url }]);
				setEditTogg(true);

				// console.log(
				// 	"IMAGES 👀🌃👀🌃👀🌃",
				// 	JSON.stringify(item.sourceURL.replace("file://", ""))
				// );

				// console.log("IMAGES PICKED::::", resp);
				// console.log("IMAGES 📸✨", images);
			})
			.catch((e) => console.log(e));
	};

	const handlePut = () => {
		console.log(
			"IMAGE HASH IS 🖼  ",
			image.map((img) => img.file_name)
		);

		let imageHash = image.map((image) => {
			// console.log(image.uri);
			return {
				image: image.uri,
				file_name: image.file_name,
			};
		});

		let putData = {
			user: {
				image: imageHash,
			},
		};

		fetch(`http://192.168.1.211:3000/users/${props.userShow.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				// Accept: "application/json",
			},
			body: JSON.stringify(putData),
		})
			.then((resp) => {
				// setEditTogg(false);
				// props.setUserInfo(resp.data);
				// console.log(resp);
				// refreshUserInfo();
				props.handleSuccess("profilePic");
				setTimeout(() => props.handleClose("profilePic"), 3900);
			})
			.catch((err) => {
				setErrorMessage("Something went wrong. Try again later.");
				console.log("🚨 Error updating user avatar: ", err);
			});
	};

	refreshUserInfo = () => {
		let response = axios(`http://192.168.1.211:3000/users/${props.userInfo.id}`)
			.then((resp) => {
				console.log("RESP IS", resp.data);
				props.setUserInfo(resp.data);
			})
			.catch((error) => console.log(error));
	};

	// console.log("👤 USER INFO ISSS 👤 ", props.userShow);

	return (
		<View
			style={{
				height: vh(35),
				width: vw(100),
				// position: "absolute",
				backgroundColor: "red", //MAGENTA
				// backgroundColor: "rgba(0,0,0,0.1)",
				zIndex: 1,
				// top: vh(7.9),
			}}
		>
			{isVisible && (
				<ImageView
					images={imgView}
					onRequestClose={() => setIsVisible(false)}
					visible={isVisible}
					index={0}
				/>
			)}
			<View
				style={{
					height: vh(36),
					width: vw(100),
					borderWidth: 2,
					position: "absolute",
					alignSelf: "flex-start",
					backgroundColor: "slategray", //MIDDLE
					justifyContent: "center",
					alignItems: "center",
					zIndex: 1,
					flexDirection: "column",
					// bottom: vh(17.6),
				}}
			>
				<View
					style={{
						// width: vw(20),
						// height: vh(40),
						alignSelf: "center",
						position: "absolute",
						bottom: vh(32),
						left: vw(64),
						// backgroundColor: "red",
						zIndex: 4,
					}}
				>
					<TouchableOpacity
						style={{
							// position: "absolute",
							opacity: 0.5,
							backgroundColor: "rgba(0,0,0,0.7)",
						}}
						onPress={handlePicker}
					>
						<Icon
							name="edit"
							type="font-awesome-5"
							color="white"
							size={24}
							opacity={0.5}
							// reverse
							// reverseColor="dodgerblue"
						/>
					</TouchableOpacity>
				</View>
				{editTogg && (
					<View
						style={{
							width: vw(40),
							// height: vh(10),
							// alignSelf: "center",
							position: "absolute",
							top: vh(16),
							// left: vw(55),
							backgroundColor: "rgba(0,0,0,0.75)",
							zIndex: 4,
							flexDirection: "row",
							// alignSelf: "flex-end",
						}}
					>
						<Button
							title="Cancel"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
								zIndex: 5,
							}}
							style={{
								position: "relative",
								borderRadius: 20,
								width: vw(20),
								// height: vh(4),
								zIndex: 5,

								// marginBottom: vh(2.2),
							}}
							titleStyle={{ color: "gray" }}
							onPress={() => {
								const arr = [0];
								const pick = props.userInfo.image
									? arr.map((item, index) => {
											return (
												{
													url: `http://192.168.1.211:3000/${props.userInfo.image}`,
												},
												{
													url: `http://192.168.1.211:3000/${props.userInfo.image}`,
													props: {
														// source: require("data:image/gif;base64,${item.data}"),
													},
												}
											);
									  })
									: arr.map((item, index) => {
											return (
												{
													url: props.userShow.img_url,
												},
												{
													url: props.userShow.img_url,
													props: {
														// source: require("data:image/gif;base64,${item.data}"),
													},
												}
											);
									  });

								setImage(pick);
								setImgView([{ uri: pick[0].url }]);
								setEditTogg(false);
							}}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
						<Button
							title="Save"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
								zIndex: 5,
							}}
							style={{
								position: "relative",
								borderRadius: 20,
								width: vw(20),
								// height: vh(4),
								zIndex: 5,

								// marginBottom: vh(2.2),
							}}
							titleStyle={{ color: "gray" }}
							onPress={() => {
								setEditTogg(false);
								handlePut();
								// props.handleSuccess("profilePic");
								props.handleClose("profilePic");
							}}
							// loading={buttonSpinner}
							// loadingProps={{ color: "green", size: "large" }}
						/>
					</View>
				)}
				<View
					style={{
						height: vh(36),
						width: vw(30),
						borderWidth: 2,
						position: "absolute",
						alignSelf: "flex-start",
						backgroundColor: "black", //LEFT
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "column",
						// bottom: vh(17.6),
						opacity: 0.95,
					}}
				>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							backgroundColor: "maroon",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							height: vh(7.5),
							width: vw(33),
							// borderBottomWidth: 1,
							top: vh(2),
						}}
						contentContainerStyle={{
							position: "relative",
							// height: vh(8),
							// bottom: vh(0.75),
							// paddingRight: vw(6.6),
							// paddingLeft: vw(4),
						}}
						automaticallyAdjustInsets={false}
						horizontal={true}
						// pagingEnabled={true}
						scrollEnabled={true}
						// decelerationRate={2.998}
						// snapToAlignment={"center"}
						// snapToIntervreverseCl={33}
						// scrollEventThrottle={1}
					>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="green"
								size={40}
								// reverse
								// reverseColor="lawngreen"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="blue"
								size={40}
								// reverse
								// reverseColor="dodgerblue"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="firebrick"
								size={40}
								// reverse
								// reverseColor="lightcoral"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="slateblue"
								size={40}
								// reverse
								// reverseColor="darkmagenta"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="gold"
								size={40}
								// reverse
								// reverseColor="darkorange"
							/>
						</TouchableOpacity>
					</ScrollView>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 20,
							top: vh(9),
							fontFamily: "Marker Felt",
							color: "lightslategray",
						}}
					>
						1M
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 18,
							top: vh(12.5),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Given
					</Text>

					<ScrollView
						showsHorizontalScrollIndicator={false}
						style={{
							position: "absolute",
							alignSelf: "flex-end",
							backgroundColor: "maroon",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							width: vw(33),
							top: vh(16.95),
						}}
						contentContainerStyle={{
							position: "relative",
							// height: vh(8),
							// bottom: vh(0.75),
							// paddingRight: vw(6.6),
							// paddingLeft: vw(4),
						}}
						automaticallyAdjustInsets={false}
						horizontal={true}
						// pagingEnabled={true}
						scrollEnabled={true}
						// decelerationRate={2.998}
						// snapToAlignment={"center"}
						// snapToIntervreverseCl={33}
						// scrollEventThrottle={1}
					>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="green"
								size={40}
								// reverse
								// reverseColor="lawngreen"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="blue"
								size={40}
								// reverse
								// reverseColor="dodgerblue"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="firebrick"
								size={40}
								// reverse
								// reverseColor="lightcoral"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="slateblue"
								size={40}
								// reverse
								// reverseColor="darkmagenta"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.badge}>
							<Icon
								name="rocket1"
								type="ant-design"
								color="gold"
								size={40}
								// reverse
								// reverseColor="darkorange"
							/>
						</TouchableOpacity>
					</ScrollView>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 20,
							top: vh(24.4),
							fontFamily: "Marker Felt",
							color: "lightslategray",
						}}
					>
						1M
					</Text>
					<Text
						style={{
							width: vw(30),
							position: "absolute",
							textAlign: "center",
							fontSize: 18,
							top: vh(27.8),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Received
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => setIsVisible(true)}
					style={{ zIndex: 3 }}
				>
					<Image
						resizeMode={"cover"}
						source={{
							uri: image[0].url,
						}}
						style={styles.profilePic}
						//PROFILE PICTURE 📸 📸 📸
					></Image>
				</TouchableOpacity>

				<View
					style={{
						height: vh(36),
						width: vw(30),
						borderWidth: 2,
						position: "absolute",
						alignSelf: "flex-end",
						backgroundColor: "black", //RIGHT
						// justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "column",
						// bottom: vh(17.6),
						opacity: 0.95,
					}}
				>
					<View
						style={{
							position: "relative",
							top: vh(2.5),
							height: vh(7.5),
							width: vw(13),
							// backgroundColor: "rgba(0, 0, 0, 0.3)",
							justifyContent: "center",
						}}
					>
						<Icon name="heart" type="feather" color="red" size={35} />
					</View>
					<Text
						style={{
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 20,
							fontFamily: "Marker Felt",
							top: vh(1.5),
							color: "lightslategray",
						}}
					>
						777K
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 18,
							top: vh(2.1),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Given
					</Text>
					<View
						style={{
							position: "absolute",
							// backgroundColor: "maroon",
							// backgroundColor: "rgba(0, 0, 0, 0.3)",
							height: vh(7.5),
							width: vw(30),
							top: vh(17.4),
							justifyContent: "center",
						}}
					>
						<Icon name="heart" type="feather" color="red" size={35} />
					</View>
					<Text
						style={{
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 20,
							fontFamily: "Marker Felt",
							top: vh(10.15),
							color: "lightslategray",
						}}
					>
						555K
					</Text>
					<Text
						style={{
							height: vh(4),
							width: vw(30),
							position: "relative",
							textAlign: "center",
							fontSize: 18,
							top: vh(10.45),
							fontFamily: "Marker Felt",
							color: "olivedrab",
						}}
					>
						Received
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						height: vh(7.5),
						width: vw(42),
						// borderWidth: 2,
						position: "relative",
						alignSelf: "center",
						backgroundColor: "rgba(0,0,0,0.95)", //BLACK
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
						flexDirection: "row",
						// bottom: vh(17.6),
					}}
				>
					<TouchableWithoutFeedback
						style={{
							// flex: 1,
							position: "relative",
							// alignSelf: "flex-start",
							// width: vw(2.5),
							opacity: 0.85,
							// backgroundColor: "red",
						}}
						onPress={
							() => console.log(props.userInfo)
							// console.log(props.userHeartBizs);
						}
					>
						<FontAwesome
							name="caret-square-o-up"
							size={28}
							color={"lightslategray"}
						/>
					</TouchableWithoutFeedback>
					<Text
						style={{
							flex: 1,
							alignSelf: "center",
							textAlign: "center",
							fontFamily: "Marker Felt",
							fontSize: 19,
							color: "darkslategray",
							marginHorizontal: vw(1.5),
							// backgroundColor: "gold",
						}}
					>
						200,000
					</Text>
					<TouchableWithoutFeedback
						style={{
							position: "relative",
							// alignSelf: "flex-end",
							// width: vw(7.5),
							opacity: 0.85,
							// backgroundColor: "blue",
						}}
					>
						<FontAwesome
							name="caret-square-o-down"
							size={28}
							color={"lightslategray"}
						/>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(ProfileStats);

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
		borderRadius: 102,
		width: "47%",
		opacity: 1.0,
		zIndex: 2,
		// top: vh(0.03),
		height: undefined,
		aspectRatio: 135 / 135,
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
		userInfo: state.userInfo,
	};
}
