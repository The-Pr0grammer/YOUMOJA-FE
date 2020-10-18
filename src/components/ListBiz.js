import React from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { Card, Icon, ThemeConsumer } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getComments } from "../actions/commentsAction";
import ListBizDash from "./ListBizDash.js";
import Carousel, { PaginationLight } from "react-native-x2-carousel";

class ListBiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hearts: 0,
			comments: 0,
			page: 1,
			error: null,
		};
	}

	componentDidMount() {}

	renderImages = () => {
		let strings = this.props.biz.business.images.map((image, index) => {
			return { id: index, data: image };
		});

		console.log("image strings in listbiz📸🧵::::", strings);
		return (
			<Carousel
				// pagination={PaginationLight}
				renderItem={this.renderItem}
				data={strings}
				loop={true}
				autoplay={true}
				autoplayInterval={3200}
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

	render() {
		// this.props.type == "Profile" && console.log(this.props.biz.user.name);
		// this.props.biz.business.images && console.log(this.props.biz.business.images[0]);
		console.log(this.props.biz);
		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("BizPage", {
							biz: this.props.biz,
							userInfo: this.props.biz.user,
							lastScreen: this.props.lastScreen,
						});
					}}
				>
					<Text style={styles.bizName}>{this.props.biz.business.name}</Text>
					<View style={styles.bizSummView}>
						{/* <TextTicker
						style={styles.bizSumm}
						loop
						bounce
						repeatSpacer={25}
						// duration={Math.random * 18000}
						marqueeDelay={Math.random() * 2000}
					>
						{this.props.biz.business.summary}
					</TextTicker> */}
					</View>
					<Card
						containerStyle={{
							position: "relative",
							margin: 0,
							width: vw(100),
							padding: 0,
							borderWidth: 2,
							borderTopWidth: 0,
							borderColor: "black",
							flexDirection: "column",
							backgroundColor: "transparent",
						}}
					>
						<View
							style={{
								flex: 1,
								position: "absolute",
								// backgroundColor: "darkslategray",
								width: vw(64),
								height: vh(30),
								// zIndex: 3,
								flexDirection: "column",
								alignSelf: "flex-start",
							}}
						>
							{this.props.biz.business.images && this.renderImages()}
							{!this.props.biz.business.images && (
								<Image
									style={styles.img}
									source={{ uri: this.props.biz.business.img_url }}
								/>
							)}
						</View>
						<ListBizDash biz={this.props.biz} />
					</Card>
				</TouchableOpacity>
			</View>
		);
	}
}

export default ListBiz;

const styles = StyleSheet.create({
	container: {
		width: vw(100),
		height: vh(41),
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderWidth: 1,
		zIndex: 1,
	},
	img: {
		width: vw(66),
		height: vh(30),
		opacity: 1.0,
		borderRadius: 2,
		resizeMode: "cover",
	},
	bizName: {
		position: "relative",
		backgroundColor: "brown",
		height: vh(4.2),
		fontFamily: "Marker Felt",
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		borderWidth: 2,
		borderBottomWidth: 0,
		lineHeight: vh(3.5),
	},
	bizSummView: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		width: vw(100),
		height: vh(5.5),
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1,
	},
	bizSumm: {
		fontSize: 20,
		color: "aqua",
		paddingHorizontal: vw(2),
	},
	imgs: {
		position: "relative",
		width: vw(67),
		height: vh(34),
		opacity: 1.0,
		backgroundColor: "darkslategray",
		// borderRightWidth: 5,
	},
	imgsView: {
		position: "relative",
		width: vw(68),
		height: vh(36),
		opacity: 1.0,
		backgroundColor: "black",
	},
});
