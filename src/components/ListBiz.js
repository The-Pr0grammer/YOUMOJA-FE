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
import Carousel, { Pagination } from "react-native-x2-carousel";
import { decode, encode } from "base-64";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

class ListBiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hearts: 0,
			comments: 0,
			error: null,
			page: 1,
			isVisible: false,
			summaryLength: props.biz.business.summary,
		};
	}

	componentDidMount() {}

	renderImages = () => {
		let strings = this.props.biz.business.images.map((image, index) => {
			return { id: index, data: image };
		});

		// console.log("image strings in listbiz📸🧵::::", strings);
		return (
			<Carousel
				pagination={Pagination}
				renderItem={this.renderItem}
				data={strings}
				loop={true}
				autoplay={true}
				autoplayInterval={3200}
				onPage={(p) =>
					this.state.isVisible && this.setState({ page: p.current })
				}
			/>
		);
	};

	renderItem = (data, index) => (
		<View key={index} style={styles.imgsView}>
			<Image
				//IMAGES
				style={styles.imgs}
				source={{
					uri: `http://192.168.1.211:3000/${data.data}`,
				}}
				// resizeMode={"stretch"}
				resizeMode={"cover"}
			/>
		</View>
	);

	render() {
		// this.props.type == "Profile" && console.log(this.props.biz.user.name);
		// this.props.biz.business.images && console.log(this.props.biz.business.images[0]);
		// console.log(this.props.biz);
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={{ zIndex: 10 }}
					onPress={() => {
						this.props.navigation.navigate("BizPage", {
							biz: this.props.biz,
							userInfo: this.props.biz.user,
							lastScreen: this.props.lastScreen,
							page: this.state.page,
						});
					}}
				>
					<Text style={styles.bizName}>{this.props.biz.business.name}</Text>
					<View style={styles.bizSummView}>
						<TextTicker
							style={styles.bizSumm}
							loop
							bounce
							repeatSpacer={25}
							duration={Math.random * 18000}
							marqueeDelay={Math.random() * 2000}
						>
							{this.props.biz.business.summary}
						</TextTicker>
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
								width: vw(66),
								height: vh(30),
								flexDirection: "column",
								alignSelf: "flex-start",
								zIndex: 1,
							}}
						>
							{this.props.biz.business.images && this.renderImages()}
							{!this.props.biz.business.images && (
								<Image
									style={styles.img}
									source={{ uri: this.props.biz.business.img_url }}
									resizeMode={"cover"}
								/>
							)}
						</View>
						<ListBizDash
							biz={this.props.biz}
						/>
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
		height: vh(42),
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		// borderWidth: 1,
		zIndex: 1,
		marginBottom: vh(1.5),
		marginRight: vh(0.5),
	},
	img: {
		width: vw(66),
		// height: vh(30),
		height: undefined,
		aspectRatio: 1.1 / 1.08,
		opacity: 1.0,
		borderRadius: 2,
		resizeMode: "cover",
	},
	bizName: {
		position: "relative",
		backgroundColor: "black",
		color: "lightslategray",
		height: vh(5.2),
		fontFamily: "Marker Felt",
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		borderWidth: 2,
		borderBottomWidth: 0,
		lineHeight: vh(4.5),
		justifyContent: "center",
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
		fontSize: 18,
		color: "olivedrab",
		paddingHorizontal: vw(2),
		fontFamily: "Marker Felt",
	},
	imgs: {
		position: "relative",
		width: vw(67),
		// height: vh(34),
		height: undefined,
		aspectRatio: 1 / 1.15,
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
