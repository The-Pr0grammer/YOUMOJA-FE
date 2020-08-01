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
import ListBizStats from "./ListBizStats.js";

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

	render() {
		// console.log(this.props.biz.business.comments);
		// console.log(this.props.biz.business.categories);
		return (
			<View style={styles.container}>
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
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("BizPage", {
								biz: this.props.biz,
							});
						}}
					>
						<Image
							style={styles.img}
							source={{ uri: this.props.biz.business.image_url }}
						/>
					</TouchableOpacity>
					<ListBizStats biz={this.props.biz} />
				</Card>
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
});
