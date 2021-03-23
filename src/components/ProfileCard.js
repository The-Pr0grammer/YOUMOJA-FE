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
import { Button, Icon, Badge } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { FontAwesome } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import { Linking } from "react-native";
import ProfileEdit from "./ProfileEdit.js";
import Webview from "./Webview.js";

import axios from "axios";

const ProfileCard = (props) => {
	const navigation = useNavigation();
	const [active, toggleActive] = useState("");
	const [userShow, setUserShow] = useState("");
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [image, setImage] = useState([{ url: "a" }]);
	const [imgView, setImgView] = useState([{ uri: "a" }]);
	const [isVisible, setIsVisible] = useState(false);
	const [editPrompt, setEditPrompt] = useState(false);
	const [infoEditTogg, setInfoEditTogg] = useState(false);
	const [imgEditTogg, setImgEditTogg] = useState(false);
	const [webviewTogg, setWebviewTogg] = useState(false);
	const [webviewUri, setWebviewUri] = useState("");
	const colors = ["green", "blue", "firebrick", "slateblue", "gold"];
	const trueColors = ["green", "blue", "red", "ultraviolet", "gold"];
	const socials = ["linkedin", "twitter", "email"];
	const socialColors = ["#2867B2", "#1DA1F2", "#808080"];
	let colorItr = -1;

	const isFocused = useIsFocused();

	useLayoutEffect(() => {
		setEditPrompt(false);
		let array = [1];
		const imgToDisplay = props.userInfo.image
			? array.map((item, index) => {
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
			: array.map((item, index) => {
					return (
						{
							url: props.userInfo.img_url,
						},
						{
							url: props.userInfo.img_url,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
						}
					);
			  });

		setImage(imgToDisplay);
		setImgView([{ uri: imgToDisplay[0].url }]);

		// return () => {
		// 	// console.log("please come again");
		// };
	}, [isFocused]);

	const numFormat = (n) => {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
	};

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
				setImgEditTogg(true);

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

		fetch(`http://192.168.1.211:3000/users/${props.userInfo.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				// Accept: "application/json",
			},
			body: JSON.stringify(putData),
		})
			.then((resp) => {
				props.handleSuccess("profilePic");
				props.handleClose("profilePic");
			})
			.catch((err) => {
				setErrorMessage("Something went wrong. Try again later.");
				console.log("🚨 Error updating user avatar: ", err);
			});
	};

	const handleImgEditCancel = () => {
		const array = [1];
		const pick = props.userInfo.image
			? array.map((item, index) => {
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
			: array.map((item, index) => {
					return (
						{
							url: props.userInfo.img_url,
						},
						{
							url: props.userInfo.img_url,
							props: {
								// source: require("data:image/gif;base64,${item.data}"),
							},
						}
					);
			  });
		setImage(pick);
		setImgView([{ uri: pick[0].url }]);
		setImgEditTogg(false);
	};

	const handleInfoEditTogg = () => {
		setInfoEditTogg(false);
		setEditPrompt(false);
	};

	const handleWebviewTogg = () => {
		setWebviewUri("");
		setWebviewTogg(false);
	};

	// console.log("👤 USER INFO ISSS 👤 ", props.userInfo);

	return (
		<View style={styles.wrapper}>
			{isVisible && (
				<ImageView
					images={imgView}
					onRequestClose={() => setIsVisible(false)}
					visible={isVisible}
					index={0}
				/>
			)}

			{infoEditTogg && (
				<ProfileEdit
					//PROFILE EDIT MODAL
					handleInfoEditTogg={handleInfoEditTogg}
					handleSuccess={props.handleSuccess}
					handleClose={props.handleClose}
				/>
			)}

			{webviewTogg && (
				<Webview
					//Webview
					uri={webviewUri}
					handleWebviewTogg={handleWebviewTogg}
				/>
			)}

			<View style={styles.container}>
				<View
					style={{
						alignSelf: "center",
						position: "absolute",
						bottom: vh(32),
						left: vw(64),
						zIndex: 4,
					}}
				>
					<TouchableOpacity
						style={{
							opacity: 0.75,
							backgroundColor: "rgba(0,0,0,0.7)",
						}}
						onPress={() => setEditPrompt(!editPrompt)}
					>
						<Icon
							name="edit"
							type="font-awesome-5"
							color={editPrompt ? "gold" : "white"}
							size={24}
							opacity={0.5}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() => {
						setIsVisible(true), setEditPrompt(false);
					}}
					style={{ zIndex: 3 }}
				>
					<FastImage
						resizeMode={"cover"}
						source={{
							uri: image[0].url,
						}}
						style={styles.profilePic}
						//PROFILE PICTURE 📸 📸 📸
					></FastImage>
				</TouchableOpacity>

				{editPrompt && (
					<View style={styles.editChoiceButtons}>
						<Button
							title="Edit Info"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
								zIndex: 5,
							}}
							style={{
								position: "relative",
								borderRadius: 20,
								width: vw(40),
								zIndex: 5,
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								setInfoEditTogg(true);
							}}
						/>
						<Button
							title="Change Photo"
							buttonStyle={{
								backgroundColor: "transparent",
								borderRadius: 18,
								zIndex: 5,
							}}
							style={{
								position: "relative",
								borderRadius: 20,
								width: vw(40),
								zIndex: 5,
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handlePicker();
								setEditPrompt(false);
							}}
						/>
					</View>
				)}

				{imgEditTogg && (
					<View style={styles.imgSaveButtons}>
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
								zIndex: 5,
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handleImgEditCancel();
							}}
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
								zIndex: 5,
							}}
							titleStyle={{ color: "lightslategray" }}
							onPress={() => {
								handlePut();
								setImgEditTogg(false);
								props.handleClose("profilePic");
							}}
						/>
					</View>
				)}
				<View style={styles.leftView}>
					<ScrollView
						contentContainerStyle={{
							position: "relative",
						}}
						style={{
							// position: "absolute",
							alignSelf: "flex-end",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							height: vh(7.5),
							width: vw(33),
							top: vh(5),
						}}
						showsHorizontalScrollIndicator={false}
						automaticallyAdjustInsets={false}
						horizontal={true}
					>
						{colors.map((color, key = index) => {
							colorItr++;

							return (
								<TouchableOpacity
									key={key}
									style={styles.badge}
									// onPress={() => {}}
								>
									<Icon
										name="rocket1"
										type="ant-design"
										color={color}
										size={40}
										style={[colorItr == 0 ? { marginRight: vw(10) } : {}]}
									/>

									{trueColors[colorItr] in props.userInfo.badges && (
										<Badge
											value={numFormat(
												props.userInfo.badges[trueColors[colorItr]]
											)}
											status="success"
											containerStyle={[
												colorItr == 0
													? styles.greenBadgeInd
													: {
															position: "relative",
															bottom: vh(1),
															left: vw(6),
													  },
											]}
										/>
									)}
								</TouchableOpacity>
							);
						})}
					</ScrollView>
					<Text
						style={{
							flex: 0.75,
							color: "lightslategray",
							fontFamily: "Marker Felt",
							textAlign: "center",
							fontSize: 20,
							width: vw(30),
						}}
					>
						{numFormat(
							Object.values(props.userInfo.badges).reduce((t, n) => t + n)
						)}
					</Text>
					<Text
						style={{
							flex: 3,
							color: "olivedrab",
							textAlign: "center",
							fontSize: 18,
							fontFamily: "Marker Felt",
						}}
					>
						Purchased
					</Text>
				</View>

				<View style={styles.rightView}>
					<View style={{ marginTop: vh(0) }}>
						{socials.map((social, key = index) => {
							// console.log(social);
							return (
								<TouchableOpacity
									key={key}
									// style={styles.badge}
									style={{ marginVertical: vh(2) }}
									onPress={() => {
										switch (social) {
											case "linkedin":
												// navigation.navigate("Webview", {
												// 	uri: props.userInfo.linkedin,
												// });
												setWebviewUri(props.userInfo.linkedin);
												setWebviewTogg(true);

												break;
											case "twitter":
												setWebviewUri(props.userInfo.twitter);
												setWebviewTogg(true);

												break;
											case "email":
												Linking.openURL(
													`mailto:${props.userInfo.email}?subject=Howdy! I found you on Youmoja. What a great app right?&body=`
												);
												break;
											default:
											// code block
										}
									}}
								>
									<Icon
										name={social}
										type={"entypo"}
										color={socialColors[key]}
										size={37.5}
									/>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				<View style={styles.scoreView}>
					<TouchableWithoutFeedback
						style={{
							position: "relative",
							opacity: 0.85,
						}}
						onPress={() => console.log(props.userInfo)}
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
						}}
					>
						{numFormat(props.userInfo.comment_scores_sum)}
					</Text>
					<TouchableWithoutFeedback
						style={{
							position: "relative",
							opacity: 0.85,
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
})(ProfileCard);

const styles = StyleSheet.create({
	wrapper: {
		height: vh(32),
		width: vw(100),
		backgroundColor: "red",
		zIndex: 1,
	},
	container: {
		position: "absolute",
		height: vh(36),
		width: vw(100),
		borderWidth: 2.5,
		alignSelf: "flex-start",
		backgroundColor: "slategray", //MIDDLE
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
		flexDirection: "column",
	},
	profilePic: {
		borderRadius: 102,
		width: "47%",
		opacity: 1.0,
		zIndex: 2,
		height: undefined,
		aspectRatio: 135 / 135,
	},
	imgSaveButtons: {
		position: "absolute",
		flexDirection: "row",
		width: vw(40),
		top: vh(16),
		backgroundColor: "rgba(0,0,0,0.75)",
		zIndex: 4,
	},
	editChoiceButtons: {
		position: "absolute",
		flexDirection: "column",
		width: vw(40),
		top: vh(6.25),
		backgroundColor: "rgba(0,0,0,0.75)",
		zIndex: 4,
	},
	leftView: {
		position: "absolute",
		alignSelf: "flex-start",
		flexDirection: "column",
		backgroundColor: "black", //LEFT
		justifyContent: "center",
		alignItems: "center",
		height: vh(36),
		width: vw(30),
		borderWidth: 2,
		opacity: 0.95,
		zIndex: 1,
		// paddingVertical: vh(8),
	},
	badge: {
		height: vh(8),
		paddingRight: vw(9.4),
		paddingLeft: vw(13),
		justifyContent: "center",
	},
	greenBadgeInd: {
		position: "relative",
		bottom: vh(1),
		left: vw(1),
	},
	rightView: {
		position: "absolute",
		alignSelf: "flex-end",
		flexDirection: "column",
		backgroundColor: "black", //RIGHT
		// justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		height: vh(36),
		width: vw(30),
		opacity: 0.95,
		zIndex: 1,
	},
	scoreView: {
		flex: 1,
		position: "relative",
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: vh(7.5),
		width: vw(42),
		backgroundColor: "rgba(0,0,0,0.95)", //SCORE
		zIndex: 1,
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
	};
}
