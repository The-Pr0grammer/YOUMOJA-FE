import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	Keyboard,
} from "react-native";
import React from "react";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { fetchComments, sortByScoresTogg } from "../redux/actions/bizAction";
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
			commExpand: false,
			// scoreTogg: true,
			sortedComms: [],
		};
	}
	componentDidMount() {
		this.props.fetchComments(this.props.bizId);
		this.props.sortByScoresTogg(true);
		// setTimeout(
		// 	() => this.flatList.scrollToIndex({ animated: false, index: 3 }),
		// 	1000
		// );
	}

	handleCancel = () => {
		this.state.commExpand &&
			this.setState({
				commExpand: false,
				expandTogg: false,
			});
		this.setState({
			newCommentTogg: false,
			// expandTogg: false,
		});
	};

	handleSuccess = () => {
		setTimeout(() => {
			this.setState({
				successTogg: true,
			});
		}, 750);
	};

	handleClose = () => {
		setTimeout(() => {
			this.setState({
				successTogg: false,
			});
		}, 2400);
	};

	handleDismiss = () => {
		this.setState({
			successTogg: false,
		});
	};

	handleExpand = () => {
		this.setState({
			expandTogg: true,
		});
	};

	// updateComments = (newComment) => {
	// 	this.setState({ comments: [newComment, ...this.state.comments] });
	// };

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
		// console.log(this.props.comments);
		// console.log(this.props.scoresSort);
		// console.log(this.state.scoreTogg);
		// console.log(this.state.commExpand);

		return (
			<View
				style={
					this.state.expandTogg ? styles.expandedCommList : styles.commList
				}
			>
				{this.state.expandTogg && <View style={styles.expandedBg}></View>}
				<View
					style={{
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<View
						style={{
							alignSelf: "flex-start",
							backgroundColor: "rgba(0,0,0,0.7)",
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
								opacity: 0.9,
							}}
							onPress={() => {
								!this.props.scoresSort && this.props.sortByScoresTogg();
							}}
						>
							<FontAwesome
								name="caret-square-o-up"
								size={28}
								color={this.props.scoresSort ? "gold" : "lightslategray"}
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
								opacity: 0.9,
							}}
							onPress={() => {
								this.props.scoresSort && this.props.sortByScoresTogg();
							}}
						>
							<Icon
								name="clockcircle"
								type="antdesign"
								color={!this.props.scoresSort ? "gold" : "lightslategray"}
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
							alignSelf: "center",
							color: "olivedrab",
						}}
					>
						COMMENTS
						{!this.props.isFetching && `(${this.props.comments.length})`}
					</Text>

					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "flex-end",
							width: vw(15),
							marginLeft: vw(13),
							marginTop: vh(0.5),
							opacity: this.state.expandTogg ? 0.8 : 0.8,
						}}
						onPress={() => {
							this.state.expandTogg &&
								// this.setState({ newCommentTogg: false });
								Keyboard.dismiss();

							this.setState({
								expandTogg: !this.state.expandTogg,
								commExpand: false,
							});
						}}
					>
						<Icon
							name="arrows-expand"
							type="foundation"
							color={this.state.expandTogg ? "gold" : "lightslategray"}
							size={30}
							style={styles.add}
						/>
					</TouchableOpacity>
				</View>
				{this.state.newCommentTogg == false && (
					<TouchableOpacity
						style={{
							position: "relative",
							alignSelf: "center",
							height: vh(5.5),
							opacity: 0.85,
						}}
						onPress={() => {
							!this.state.expandTogg && this.setState({ commExpand: true });
							this.setState({
								newCommentTogg: true,
								expandTogg: true,
							});
						}}
					>
						<Icon
							name="plus-circle"
							type="feather"
							color="lightslategray"
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
							handleExpand={this.handleExpand}
						/>
					)}
				</View>
				{this.state.successTogg && (
					<SuccessModal handleDismiss={this.handleDismiss} />
				)}
				{/* {console.log(this.props.newBusiness)} */}
				{!this.props.isFetching && !this.props.newBusiness && (
					<FlatList
						horizontal={this.props.newBusiness && true}
						ref={(ref) => {
							this.flatList = ref;
						}}
						// contentContainerStyle={{ height: 1000 }}
						// style={{ height: 100, flexGrow: 1 }}
						style={{
							marginTop: vh(1),
						}}
						data={this.props.sortedComments}
						renderItem={({ item }) => (
							<Comment
								comment={item}
								bizId={this.props.bizId}
								navigation={this.props.navigation}
							/>
						)}
						keyExtractor={(item) => item.id.toString()}
						extraData={this.props.scoresSort}
						// onScroll={(e) => this.handleScroll(e)}
						// getItemLayout={this.getItemLayout}
					/>
				)}
				{this.props.newBusiness && (
					<View
						style={{
							flex: 1,
							// alignSelf: "flex-end",
							top: vh(10),
							position: "absolute",
							backgroundColor: "black",
							height: vh(120),
							width: vw(100),
						}}
					></View> //NEW BUINESS FILLER
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

export default connect(mapStateToProps, {
	fetchComments,
	sortByScoresTogg,
})(CommentList);

const styles = StyleSheet.create({
	commList: {
		flex: 1,
		width: vw(100),
		height: vh(100),
		top: vh(36.5), //36.5
		backgroundColor: "rgba(0, 0, 0, 0.95)",
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
		zIndex: 2,
	},
	expandedBg: {
		// flex: 1,
		width: vw(100),
		height: vh(100),
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		flexDirection: "column",
		position: "absolute",
		paddingBottom: vh(9),
	},
	activityView: {
		flex: 1,
		justifyContent: "center",
	},
});

function mapStateToProps(state) {
	return {
		reduxState: state,
		scoresSort: state.scoresSort,
		isFetching: state.isFetching,
		comments: state.comments,
		sortedComments: state.comments
			.sort((a, b) => a.id > b.id)
			.sort((a, b) => {
				return state.scoresSort && a.score < b.score;
			}),
	};
}
