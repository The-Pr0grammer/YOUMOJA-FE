import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { FontAwesome } from "@expo/vector-icons";

export default class Comment extends PureComponent {
	render() {
		const ts = new Date(this.props.comment.created_at);
		// console.log("comdsdment", ts);
		return (
			<View style={styles.commCon}>
				<View
					style={{
						flexDirection: "row",
						// backgroundColor: "blue",
						display: "flex",
					}}
				>
					<Image
						resizeMode={"cover"}
						source={{
							uri: this.props.comment.user.img_url,
						}}
						style={styles.profilePic}
					></Image>
					<Text style={styles.username}>
						{this.props.comment.user.username}
					</Text>
					<Text style={styles.moment}>3 days ago</Text>
				</View>

				{/* <View style={styles.commentAndScoreView}> */}
				<Text style={styles.comment}>{this.props.comment.content}</Text>
				<View style={styles.CommScore}>
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							width: vw(7.5),
						}}
						onPress={() => {}}
					>
						<FontAwesome name="caret-square-o-up" size={28} color="black" />
					</TouchableOpacity>
					<Text
						style={{
							alignSelf: "center",
							fontFamily: "Marker Felt",
							fontSize: 19,
							fontFamily: "Papyrus",
							color: "darkslategray",
							marginHorizontal: vw(2),
						}}
					>
						120k
					</Text>

					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							width: vw(7.5),
						}}
						onPress={() => {}}
					>
						<FontAwesome name="caret-square-o-down" size={28} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	commCon: {
		flex: 1,
		marginVertical: 0,
		marginHorizontal: 10,
		paddingVertical: vh(0.5),
		paddingRight: vw(1),
		marginBottom: vh(1),
		backgroundColor: "lightslategray",
		borderWidth: 2,
		borderColor: "black",
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
	},
	comment: {
		flex: 1,
		alignSelf: "flex-start",
		fontFamily: "Marker Felt",
		fontSize: 19,
		marginTop: vh(0.5),
		marginLeft: vh(0.7),
		fontFamily: "Papyrus",
		paddingRight: vw(15),
		// backgroundColor: "purple",
	},
	username: {
		flex: 1,
		position: "relative",
		alignSelf: "flex-end",
		marginVertical: 1,
		marginLeft: vw(1.5),
		fontFamily: "Georgia",
		fontSize: 15,
	},
	profilePic: {
		// zIndex: 1,
		borderRadius: vw(20),
		height: vh(6),
		width: vw(11.5),
		alignSelf: "flex-end",
		marginLeft: vh(0.7),
	},
	CommScore: {
		flexDirection: "row",
		// backgroundColor: "red",
		position: "relative",
		justifyContent: "center",
		paddingLeft: vw(2),
		// alignItems: "center",
	},
	commentAndScoreView: {
		flexDirection: "column",
	},
	moment: {},
});
