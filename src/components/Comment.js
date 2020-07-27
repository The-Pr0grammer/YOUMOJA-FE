import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

export default class Comment extends React.Component {
	render() {
		const ts = new Date(this.props.comment.created_at);
		// console.log("comdsdment", ts);
		return (
			<View style={styles.commentCon}>
				<View style={{ flexDirection: "row" }}>
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
				</View>
				<Text style={styles.comment}>{this.props.comment.content}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	commentCon: {
		flex: 1,
		marginVertical: 0,
		marginHorizontal: 10,
		paddingVertical: vh(0.5),
		paddingRight: 20,
		marginBottom: vh(1),
		backgroundColor: "blue",
		borderWidth: 0.5,
		borderColor: "purple",
		borderRadius: 3,
	},
	comment: {
		flex: 1,
		alignSelf: "flex-start",
		fontFamily: "Marker Felt",
		fontSize: 19,
		marginTop: vh(0.5),
		marginLeft: vh(0.7),
		fontFamily: "Papyrus",
	},
	username: {
		position: "relative",
		backgroundColor: "gold",
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
});
