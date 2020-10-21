import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Share,
} from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import TextTicker from "react-native-text-ticker";
import Header from "./Header.js";
import CommentList from "./CommentList.js";
import BizPageDash from "./BizPageDash.js";
import BizPageSupport from "./BizPageSupport.js";
import { useNavigation } from "@react-navigation/native";
import Carousel, { PaginationLight } from "react-native-x2-carousel";
import ImageView from "react-native-image-viewing";
import FitImage from "react-native-fit-image";

const BizPage = (props) => {
	const [bizInfo, setBizinfo] = useState({});
	const [comments, setComments] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [page, setPage] = useState(1);
	const [images, setImages] = useState([]);
	const navigation = useNavigation();

	// console.log(props.route.params.lastScreen);
	// console.log("URLLLLLLLLLLL", props.route.params["biz"].business.images);
	console.log("IMAGES LIVE FROM THE BIZPAGE", images);

	useEffect(() => {
		props.route.params["biz"].business.images
			? setImages(
					props.route.params["biz"].business.images.map((image) => {
						return { uri: `http://127.0.0.1:3000/${image}` };
					})
			  )
			: setImages([{ uri: props.route.params["biz"].business.img_url }]);

		return () => {
			console.log("please come again");
		};
	}, []);

	renderImages = () => {
		let strings = props.route.params["biz"].business.images.map(
			(image, index) => {
				return { id: index, data: image };
			}
		);

		// console.log("image strings in bIzPaGe📸🧵::::", strings);
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
		);
	};

	renderItem = (data, index) => (
		<View key={index} style={styles.imgsView}>
			<Image
				//IMAGES
				style={styles.imgs}
				source={{
					uri: `http://127.0.0.1:3000/${data.data}`,
				}}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			{props.route.params["biz"].business.images && isVisible && (
				<ImageView
					images={images}
					imageIndex={page - 1}
					visible={isVisible}
					onRequestClose={() => setIsVisible(false)}
				/>
			)}
			{!props.route.params["biz"].business.images && isVisible && (
				<ImageView
					images={images}
					imageIndex={0}
					visible={isVisible}
					onRequestClose={() => setIsVisible(false)}
				/>
			)}
			<View
				style={{
					flex: 1,
					flexDirection: "column",
				}}
			>
				<Header
					name={props.route.params["biz"].business.name}
					navigation={props.navigation}
					lastScreen={props.route.params.lastScreen}
				/>
			</View>

			<View style={styles.bizCon}>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<View
						style={{
							backgroundColor: "rgba(40, 40, 40, 0.5)",
							borderLeftWidth: 4,
							width: vw(16),
							height: vh(6.8),
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								console.log(props.route.params.userInfo);
								props.navigation.navigate("PeerProfile", {
									prevScreen: "BizPage",
									userShowInfo: props.route.params.userInfo,
								});
							}}
						>
							<Image
								resizeMode={"cover"}
								source={{
									uri: props.route.params.userInfo.img_url,
								}}
								style={styles.profilePic}
							></Image>
						</TouchableOpacity>
					</View>
					<TextTicker
						shouldAnimateTreshold={vw(8)}
						duration={9600}
						loop
						bounce
						repeatSpacer={25}
						marqueeDelay={3200}
						style={styles.bizSumm}
					>
						{props.route.params["biz"].business.summary}
					</TextTicker>
				</View>
				<View style={styles.cardView}>
					<View
						style={{
							flex: 1,
							position: "absolute",
							// backgroundColor: "darkslategray",
							width: vw(60),
							height: vh(30),
							// zIndex: 3,
							flexDirection: "column",
							alignSelf: "flex-start",
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								alignSelf: "flex-end",
								width: vw(6.5),
								right: vw(1.5),
								marginTop: vh(0.2),
								opacity: 0.5,
								zIndex: 2,
								// backgroundColor: "red",
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
						{props.route.params["biz"].business.images && renderImages()}
						{props.route.params["biz"].business.img_url && (
							<Image
								style={styles.img}
								source={{
									uri: props.route.params["biz"].business.img_url,
								}}
							/>
						)}
					</View>
					<BizPageDash business={props.route.params["biz"].business} />
				</View>
				<View style={styles.bizSupport}>
					<BizPageSupport business={props.route.params["biz"].business} />
				</View>
			</View>
			<View style={styles.commentCon}>
				<CommentList
					bizId={props.route.params["biz"].business.id}
					navigation={navigation}
					// comments={comments}
				/>
			</View>
		</View>
	);
};

export default BizPage;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		flexDirection: "column",
		backgroundColor: "black",
	},
	bizCon: {
		position: "relative",
		width: vw(100),
		height: vh(7.3),
		backgroundColor: "black",
		bottom: vh(83),
		borderTopWidth: 2.5,
	},
	bizSumm: {
		position: "relative",
		padding: vw(1.25),
		fontFamily: "Marker Felt",
		fontSize: 18,
		color: "olivedrab",
		height: vh(6),
		backgroundColor: "black",
		marginBottom: vh(0.8),
		top: vh(2),
	},
	bizSupport: {
		position: "relative",
		// padding: vw(1.25),
		backgroundColor: "lightslategray",
	},
	cardView: {
		position: "relative",
		borderWidth: 2.5,
		borderTopWidth: 2.5,
		flexDirection: "column",
		borderColor: "black",
	},
	img: {
		position: "absolute",
		width: vw(59),
		height: vh(30),
		opacity: 1.0,
		alignSelf: "flex-start",
	},
	commentCon: {
		position: "relative",
		bottom: vh(80.75),
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: 100,
		width: vw(11),
		height: undefined,
		aspectRatio: 135 / 135,
	},
	imgs: {
		position: "relative",
		width: vw(60),
		height: vh(30),
		opacity: 1.0,
		backgroundColor: "black",
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
