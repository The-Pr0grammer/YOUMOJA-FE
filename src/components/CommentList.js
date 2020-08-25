import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { fetchComments } from "../redux/actions/bizAction";
import Comment from "./Comment.js";
import NewComment from "./NewComment.js";
import SuccessModal from "./SuccessModal.js";
import { FontAwesome } from "@expo/vector-icons";

class CommentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newCommentTogg: false,
			successTogg: false,
			expandTogg: false,
		};
	}
	componentDidMount() {
		this.props.fetchComments(this.props.bizId);
		// setTimeout(
		// 	() => this.flatList.scrollToIndex({ animated: false, index: 3 }),
		// 	1000
		// );
	}

	handleCancel = () => {
		this.setState({ newCommentTogg: false });
	};

	handleSuccess = () => {
		setTimeout(() => {
			this.setState({ successTogg: true });
		}, 750);
	};

	handleClose = () => {
		setTimeout(() => {
			this.setState({ successTogg: false });
		}, 2400);
	};

	handleDismiss = () => {
		this.setState({ successTogg: false });
	};

	updateComments = (newComment) => {
		this.setState({ comments: [newComment, ...this.state.comments] });
	};

	// handleScroll = (e) => {
	// 	console.log(e.nativeEvent.contentOffset.y);
	// };

	// getItemLayout = (data, index) => {
	// 	let a = { length: vh(10), offset: vh(15) * index, index };
	// 	console.log(a);
	// 	return a;
	// };

	render() {
		// console.log(this.props.isFetching);
		// console.log(this.state.expandTogg);

		return (
			<View
				style={
					this.state.expandTogg ? styles.expandedCommList : styles.commList
				}
			>
				<View
					style={{
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<View
						style={{
							alignSelf: "flex-start",
							backgroundColor: "lightslategray",
							width: vw(25),
							height: vh(5),
							marginTop: vh(0.3),
							marginLeft: vw(3),
							borderWidth: 2.2,
							flexDirection: "row",
							paddingTop: vh(0.3),
							// paddingLeft: vh(0.1),
							display: "flex",
							borderRadius: 18,
						}}
					>
						<TouchableOpacity
							style={{
								// flex: 1,
								position: "relative",
								alignSelf: "center",
								height: vh(7),
								width: vw(12),
								// borderWidth: 3.5,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								this.setState({ newCommentTogg: true });
							}}
						>
							<FontAwesome
								name="caret-square-o-up"
								size={28}
								color="black"
								style={styles.add}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								position: "relative",
								alignSelf: "center",
								height: vh(7),
								width: vw(12),
								// borderWidth: 3.5,
								justifyContent: "center",
							}}
							onPress={() => {
								this.setState({ newCommentTogg: true });
							}}
						>
							<Icon
								name="clockcircle"
								type="antdesign"
								color="black"
								size={26}
								style={styles.add}
							/>
						</TouchableOpacity>
					</View>
					<Text
						style={{
							flex: 1,
							textAlign: "center",
							fontSize: 16,
							fontFamily: "Marker Felt",
							// backgroundColor: "magenta",
							// width: vw(50),
							alignSelf: "center",
							color: "lightslategray",
						}}
					>
						COMMENTS
						{!this.props.isFetching && `(${this.props.bizs.comments.length})`}
					</Text>
					{this.state.successTogg == false && (
						<TouchableOpacity
							style={{
								position: "relative",
								alignSelf: "flex-end",
								width: vw(15),
								marginLeft: vw(13),
								marginTop: vh(0.5),
							}}
							onPress={() => {
								this.setState({ expandTogg: !this.state.expandTogg });
							}}
						>
							<Icon
								name="arrows-expand"
								type="foundation"
								color="black"
								size={30}
								style={styles.add}
							/>
						</TouchableOpacity>
					)}
				</View>
				{this.state.newCommentTogg == false && (
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							height: vh(5.5),
							width: 45,
						}}
						onPress={() => {
							this.setState({ newCommentTogg: true });
						}}
					>
						<Icon
							name="plus-circle"
							type="feather"
							color="black"
							size={37}
							style={styles.add}
						/>
					</TouchableOpacity>
				)}

				<View>
					{this.state.newCommentTogg && (
						<NewComment
							bizId={this.props.bizId}
							handleCancel={this.handleCancel}
							handleSuccess={this.handleSuccess}
							handleClose={this.handleClose}
							updateComments={this.updateComments}
						/>
					)}
				</View>
				{this.state.successTogg && (
					<SuccessModal handleDismiss={this.handleDismiss} />
				)}
				{!this.props.isFetching && (
					<FlatList
						ref={(ref) => {
							this.flatList = ref;
						}}
						// contentContainerStyle={{ height: 1000 }}
						// style={{ height: 100, flexGrow: 1 }}
						style={{ marginTop: vh(1) }}
						data={this.props.bizs.comments}
						renderItem={({ item }) => <Comment comment={item} />}
						keyExtractor={(item) => item.id.toString()}
						extraData={this.props.bizs.comments}
						// onScroll={(e) => this.handleScroll(e)}
						// getItemLayout={this.getItemLayout}
					/>
				)}
				{this.props.isFetching && (
					<View style={styles.activityView}>
						<ActivityIndicator
							size="large"
							color="#00ff00"
							hidesWhenStopped={true}
						/>
					</View>
				)}
			</View>
		);
	}
}

export default connect(mapStateToProps, { fetchComments })(CommentList);

const styles = StyleSheet.create({
	commList: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		top: vh(36.5), //36.5
		backgroundColor: "darkslategray",
		flexDirection: "column",
		position: "absolute",
		paddingBottom: vh(54.4), //54.4THIS FIXED THE NOT SCROLLING TO BOTTOM ISSUE AFTER A DAY OF DEBUGGING
		borderWidth: 2.5,
		borderColor: "black",
	},
	expandedCommList: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		top: vh(-9), //EXPANDED
		backgroundColor: "darkslategray",
		flexDirection: "column",
		position: "absolute",
		paddingBottom: vh(9), //EXPANDED
		borderWidth: 2.5,
		borderColor: "black",
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return { bizs: state, isFetching: state.isFetching };
}
