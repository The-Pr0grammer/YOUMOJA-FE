import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	Text,
	Share,
	ImageBackground,
	ActivityIndicator,
	Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { connect } from "react-redux";
import { setUserInfo, setIsFetching } from "../redux/actions/bizAction";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
import TextTicker from "react-native-text-ticker";
import Header from "./Header.js";
import CommentList from "./CommentList.js";
import BizPageDash from "./BizPageDash.js";
import BizPageSupport from "./BizPageSupport.js";
import SuccessModal from "./SuccessModal.js";
import { useNavigation } from "@react-navigation/native";
import Carousel, { PaginationLight } from "react-native-x2-carousel";
import ImageViewer from "react-native-image-zoom-viewer";
import FitImage from "react-native-fit-image";

import axios from "axios";

const BizPage = (props) => {
	const [ubiz, setUbiz] = useState(false);
	const [comments, setComments] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [successTogg, setSuccessTogg] = useState(false);
	const [images, setImages] = useState([]);
	const navigation = useNavigation();
	const [page, setPage] = useState(0);
	const [fixedPage, setFixedPage] = useState(0);
	const isFocused = useIsFocused();

	useEffect(() => {
		fetchData();

		return () => {
			// setUbiz(false);

			console.log("please come again");
		};
	}, [isFocused]);

	const fetchData = async () => {
		props.setIsFetching(true);
		await axios(`http://192.168.1.211:3000/user_bizs/${props.route.params.id}`)
			.then((res) => {
				setUbiz(res.data);
			})
			.then(() => {
				buildImagesArray();
			})
			.then(() => {
				props.setIsFetching(false);
			})

			.catch((error) => console.log(error));
	};

	const handleSuccess = () => {
		setTimeout(() => {
			setSuccessTogg(true);
		}, 750);
	};

	const handleClose = () => {
		setTimeout(() => {
			setSuccessTogg(false);
		}, 6400);
	};

	const handleDismiss = () => {
		setSuccessTogg(false);
	};

	buildImagesArray = () => {
		ubiz.business.images
			? setImages(
					ubiz.business.images.map((image, index) => {
						return (
							{
								url: `http://192.168.1.211:3000/${image}`,
							},
							{
								url: `http://192.168.1.211:3000/${image}`,
								props: {
									// source: require("data:image/gif;base64,${item.data}"),
								},
								id: index,
							}
						);
					})
			  )
			: setImages([{ url: ubiz.business.img_url }]);
	};

	renderImages = () => {
		let strings = ubiz.business.images.map((image, index) => {
			return { id: index, uri: image };
		});

		// console.log("image strings in bIzPaGe📸🧵::::", strings);
		return (
			<Carousel
				pagination={PaginationLight}
				renderItem={renderItem}
				data={strings}
				loop={true}
				autoplay={true}
				autoplayInterval={3200}
				onPage={(p) => setPage(p.current - 1)}
			/>
		);
	};

	renderItem = (data, index) => (
		<View key={index} style={styles.imgsView}>
			<Image
				//IMAGES
				style={styles.imgs}
				source={{
					uri: `http://192.168.1.211:3000/${data.uri}`,
				}}
				// resizeMode={"stretch"}
				resizeMode={"cover"}
			/>
		</View>
	);

	// console.log(props.route.params.lastScreen);
	// console.log("URLLLLLLLLLLL", props.route.params["ubiz"].business.images);
	// console.log("IMAGES LIVE FROM THE BIZPAGE", images);
	// ubiz && console.log("It's Aliiiiiive; ubiz from the BizPage:", ubiz);
	// console.log("It's Aliiiiiive; ubiz from the BizPage:", ubiz);

	return (
		<View style={styles.container}>
			{ubiz ? (
				<View style={styles.container}>
					{isVisible && ubiz.business.images && (
						<Modal visible={isVisible} transparent={true}>
							<ImageViewer
								imageUrls={images}
								// imageIndex={page}
								// visible={isVisible}
								onCancel={() => setIsVisible(false)}
								enableSwipeDown={true}
								index={fixedPage}
								renderIndicator={() => {}}
								menus={() => null}
								renderIndicator={() => <></>}
							/>
						</Modal>
					)}
					{isVisible && !ubiz.business.images && (
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
					{/* REFACTOR THIS; MAKE DRY ^^^*/}
					<View
						style={{
							flex: 1,
							flexDirection: "column",
						}}
					>
						<Header
							name={ubiz.business.name}
							navigation={props.navigation}
							lastScreen={props.route.params.lastScreen}
							activeScreen={"BizPage"}
						/>
					</View>
					<View style={styles.bizCon}>
						{successTogg && (
							<SuccessModal
								handleDismiss={handleDismiss}
								message={"Your comment was posted✅"}
							/>
						)}
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
											userShowInfo: ubiz.user,
										});
									}}
								>
									<Image
										resizeMode={"cover"}
										source={{
											uri: ubiz.user.image
												? `http://192.168.1.211:3000/${ubiz.user.image}`
												: ubiz.user.img_url,
										}}
										style={styles.profilePic}
									></Image>
								</TouchableOpacity>
							</View>
							<TextTicker
								shouldAnimateTreshold={vw(8)}
								duration={Math.random * 18000}
								loop
								bounce
								repeatSpacer={25}
								marqueeDelay={3200}
								style={styles.bizSumm}
							>
								{ubiz.business.summary}
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
										setFixedPage(page);
									}}
								>
									<Icon
										name="arrows-expand"
										type="foundation"
										color={"white"}
										size={24}
									/>
								</TouchableOpacity>
								{ubiz.business.images && renderImages()}
								{ubiz.business.img_url && (
									<Image
										style={styles.img}
										source={{
											uri: ubiz.business.img_url,
										}}
									/>
								)}
							</View>
							<BizPageDash ubiz={ubiz} />
						</View>
						<View style={styles.bizSupport}>
							<BizPageSupport ubiz={ubiz} />
						</View>
					</View>
					<View style={styles.commentCon}>
						<CommentList
							id={props.route.params.id}
							navigation={navigation}
							handleSuccess={handleSuccess}
							handleClose={handleClose}
							successTogg={successTogg}
							commentTogg={props.route.params.commentTogg}
							// comments={comments}
						/>
					</View>
				</View>
			) : (
				<View
					style={{
						// flex: 1,
						height: vh(100),
						width: vw(100),
						position: "relative",
						zIndex: 7,
						backgroundColor: "rgba(165,5,65,9)",
						// backgroundColor: "black",
						justifyContent: "center",
						alignItems: "center",
						borderWidth: 20,
						borderRadius: 75,
					}}
				>
					{/* <ActivityIndicator
						size="large"
						color="#00ff00"
						hidesWhenStopped={true}
					/> */}
					<ImageBackground
						source={require("../images/transparentloadingsauce.gif")}
						style={styles.bg}
					></ImageBackground>
				</View>
			)}
		</View>
	);
};

export default connect(mapStateToProps, {
	setUserInfo,
	setIsFetching,
})(function (props) {
	const isFocused = useIsFocused();

	return <BizPage {...props} isFocused={isFocused} />;
});

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
		width: vw(58),
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
		width: vw(58),
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
	activityView: {
		flex: 1,
		justifyContent: "center",
	},
	bg: {
		// flex: 1,
		resizeMode: "cover",
		opacity: 0.5,
		// padding: 150,
		// borderWidth: 7,
		width: vw(100),
		height: vh(35),
		// marginTop: vh(10),
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		isFetching: state.isFetching,
	};
}
